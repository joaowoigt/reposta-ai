export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { users, generations } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { generateForPlatforms, type Platform } from "@/lib/ai/generate";
import { parseUrl } from "@/lib/utils/url-parser";
import { getPlanLimit, canGenerate } from "@/lib/utils/plan-limits";
import {
  safeParseJson,
  sanitizeText,
  validateInputText,
  validateUrl,
  validatePlatforms,
} from "@/lib/utils/validation";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  // Parse seguro do body
  const { data: body, error: parseError } = await safeParseJson(request);

  if (!body) {
    return NextResponse.json({ error: parseError }, { status: 400 });
  }

  const { inputText: rawInputText, inputUrl, platforms, tone } = body as {
    inputText?: string;
    inputUrl?: string;
    platforms?: string[];
    tone?: string;
  };

  // Validar URL se fornecida
  if (inputUrl) {
    const urlValidation = validateUrl(inputUrl);
    if (!urlValidation.valid) {
      return NextResponse.json({ error: urlValidation.error }, { status: 400 });
    }
  }

  // Se inputUrl foi fornecido, extrair texto da URL
  let inputText = rawInputText;

  if (inputUrl && !inputText) {
    const parseResult = await parseUrl(inputUrl);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: `${parseResult.error} Tente colar o texto diretamente.` },
        { status: 400 },
      );
    }

    inputText = parseResult.text;
  }

  // Sanitizar texto
  if (inputText) {
    inputText = sanitizeText(inputText);
  }

  // Validar texto
  const textValidation = validateInputText(inputText);
  if (!textValidation.valid) {
    return NextResponse.json({ error: textValidation.error }, { status: 400 });
  }

  // Validar plataformas
  const platformValidation = validatePlatforms(platforms);
  if (!platformValidation.valid) {
    return NextResponse.json({ error: platformValidation.error }, { status: 400 });
  }

  try {
    // Buscar user no banco para checar limite
    const [user] = await db.select().from(users).where(eq(users.id, session.user.id));

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Reset mensal: se generationsResetAt é de um mês anterior, resetar contador
    const now = new Date();
    const resetAt = user.generationsResetAt;
    let currentGenerations = user.generationsThisMonth;

    if (!resetAt || resetAt.getMonth() !== now.getMonth() || resetAt.getFullYear() !== now.getFullYear()) {
      currentGenerations = 0;
      await db
        .update(users)
        .set({ generationsThisMonth: 0, generationsResetAt: now })
        .where(eq(users.id, user.id));
    }

    if (!canGenerate(user.plan, currentGenerations)) {
      const limit = getPlanLimit(user.plan);
      return NextResponse.json(
        { error: `Limite de ${limit} gerações por mês atingido. Faça upgrade do seu plano.` },
        { status: 429 },
      );
    }

    // Gerar conteúdo para todas as plataformas
    const batchId = randomUUID();
    let results;

    try {
      results = await generateForPlatforms(inputText!, platforms as Platform[], tone);
    } catch (aiError: unknown) {
      console.error("[generate] Erro na API de IA:", aiError);

      // Tratar erros específicos da Anthropic
      const errorMessage = aiError instanceof Error ? aiError.message : String(aiError);

      if (errorMessage.includes("rate_limit") || errorMessage.includes("429")) {
        return NextResponse.json(
          { error: "Serviço de IA sobrecarregado. Tente novamente em alguns instantes." },
          { status: 429 },
        );
      }

      if (errorMessage.includes("overloaded") || errorMessage.includes("529")) {
        return NextResponse.json(
          { error: "Serviço de IA temporariamente indisponível. Tente novamente em alguns minutos." },
          { status: 503 },
        );
      }

      return NextResponse.json(
        { error: "Erro ao gerar conteúdo. Tente novamente." },
        { status: 503 },
      );
    }

    // Salvar resultados no banco
    await db.insert(generations).values(
      results.map((result) => ({
        batchId,
        userId: user.id,
        inputText: inputText!,
        inputUrl: inputUrl || null,
        platform: result.platform,
        outputText: result.outputText,
        tokensUsed: result.tokensUsed,
      })),
    );

    // Incrementar contador de gerações
    await db
      .update(users)
      .set({
        generationsThisMonth: sql`${users.generationsThisMonth} + 1`,
        updatedAt: now,
      })
      .where(eq(users.id, user.id));

    return NextResponse.json({ batchId, results });
  } catch (error) {
    console.error("[generate] Erro inesperado:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente." },
      { status: 500 },
    );
  }
}
