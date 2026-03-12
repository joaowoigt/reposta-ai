import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSubscription, CREATOR_PRICE, CAMPAIGN_PRICE, LAUNCH_CAMPAIGN_ACTIVE } from "@/lib/billing/client";
import { BillingClient } from "./billing-client";

export default async function BillingPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [user] = await db.select().from(users).where(eq(users.id, session.user.id));

  if (!user) {
    redirect("/login");
  }

  // Buscar status da assinatura no Asaas (se existir)
  let subscription = null;
  if (user.asaasSubscriptionId) {
    try {
      subscription = await getSubscription(user.asaasSubscriptionId);
    } catch {
      // Assinatura pode ter sido removida externamente
      subscription = null;
    }
  }

  const price = LAUNCH_CAMPAIGN_ACTIVE ? CAMPAIGN_PRICE : CREATOR_PRICE;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-neutral-900">Assinatura</h1>
      <p className="font-body text-neutral-500 mt-1">
        Gerencie seu plano e pagamento.
      </p>

      <div className="mt-8 max-w-lg">
        <BillingClient
          plan={user.plan}
          subscription={subscription ? {
            status: subscription.status,
            value: subscription.value,
            nextDueDate: subscription.nextDueDate,
          } : null}
          price={price}
          fullPrice={CREATOR_PRICE}
          isCampaign={LAUNCH_CAMPAIGN_ACTIVE}
        />
      </div>
    </div>
  );
}
