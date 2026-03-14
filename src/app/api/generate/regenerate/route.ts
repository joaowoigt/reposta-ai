export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { generations } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { generateForPlatform, type Platform } from "@/lib/ai/generate";
import { safeParseJson } from "@/lib/utils/validation";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { data: body, error: parseError } = await safeParseJson(request);

  if (!body) {
    return NextResponse.json({ error: parseError }, { status: 400 });
  }

  const { generationId, tone } = body as {
    generationId: string;
    tone?: string;
  };

  if (!generationId) {
    return NextResponse.json({ error: "ID da geração é obrigatório" }, { status: 400 });
  }

  try {
    // Buscar a generation original
    const [original] = await db
      .select()
      .from(generations)
      .where(
        and(
          eq(generations.id, generationId),
          eq(generations.userId, session.user.id),
        ),
      );

    if (!original) {
      return NextResponse.json({ error: "Geração não encontrada" }, { status: 404 });
    }

    // Regenerar para a mesma plataforma
    let result;
    try {
      result = await generateForPlatform({
        inputText: original.inputText,
        platform: original.platform as Platform,
        tone,
      });
    } catch (aiError) {
      console.error("[regenerate] Erro na API de IA:", aiError);
      return NextResponse.json(
        { error: "Erro ao regenerar conteúdo. Tente novamente." },
        { status: 503 },
      );
    }

    // Atualizar no banco
    await db
      .update(generations)
      .set({
        outputText: result.outputText,
        tokensUsed: result.tokensUsed,
      })
      .where(eq(generations.id, generationId));

    return NextResponse.json({
      id: generationId,
      platform: result.platform,
      outputText: result.outputText,
      tokensUsed: result.tokensUsed,
    });
  } catch (error) {
    console.error("[regenerate] Erro inesperado:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente." },
      { status: 500 },
    );
  }
}
