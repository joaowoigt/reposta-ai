export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { generations } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ batchId: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { batchId } = await params;

  const results = await db
    .select()
    .from(generations)
    .where(
      and(
        eq(generations.batchId, batchId),
        eq(generations.userId, session.user.id),
      ),
    );

  if (results.length === 0) {
    return NextResponse.json({ error: "Geração não encontrada" }, { status: 404 });
  }

  return NextResponse.json({
    batchId,
    inputText: results[0].inputText,
    inputUrl: results[0].inputUrl,
    createdAt: results[0].createdAt,
    results: results.map((r) => ({
      id: r.id,
      platform: r.platform,
      outputText: r.outputText,
      tokensUsed: r.tokensUsed,
    })),
  });
}
