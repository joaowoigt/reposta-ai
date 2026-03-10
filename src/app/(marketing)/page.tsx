import Link from "next/link";
import { FeatureStep } from "@/components/marketing/feature-step";
import { PricingCard } from "@/components/marketing/pricing-card";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-[56px] font-extrabold text-neutral-900 leading-[1.1] tracking-tight max-w-3xl mx-auto">
            Transforme 1 conteúdo em 10 posts —{" "}
            <span className="text-primary-500">em segundos</span>
          </h1>
          <p className="font-body text-lg text-neutral-500 mt-6 max-w-2xl mx-auto leading-relaxed">
            Cole seu artigo, blog post ou transcrição. A IA gera posts otimizados
            para X, LinkedIn, Instagram e Newsletter.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="bg-primary-500 text-white font-body font-medium px-6 py-3 rounded-lg text-base hover:bg-primary-400 active:bg-primary-600 transition-colors duration-200 shadow-sm"
            >
              Começar grátis
            </Link>
            <a
              href="#como-funciona"
              className="text-neutral-600 font-body font-medium px-6 py-3 rounded-lg text-base hover:bg-neutral-100 transition-colors duration-200"
            >
              Como funciona
            </a>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <h2 className="font-heading text-3xl md:text-[32px] font-bold text-neutral-800 text-center">
            Como funciona
          </h2>
          <p className="font-body text-lg text-neutral-500 text-center mt-4 max-w-2xl mx-auto">
            Três passos. Zero esforço. Conteúdo pronto para publicar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <FeatureStep
              step={1}
              title="Cole seu conteúdo"
              description="Artigo, blog post, transcrição de vídeo, thread — qualquer texto longo."
              icon={
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
              }
            />
            <FeatureStep
              step={2}
              title="Selecione as plataformas"
              description="Escolha onde quer publicar: X, LinkedIn, Instagram, Newsletter."
              icon={
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              }
            />
            <FeatureStep
              step={3}
              title="Receba posts prontos"
              description="Copie e publique. Cada post é otimizado para a plataforma escolhida."
              icon={
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Plataformas suportadas */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-[32px] font-bold text-neutral-800">
            Plataformas suportadas
          </h2>
          <p className="font-body text-lg text-neutral-500 mt-4 max-w-2xl mx-auto">
            Um conteúdo, múltiplos formatos. Cada post respeita as regras e boas práticas da plataforma.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12">
            <PlatformBadge name="X (Twitter)" icon="𝕏" bg="bg-neutral-900" />
            <PlatformBadge name="LinkedIn" icon="in" bg="bg-[#0A66C2]" />
            <PlatformBadge name="Instagram" icon="IG" bg="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]" />
            <PlatformBadge name="Newsletter" icon="✉" bg="bg-neutral-700" />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <h2 className="font-heading text-3xl md:text-[32px] font-bold text-neutral-800 text-center">
            Planos simples, sem surpresas
          </h2>
          <p className="font-body text-lg text-neutral-500 text-center mt-4 max-w-2xl mx-auto">
            Comece grátis e escale conforme sua necessidade.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <PricingCard
              name="Free"
              price="$0"
              description="Para experimentar o poder do repurposing."
              features={[
                "5 repurposes por mês",
                "3 plataformas (X, LinkedIn, Newsletter)",
                "Histórico de 7 dias",
              ]}
              cta="Começar grátis"
            />
            <PricingCard
              name="Creator"
              price="$19"
              period="mês"
              description="Para criadores de conteúdo sérios."
              features={[
                "50 repurposes por mês",
                "Todas as plataformas",
                "Histórico ilimitado",
                "Tom de voz personalizado",
                "Suporte prioritário",
              ]}
              cta="Assinar Creator"
              highlighted
            />
            <PricingCard
              name="Pro"
              price="$49"
              period="mês"
              description="Para equipes e agências."
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

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <h2 className="font-heading text-3xl md:text-[32px] font-bold text-neutral-800 text-center">
            Perguntas frequentes
          </h2>
          <div className="max-w-2xl mx-auto mt-12 space-y-6">
            <FaqItem
              question="Que tipo de conteúdo posso transformar?"
              answer="Qualquer texto longo: artigos de blog, transcrições de vídeo/podcast, threads do Twitter, newsletters, capítulos de livro. Quanto mais conteúdo, melhores os resultados."
            />
            <FaqItem
              question="A IA copia meu texto ou cria algo novo?"
              answer="A IA reescreve e adapta seu conteúdo para cada plataforma, respeitando limites de caracteres, tom e boas práticas. Não é cópia — é transformação inteligente."
            />
            <FaqItem
              question="Posso editar os posts gerados?"
              answer="Sim! Os posts gerados são um ponto de partida otimizado. Você pode editar antes de publicar."
            />
            <FaqItem
              question="Preciso de cartão de crédito para começar?"
              answer="Não. O plano Free é 100% gratuito, sem necessidade de cartão. Você só paga se decidir fazer upgrade."
            />
            <FaqItem
              question="Quais plataformas são suportadas?"
              answer="Atualmente: X (Twitter), LinkedIn, Instagram e Newsletter. Estamos trabalhando em mais integrações."
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-primary-500">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-[32px] font-bold text-white">
            Pronto para multiplicar seu conteúdo?
          </h2>
          <p className="font-body text-lg text-primary-100 mt-4 max-w-xl mx-auto">
            Experimente grátis — sem cartão de crédito. Transforme seu próximo conteúdo em posts para todas as plataformas.
          </p>
          <Link
            href="/login"
            className="inline-block mt-8 bg-white text-primary-600 font-body font-semibold px-8 py-3.5 rounded-lg text-base hover:bg-primary-50 transition-colors duration-200 shadow-md"
          >
            Começar grátis agora
          </Link>
        </div>
      </section>
    </>
  );
}

function PlatformBadge({ name, icon, bg }: { name: string; icon: string; bg: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${bg} text-white text-xl font-bold shadow-md`}>
        {icon}
      </div>
      <span className="font-body text-sm font-medium text-neutral-700">{name}</span>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-neutral-200 rounded-lg bg-white">
      <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-body text-base font-medium text-neutral-800 hover:text-neutral-900">
        {question}
        <svg
          className="h-5 w-5 text-neutral-400 transition-transform group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <div className="px-6 pb-4">
        <p className="font-body text-sm text-neutral-600 leading-relaxed">{answer}</p>
      </div>
    </details>
  );
}
