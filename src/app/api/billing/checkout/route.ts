import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  createCustomer,
  createSubscription,
  getSubscriptionPayments,
  CREATOR_PRICE,
  CAMPAIGN_PRICE,
  LAUNCH_CAMPAIGN_ACTIVE,
} from "@/lib/billing/client";

export async function POST(request: Request) {
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

  if (user.plan !== "free") {
    return NextResponse.json(
      { error: "Você já possui um plano ativo" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { cpfCnpj } = body;

  if (!cpfCnpj || typeof cpfCnpj !== "string") {
    return NextResponse.json(
      { error: "CPF/CNPJ é obrigatório" },
      { status: 400 }
    );
  }

  // Remove formatação do CPF/CNPJ (pontos, traços, barras)
  const cleanCpfCnpj = cpfCnpj.replace(/\D/g, "");

  if (cleanCpfCnpj.length !== 11 && cleanCpfCnpj.length !== 14) {
    return NextResponse.json(
      { error: "CPF ou CNPJ inválido" },
      { status: 400 }
    );
  }

  try {
    // 1. Criar customer no Asaas (ou reusar existente)
    let asaasCustomerId = user.asaasCustomerId;

    if (!asaasCustomerId) {
      const customer = await createCustomer({
        name: user.name || user.email,
        email: user.email,
        cpfCnpj: cleanCpfCnpj,
        externalReference: user.id,
      });
      asaasCustomerId = customer.id;

      await db
        .update(users)
        .set({ asaasCustomerId: customer.id, updatedAt: new Date() })
        .where(eq(users.id, user.id));
    }

    // 2. Criar assinatura
    const price = LAUNCH_CAMPAIGN_ACTIVE ? CAMPAIGN_PRICE : CREATOR_PRICE;

    const subscription = await createSubscription({
      customer: asaasCustomerId,
      value: price,
      description: `RepostAI Creator${LAUNCH_CAMPAIGN_ACTIVE ? " (Campanha de Lançamento)" : ""}`,
      externalReference: user.id,
    });

    // Salvar subscription ID
    await db
      .update(users)
      .set({
        asaasSubscriptionId: subscription.id,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // 3. Buscar a primeira cobrança para obter o link de pagamento
    const payments = await getSubscriptionPayments(subscription.id);

    if (payments.data.length === 0) {
      return NextResponse.json(
        { error: "Erro ao gerar cobrança. Tente novamente." },
        { status: 500 }
      );
    }

    const invoiceUrl = payments.data[0].invoiceUrl;

    return NextResponse.json({ url: invoiceUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erro ao processar checkout. Tente novamente." },
      { status: 500 }
    );
  }
}
