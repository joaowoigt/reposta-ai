import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { generations } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect, notFound } from "next/navigation";
import { ResultsView } from "./results-view";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ batchId: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

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

  if (results.length === 0) notFound();

  return (
    <ResultsView
      batchId={batchId}
      inputText={results[0].inputText}
      inputUrl={results[0].inputUrl}
      createdAt={results[0].createdAt.toISOString()}
      results={results.map((r) => ({
        id: r.id,
        platform: r.platform,
        outputText: r.outputText,
        tokensUsed: r.tokensUsed,
      }))}
    />
  );
}
