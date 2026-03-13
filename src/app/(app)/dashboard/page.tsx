import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { users, generations } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UsageCounter } from "@/components/app/usage-counter";
import { GenerationListItem } from "@/components/app/generation-list-item";
import { getPlanLimit } from "@/lib/utils/plan-limits";

const PLAN_LABELS: Record<string, string> = {
  free: "Free",
  creator: "Creator",
  pro: "Pro",
};

interface BatchRow {
  batchId: string;
  inputText: string;
  inputUrl: string | null;
  platforms: string[];
  createdAt: Date;
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [user] = await db
    .select({
      plan: users.plan,
      generationsThisMonth: users.generationsThisMonth,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  const recentBatches = await db
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
    .limit(5) as BatchRow[];

  const plan = user?.plan ?? "free";
  const used = user?.generationsThisMonth ?? 0;
  const limit = getPlanLimit(plan);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-neutral-900">
          Dashboard
        </h1>
        <p className="font-body text-neutral-500 mt-1">
          Bem-vindo, {session.user.name}!
        </p>
      </div>

      {/* Actions */}
      <div>
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 bg-primary-500 text-white font-body font-medium px-6 py-3 rounded-lg text-base hover:bg-primary-400 transition-colors duration-200 shadow-sm"
        >
          <svg
            className="h-5 w-5"
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
          Nova geração
        </Link>
      </div>

      {/* Usage summary */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold text-neutral-800">
            Uso este mês
          </h2>
          <span className="font-body text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">
            Plano {PLAN_LABELS[plan] ?? plan}
          </span>
        </div>
        <UsageCounter used={used} limit={limit} />
      </div>

      {/* Recent generations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold text-neutral-800">
            Últimas gerações
          </h2>
          {recentBatches.length > 0 && (
            <Link
              href="/history"
              className="font-body text-sm text-primary-500 hover:text-primary-400 transition-colors"
            >
              Ver tudo
            </Link>
          )}
        </div>

        {recentBatches.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8 text-center">
            <p className="font-body text-sm text-neutral-500">
              Nenhuma geração ainda. Comece criando seu primeiro conteúdo!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentBatches.map((batch) => (
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
        )}
      </div>
    </div>
  );
}
