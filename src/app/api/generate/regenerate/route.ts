import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { generations } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { generateForPlatform, type Platform } from "@/lib/ai/generate";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { generationId, tone } = body as {
    generationId: string;
    tone?: string;
  };

  if (!generationId) {
    return NextResponse.json({ error: "ID da geração é obrigatório" }, { status: 400 });
  }

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
  const result = await generateForPlatform({
    inputText: original.inputText,
    platform: original.platform as Platform,
    tone,
  });

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
}
