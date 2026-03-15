"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface BillingClientProps {
  plan: string;
  subscription: {
    status: string;
    value: number;
    nextDueDate: string;
  } | null;
  price: number;
  fullPrice: number;
  isCampaign: boolean;
}

export function BillingClient({
  plan,
  subscription,
  price,
  fullPrice,
  isCampaign,
}: BillingClientProps) {
  const router = useRouter();

  if (plan === "free") {
    return (
      <div className="space-y-6">
        <CurrentPlanCard plan="free" />
        <UpgradeCard
          price={price}
          fullPrice={fullPrice}
          isCampaign={isCampaign}
          onUpgraded={() => router.refresh()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CurrentPlanCard plan={plan} subscription={subscription} />
      <ManageCard
        plan={plan}
        subscription={subscription}
        onCancel={() => router.refresh()}
      />
    </div>
  );
}

// ── Current Plan Card ──

function CurrentPlanCard({
  plan,
  subscription,
}: {
  plan: string;
  subscription?: {
    status: string;
    value: number;
    nextDueDate: string;
  } | null;
}) {
  const isCreator = plan === "creator";
  const isPro = plan === "pro";
  const isPaid = isCreator || isPro;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-body text-sm text-neutral-500">Plano atual</p>
          <h2 className="font-heading text-xl font-bold text-neutral-900 mt-0.5">
            {plan === "free" ? "Free" : plan === "creator" ? "Creator" : "Pro"}
          </h2>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-body ${
            isPaid
              ? "bg-primary-50 text-primary-700"
              : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {isPaid ? "Ativo" : "Gratuito"}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-100">
        <p className="font-body text-sm font-medium text-neutral-700 mb-2">
          O que está incluso:
        </p>
        <ul className="space-y-1.5">
          <FeatureItem text={isPaid ? "50 gerações/mês" : "5 gerações/mês"} />
          <FeatureItem text="4 plataformas (X, LinkedIn, Instagram, Newsletter)" />
          <FeatureItem text="IA avançada (Claude)" />
          {isPaid && <FeatureItem text="Suporte prioritário" />}
        </ul>
      </div>

      {subscription && (
        <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
          <div className="flex justify-between font-body text-sm">
            <span className="text-neutral-500">Valor mensal</span>
            <span className="text-neutral-900 font-medium">
              R${subscription.value}
            </span>
          </div>
          <div className="flex justify-between font-body text-sm">
            <span className="text-neutral-500">Próximo pagamento</span>
            <span className="text-neutral-900 font-medium">
              {formatDate(subscription.nextDueDate)}
            </span>
          </div>
          <div className="flex justify-between font-body text-sm">
            <span className="text-neutral-500">Status</span>
            <span
              className={`font-medium ${
                subscription.status === "ACTIVE"
                  ? "text-green-600"
                  : "text-neutral-500"
              }`}
            >
              {subscription.status === "ACTIVE" ? "Ativo" : "Inativo"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Upgrade Card (Free users) ──

function UpgradeCard({
  price,
  fullPrice,
  isCampaign,
  onUpgraded,
}: {
  price: number;
  fullPrice: number;
  isCampaign: boolean;
  onUpgraded: () => void;
}) {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState("");

  const pollForUpgrade = useCallback(() => {
    setIsPolling(true);

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/billing/status");
        const data = await res.json();

        if (data.plan !== "free") {
          clearInterval(interval);
          setIsPolling(false);
          setIsLoading(false);
          onUpgraded();
        }
      } catch {
        // Silently retry
      }
    }, 3000);

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(interval);
      setIsPolling(false);
      setIsLoading(false);
    }, 5 * 60 * 1000);

    return interval;
  }, [onUpgraded]);

  useEffect(() => {
    return () => {
      setIsPolling(false);
    };
  }, []);

  async function handleUpgrade(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpfCnpj }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao processar checkout.");
        setIsLoading(false);
        return;
      }

      // Abrir página de pagamento do Asaas em nova aba
      window.open(data.url, "_blank");

      // Iniciar polling para detectar quando o pagamento for confirmado
      pollForUpgrade();
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setIsLoading(false);
    }
  }

  if (isPolling) {
    return (
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <SpinnerIcon />
        </div>
        <h3 className="font-heading text-lg font-bold text-neutral-900">
          Aguardando confirmação do pagamento...
        </h3>
        <p className="font-body text-sm text-neutral-600 mt-2">
          Complete o pagamento na aba do Asaas. Esta página será atualizada
          automaticamente quando o pagamento for confirmado.
        </p>
        <button
          onClick={() => {
            setIsPolling(false);
            setIsLoading(false);
          }}
          className="mt-4 font-body text-sm text-neutral-500 hover:text-neutral-700 transition-colors underline"
        >
          Cancelar e voltar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-primary-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-1">
        <UpgradeIcon />
        <h2 className="font-heading text-lg font-bold text-neutral-900">
          Upgrade para Creator
        </h2>
      </div>

      <p className="font-body text-sm text-neutral-500 mt-1">
        Desbloqueie todo o potencial do Splitpost com 10x mais gerações.
      </p>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-heading text-3xl font-bold text-primary-600">
          R${price}
        </span>
        <span className="font-body text-neutral-500">/mês</span>
        {isCampaign && price !== fullPrice && (
          <span className="font-body text-sm text-neutral-400 line-through">
            R${fullPrice}/mês
          </span>
        )}
      </div>

      {isCampaign && (
        <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 font-body">
          Campanha de lançamento — primeiro mês com desconto!
        </div>
      )}

      <ul className="mt-4 space-y-2 font-body text-sm text-neutral-600">
        <li className="flex items-center gap-2">
          <CheckIcon />
          <span>
            <strong className="text-neutral-900">50 gerações</strong> por mês
            (10x mais)
          </span>
        </li>
        <li className="flex items-center gap-2">
          <CheckIcon />
          4 plataformas (X, LinkedIn, Instagram, Newsletter)
        </li>
        <li className="flex items-center gap-2">
          <CheckIcon />
          Pague com PIX, cartão ou boleto
        </li>
        <li className="flex items-center gap-2">
          <CheckIcon />
          Cancele quando quiser
        </li>
      </ul>

      <form onSubmit={handleUpgrade} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="cpfCnpj"
            className="block font-body text-sm font-medium text-neutral-700 mb-1"
          >
            CPF ou CNPJ
          </label>
          <input
            id="cpfCnpj"
            type="text"
            required
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(formatCpf(e.target.value))}
            placeholder="000.000.000-00"
            maxLength={18}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <p className="mt-1 font-body text-xs text-neutral-400">
            Necessário para emissão da cobrança.
          </p>
        </div>

        {error && (
          <p className="font-body text-sm text-error-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-500 text-white font-body font-medium px-6 py-3 rounded-lg text-base hover:bg-primary-400 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processando..." : "Assinar Creator"}
        </button>
      </form>
    </div>
  );
}

// ── Manage Card (Paid users) ──

function ManageCard({
  plan,
  subscription,
  onCancel,
}: {
  plan: string;
  subscription: { status: string; value: number; nextDueDate: string } | null;
  onCancel: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleCancel() {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/billing/cancel", {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Erro ao cancelar.");
        setIsLoading(false);
        return;
      }

      onCancel();
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setIsLoading(false);
    }
  }

  if (!subscription) return null;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6">
      <h3 className="font-heading text-base font-bold text-neutral-900">
        Gerenciar assinatura
      </h3>

      <div className="mt-4">
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="font-body text-sm text-neutral-500 hover:text-error-500 transition-colors"
          >
            Cancelar assinatura
          </button>
        ) : (
          <div className="space-y-3">
            <p className="font-body text-sm text-neutral-700">
              Tem certeza? Seu plano voltará para Free e você perderá o acesso
              às gerações extras.
            </p>
            {error && (
              <p className="font-body text-sm text-error-500">{error}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="px-4 py-2 bg-error-500 text-white font-body text-sm rounded-lg hover:bg-error-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Cancelando..." : "Sim, cancelar"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isLoading}
                className="px-4 py-2 bg-neutral-100 text-neutral-700 font-body text-sm rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Manter plano
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Helpers ──

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("pt-BR");
}

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

// ── Feature Item ──

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 font-body text-sm text-neutral-600">
      <CheckIcon />
      {text}
    </li>
  );
}

// ── Icons ──

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-primary-500 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function UpgradeIcon() {
  return (
    <svg
      className="w-5 h-5 text-primary-500"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="w-8 h-8 text-primary-500 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
