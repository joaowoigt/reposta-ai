import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { users, generations } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { generateForPlatforms, type Platform } from "@/lib/ai/generate";
import { parseUrl } from "@/lib/utils/url-parser";

const PLAN_LIMITS: Record<string, number> = {
  free: 5,
  creator: 50,
  pro: Infinity,
};

const VALID_PLATFORMS: Platform[] = ["x", "linkedin", "instagram", "newsletter"];

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { inputText: rawInputText, inputUrl, platforms, tone } = body as {
    inputText?: string;
    inputUrl?: string;
    platforms?: string[];
    tone?: string;
  };

  // Se inputUrl foi fornecido, extrair texto da URL
  let inputText = rawInputText;

  if (inputUrl && !inputText) {
    const parseResult = await parseUrl(inputUrl);

    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error }, { status: 400 });
    }

    inputText = parseResult.text;
  }

  if (!inputText || inputText.trim().length < 100) {
    return NextResponse.json(
      { error: "O texto precisa ter pelo menos 100 caracteres" },
      { status: 400 },
    );
  }

  if (!platforms || platforms.length === 0) {
    return NextResponse.json(
      { error: "Selecione pelo menos uma plataforma" },
      { status: 400 },
    );
  }

  const invalidPlatforms = platforms.filter((p) => !VALID_PLATFORMS.includes(p as Platform));
  if (invalidPlatforms.length > 0) {
    return NextResponse.json(
      { error: `Plataformas inválidas: ${invalidPlatforms.join(", ")}` },
      { status: 400 },
    );
  }

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

  const limit = PLAN_LIMITS[user.plan] ?? 0;
  if (currentGenerations >= limit) {
    return NextResponse.json(
      { error: `Limite de ${limit} gerações por mês atingido. Faça upgrade do seu plano.` },
      { status: 429 },
    );
  }

  // Gerar conteúdo para todas as plataformas em paralelo
  const results = await generateForPlatforms(inputText, platforms as Platform[], tone);

  // Salvar resultados no banco
  await db.insert(generations).values(
    results.map((result) => ({
      userId: user.id,
      inputText,
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

  return NextResponse.json({ results });
}
