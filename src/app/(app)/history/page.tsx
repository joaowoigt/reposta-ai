import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { generations } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { GenerationListItem } from "@/components/app/generation-list-item";

const PAGE_SIZE = 10;

interface HistoryPageProps {
  searchParams: Promise<{ page?: string }>;
}

interface BatchRow {
  batchId: string;
  inputText: string;
  inputUrl: string | null;
  platforms: string[];
  createdAt: Date;
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);
  const offset = (currentPage - 1) * PAGE_SIZE;

  // Query batches grouped by batchId
  const batches = await db
    .select({
      batchId: generations.batchId,
      inputText: sql<string>`min(${generations.inputText})`,
      inputUrl: sql<string | null>`min(${generations.inputUrl})`,
      platforms: sql<string[]>`array_agg(distinct ${generations.platform})`,
      createdAt: sql<Date>`min(${generations.createdAt})`,
    })
    .from(generations)
    .where(eq(generations.userId, session.user.id))
    .groupBy(generations.batchId)
    .orderBy(desc(sql`min(${generations.createdAt})`))
    .limit(PAGE_SIZE + 1)
    .offset(offset) as BatchRow[];

  const hasNextPage = batches.length > PAGE_SIZE;
  const displayBatches = hasNextPage ? batches.slice(0, PAGE_SIZE) : batches;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-neutral-900">
        Histórico
      </h1>
      <p className="font-body text-neutral-500 text-sm">
        Todas as suas gerações anteriores.
      </p>

      {displayBatches.length === 0 ? (
        <div className="text-center py-16">
          <svg
            className="w-12 h-12 text-neutral-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-body text-neutral-500 mb-4">
            Nenhuma geração ainda.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-primary-500 text-white font-body font-medium px-6 py-2.5 rounded-lg text-sm hover:bg-primary-400 transition-colors shadow-sm"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
            Gerar conteúdo
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {displayBatches.map((batch) => (
              <GenerationListItem
                key={batch.batchId}
                batchId={batch.batchId}
                inputText={batch.inputText}
                inputUrl={batch.inputUrl}
                platforms={batch.platforms}
                createdAt={new Date(batch.createdAt).toISOString()}
              />
            ))}
          </div>

          {/* Pagination */}
          {(hasPrevPage || hasNextPage) && (
            <div className="flex items-center justify-between pt-4">
              {hasPrevPage ? (
                <Link
                  href={`/history?page=${currentPage - 1}`}
                  className="font-body text-sm text-primary-500 hover:text-primary-400 transition-colors"
                >
                  Anterior
                </Link>
              ) : (
                <span />
              )}
              <span className="font-body text-xs text-neutral-400">
                Página {currentPage}
              </span>
              {hasNextPage ? (
                <Link
                  href={`/history?page=${currentPage + 1}`}
                  className="font-body text-sm text-primary-500 hover:text-primary-400 transition-colors"
                >
                  Próxima
                </Link>
              ) : (
                <span />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
