export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cancelSubscription } from "@/lib/billing/client";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  if (!user.asaasSubscriptionId) {
    return NextResponse.json(
      { error: "Nenhuma assinatura ativa" },
      { status: 400 }
    );
  }

  try {
    await cancelSubscription(user.asaasSubscriptionId);

    // Atualizar localmente (webhook também fará isso, mas garantimos consistência)
    await db
      .update(users)
      .set({
        plan: "free",
        asaasSubscriptionId: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cancel error:", error);
    return NextResponse.json(
      { error: "Erro ao cancelar assinatura. Tente novamente." },
      { status: 500 }
    );
  }
}
