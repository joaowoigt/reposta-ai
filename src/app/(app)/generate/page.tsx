import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { GenerateForm } from "./generate-form";
import { getPlanLimit } from "@/lib/utils/plan-limits";

export default async function GeneratePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [user] = await db.select().from(users).where(eq(users.id, session.user.id));

  if (!user) {
    redirect("/login");
  }

  // Reset mensal check
  const now = new Date();
  const resetAt = user.generationsResetAt;
  let currentGenerations = user.generationsThisMonth;

  if (!resetAt || resetAt.getMonth() !== now.getMonth() || resetAt.getFullYear() !== now.getFullYear()) {
    currentGenerations = 0;
  }

  const limit = getPlanLimit(user.plan);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-neutral-900">Gerar conteúdo</h1>
      <p className="font-body text-neutral-500 mt-1">
        Cole seu texto e escolha as plataformas. A IA faz o resto.
      </p>
      <div className="mt-8">
        <GenerateForm
          usageUsed={currentGenerations}
          usageLimit={limit}
        />
      </div>
    </div>
  );
}
