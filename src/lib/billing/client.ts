const ASAAS_BASE_URL =
  process.env.ASAAS_ENVIRONMENT === "production"
    ? "https://api.asaas.com/v3"
    : "https://sandbox.asaas.com/api/v3";

async function asaasRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${ASAAS_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      access_token: process.env.ASAAS_API_KEY!,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Asaas API error (${response.status}): ${error}`);
  }

  return response.json() as Promise<T>;
}

// ── Types ──

interface AsaasCustomer {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
}

interface AsaasSubscription {
  id: string;
  customer: string;
  billingType: string;
  cycle: string;
  value: number;
  nextDueDate: string;
  status: "ACTIVE" | "INACTIVE" | "EXPIRED";
  description: string;
}

interface AsaasPayment {
  id: string;
  subscription: string | null;
  status: string;
  value: number;
  invoiceUrl: string;
  dueDate: string;
  billingType: string;
}

interface AsaasPaymentList {
  data: AsaasPayment[];
  totalCount: number;
}

// ── Customer ──

export async function createCustomer(data: {
  name: string;
  email: string;
  cpfCnpj: string;
  externalReference?: string;
}): Promise<AsaasCustomer> {
  return asaasRequest<AsaasCustomer>("/customers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Subscription ──

export async function createSubscription(data: {
  customer: string;
  value: number;
  cycle?: string;
  description?: string;
  externalReference?: string;
}): Promise<AsaasSubscription> {
  return asaasRequest<AsaasSubscription>("/subscriptions", {
    method: "POST",
    body: JSON.stringify({
      billingType: "UNDEFINED",
      cycle: "MONTHLY",
      ...data,
    }),
  });
}

export async function getSubscription(
  subscriptionId: string
): Promise<AsaasSubscription> {
  return asaasRequest<AsaasSubscription>(`/subscriptions/${subscriptionId}`);
}

export async function cancelSubscription(
  subscriptionId: string
): Promise<{ deleted: boolean; id: string }> {
  return asaasRequest(`/subscriptions/${subscriptionId}`, {
    method: "DELETE",
  });
}

// ── Payments ──

export async function getSubscriptionPayments(
  subscriptionId: string
): Promise<AsaasPaymentList> {
  return asaasRequest<AsaasPaymentList>(
    `/subscriptions/${subscriptionId}/payments?sort=dueDate&order=asc&limit=1`
  );
}

// ── Config ──

export const CREATOR_PRICE = 67;
export const CAMPAIGN_PRICE = 47;
export const LAUNCH_CAMPAIGN_ACTIVE =
  process.env.LAUNCH_CAMPAIGN_ACTIVE === "true";
