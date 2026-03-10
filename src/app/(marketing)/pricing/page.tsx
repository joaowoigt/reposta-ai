import { PricingCard } from "@/components/marketing/pricing-card";

export default function PricingPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <h1 className="font-heading text-4xl font-bold text-neutral-800 text-center">
          Planos simples, sem surpresas
        </h1>
        <p className="font-body text-lg text-neutral-500 text-center mt-4 max-w-2xl mx-auto">
          Comece gratis e escale conforme sua necessidade.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <PricingCard
            name="Free"
            price="$0"
            description="Para experimentar o poder do repurposing."
            features={[
              "5 repurposes por mes",
              "3 plataformas (X, LinkedIn, Newsletter)",
              "Historico de 7 dias",
            ]}
            cta="Começar gratis"
          />
          <PricingCard
            name="Creator"
            price="$19"
            period="mes"
            description="Para criadores de conteudo serios."
            features={[
              "50 repurposes por mes",
              "Todas as plataformas",
              "Historico ilimitado",
              "Tom de voz personalizado",
              "Suporte prioritario",
            ]}
            cta="Assinar Creator"
            highlighted
          />
          <PricingCard
            name="Pro"
            price="$49"
            period="mes"
            description="Para equipes e agencias."
            features={[
              "Repurposes ilimitados",
              "Todas as plataformas",
              "API access",
              "Agendamento de posts",
              "Integrações avançadas",
            ]}
            cta="Em breve"
            disabled
          />
        </div>
      </div>
    </section>
  );
}
