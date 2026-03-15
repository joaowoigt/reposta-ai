import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de uso do Splitpost. Leia as condições para utilização da nossa plataforma de repurposing de conteúdo com IA.",
  openGraph: {
    title: "Termos de Uso | Splitpost",
    description:
      "Condições de uso da plataforma Splitpost.",
  },
};

export default function TermosPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-5 md:px-8">
        <h1 className="font-heading text-4xl font-bold text-neutral-800">
          Termos de Uso
        </h1>
        <p className="font-body text-sm text-neutral-400 mt-2">
          Ultima atualizacao: 15 de marco de 2026
        </p>

        <div className="mt-10 space-y-8 font-body text-neutral-600 leading-relaxed">
          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              1. Aceitacao dos Termos
            </h2>
            <p>
              Ao acessar ou utilizar o Splitpost (&quot;Plataforma&quot;), voce concorda com
              estes Termos de Uso. Se voce nao concordar com algum dos termos, nao
              utilize a Plataforma. O Splitpost e operado por Joao Lucas Woigt Azevedo
              (&quot;Operador&quot;).
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              2. Descricao do Servico
            </h2>
            <p>
              O Splitpost e uma plataforma de repurposing de conteudo que utiliza
              inteligencia artificial para transformar um unico conteudo em multiplos
              formatos adaptados para diferentes redes sociais (X/Twitter, LinkedIn,
              Instagram e newsletters).
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              3. Cadastro e Conta
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>O cadastro e feito exclusivamente via autenticacao Google.</li>
              <li>
                Voce e responsavel por manter a seguranca da sua conta Google e por
                todas as atividades realizadas na Plataforma.
              </li>
              <li>
                E proibido compartilhar credenciais ou permitir acesso de terceiros
                a sua conta.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              4. Planos e Pagamentos
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                O Splitpost oferece um plano gratuito com limite de geracoes mensais
                e planos pagos com mais recursos.
              </li>
              <li>
                Os pagamentos sao processados pela Asaas. Ao assinar um plano pago,
                voce concorda com os termos de pagamento da Asaas.
              </li>
              <li>
                A cobranca e recorrente (mensal). Voce pode cancelar a assinatura a
                qualquer momento pelo painel de billing da Plataforma.
              </li>
              <li>
                Apos o cancelamento, o acesso ao plano pago permanece ativo ate o
                fim do periodo ja pago. Nao ha reembolso proporcional.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              5. Uso Aceitavel
            </h2>
            <p className="mb-3">Voce concorda em nao utilizar a Plataforma para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gerar conteudo ilegal, difamatorio, discriminatorio ou que viole direitos de terceiros.</li>
              <li>Enviar conteudo que contenha malware, spam ou phishing.</li>
              <li>Tentar acessar sistemas, dados ou contas de outros usuarios.</li>
              <li>Utilizar a Plataforma de forma que possa prejudicar seu funcionamento ou desempenho.</li>
              <li>Revender ou redistribuir o servico sem autorizacao.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              6. Conteudo do Usuario
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Voce mantem a propriedade do conteudo que envia a Plataforma
                (conteudo original).
              </li>
              <li>
                O conteudo gerado pela IA e de uso livre do usuario, sem
                exclusividade. O Splitpost nao reivindica propriedade sobre o
                conteudo gerado.
              </li>
              <li>
                Voce e responsavel por revisar o conteudo gerado antes de publica-lo.
                O Splitpost nao garante que o conteudo gerado sera preciso, completo
                ou adequado para qualquer finalidade.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              7. Inteligencia Artificial
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                O conteudo e gerado por modelos de IA de terceiros (Anthropic/Claude).
                Resultados podem variar e nao sao garantidos.
              </li>
              <li>
                O Splitpost nao armazena nem utiliza seu conteudo para treinar
                modelos de IA. O conteudo e enviado aos provedores de IA
                exclusivamente para gerar as adaptacoes solicitadas.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              8. Disponibilidade e Limitacoes
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                O Splitpost e fornecido &quot;como esta&quot; (&quot;as is&quot;). Nao garantimos
                disponibilidade ininterrupta ou ausencia de erros.
              </li>
              <li>
                Reservamo-nos o direito de modificar, suspender ou descontinuar
                qualquer funcionalidade a qualquer momento, com aviso previo quando
                possivel.
              </li>
              <li>
                Os limites de geracao por plano podem ser ajustados com notificacao
                previa aos usuarios.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              9. Limitacao de Responsabilidade
            </h2>
            <p>
              Na extensao maxima permitida por lei, o Splitpost e seu operador nao
              serao responsaveis por danos indiretos, incidentais ou consequenciais
              decorrentes do uso da Plataforma, incluindo mas nao se limitando a
              perda de dados, lucros cessantes ou interrupcao de atividade.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              10. Alteracoes nos Termos
            </h2>
            <p>
              Podemos atualizar estes Termos periodicamente. Alteracoes significativas
              serao comunicadas por email ou pela Plataforma. O uso continuado apos
              alteracoes constitui aceitacao dos novos termos.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              11. Legislacao Aplicavel
            </h2>
            <p>
              Estes Termos sao regidos pelas leis da Republica Federativa do Brasil.
              Eventuais disputas serao submetidas ao foro da comarca do domicilio do
              Operador.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              12. Contato
            </h2>
            <p>
              Para duvidas sobre estes Termos, entre em contato pelo email{" "}
              <a
                href="mailto:joaowoigt@gmail.com"
                className="text-violet-600 hover:underline"
              >
                joaowoigt@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
