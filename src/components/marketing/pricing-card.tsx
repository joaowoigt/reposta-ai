import Link from "next/link";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  disabled?: boolean;
  badge?: string;
  originalPrice?: string;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted = false,
  disabled = false,
  badge,
  originalPrice,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-xl border p-6 md:p-8 flex flex-col ${
        highlighted
          ? "border-primary-500 bg-white shadow-lg ring-1 ring-primary-200"
          : "border-neutral-200 bg-white shadow-md"
      }`}
    >
      <div>
        {badge && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 font-body mb-3">
            {badge}
          </span>
        )}
        <h3 className="font-heading text-lg font-semibold text-neutral-800">{name}</h3>
        <p className="font-body text-sm text-neutral-500 mt-1">{description}</p>
      </div>
      <div className="mt-4">
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-4xl font-bold text-neutral-900">{price}</span>
          {period && <span className="font-body text-sm text-neutral-500">/{period}</span>}
        </div>
        {originalPrice && (
          <p className="font-body text-sm text-neutral-400 mt-1">
            Depois {originalPrice}/mês
          </p>
        )}
      </div>
      <ul className="mt-6 space-y-3 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 font-body text-sm text-neutral-600">
            <svg className="h-5 w-5 text-success-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {disabled ? (
          <span className="block w-full text-center font-body font-medium px-5 py-2.5 rounded-lg text-sm bg-neutral-100 text-neutral-400 cursor-not-allowed">
            {cta}
          </span>
        ) : (
          <Link
            href="/login"
            className={`block w-full text-center font-body font-medium px-5 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
              highlighted
                ? "bg-primary-500 text-white hover:bg-primary-400"
                : "bg-neutral-900 text-white hover:bg-neutral-800"
            }`}
          >
            {cta}
          </Link>
        )}
      </div>
    </div>
  );
}
