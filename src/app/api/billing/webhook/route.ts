import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  // Validar token do webhook
  const webhookToken = request.headers.get("asaas-access-token");

  if (webhookToken !== process.env.ASAAS_WEBHOOK_TOKEN) {
    console.warn("[webhook] Token inválido recebido");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { event } = body;

  try {
    switch (event) {
      // Pagamento confirmado — ativar plano
      case "PAYMENT_CONFIRMED":
      case "PAYMENT_RECEIVED": {
        const { payment } = body;
        if (!payment?.subscription) break;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.asaasSubscriptionId, payment.subscription));

        if (user && user.plan !== "creator") {
          await db
            .update(users)
            .set({ plan: "creator", updatedAt: new Date() })
            .where(eq(users.id, user.id));
          console.log(`[webhook] ${event}: ${user.email} → creator`);
        }
        break;
      }

      // Assinatura cancelada/inativada — reverter para free
      case "SUBSCRIPTION_DELETED":
      case "SUBSCRIPTION_INACTIVATED": {
        const { subscription } = body;
        if (!subscription?.id) break;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.asaasSubscriptionId, subscription.id));

        if (user) {
          await db
            .update(users)
            .set({
              plan: "free",
              asaasSubscriptionId: null,
              updatedAt: new Date(),
            })
            .where(eq(users.id, user.id));
          console.log(`[webhook] ${event}: ${user.email} → free`);
        }
        break;
      }

      // Pagamento vencido ou removido — log
      case "PAYMENT_OVERDUE":
      case "PAYMENT_DELETED": {
        const { payment } = body;
        console.log(
          `[webhook] ${event}: payment=${payment?.id}, subscription=${payment?.subscription}`
        );
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[webhook] Error:", error);
    return NextResponse.json({ received: true });
  }
}
