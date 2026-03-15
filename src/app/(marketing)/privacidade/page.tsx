import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Privacidade",
  description:
    "Politica de privacidade do Splitpost. Saiba como coletamos, usamos e protegemos seus dados pessoais.",
  openGraph: {
    title: "Politica de Privacidade | Splitpost",
    description:
      "Como o Splitpost trata seus dados pessoais, em conformidade com a LGPD.",
  },
};

export default function PrivacidadePage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-5 md:px-8">
        <h1 className="font-heading text-4xl font-bold text-neutral-800">
          Politica de Privacidade
        </h1>
        <p className="font-body text-sm text-neutral-400 mt-2">
          Ultima atualizacao: 15 de marco de 2026
        </p>

        <div className="mt-10 space-y-8 font-body text-neutral-600 leading-relaxed">
          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              1. Introducao
            </h2>
            <p>
              O Splitpost (&quot;Plataforma&quot;), operado por Joao Lucas Woigt Azevedo
              (&quot;Operador&quot;, &quot;nos&quot;), respeita sua privacidade e se compromete a
              proteger seus dados pessoais em conformidade com a Lei Geral de
              Protecao de Dados (LGPD — Lei n. 13.709/2018).
            </p>
            <p className="mt-3">
              Esta Politica descreve quais dados coletamos, como os utilizamos,
              com quem os compartilhamos e quais sao seus direitos como titular.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              2. Dados que Coletamos
            </h2>

            <h3 className="font-heading text-lg font-medium text-neutral-700 mb-2 mt-4">
              2.1. Dados fornecidos pelo Google OAuth
            </h3>
            <p>Ao fazer login, recebemos da sua conta Google:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Nome completo</li>
              <li>Endereco de email</li>
              <li>Foto de perfil</li>
            </ul>

            <h3 className="font-heading text-lg font-medium text-neutral-700 mb-2 mt-4">
              2.2. Dados de uso
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Conteudo enviado para repurposing (texto original)</li>
              <li>Conteudo gerado pela IA (adaptacoes)</li>
              <li>Historico de geracoes</li>
              <li>Plano e status de assinatura</li>
            </ul>

            <h3 className="font-heading text-lg font-medium text-neutral-700 mb-2 mt-4">
              2.3. Dados de pagamento
            </h3>
            <p>
              Dados de pagamento (cartao de credito, PIX, boleto) sao processados
              diretamente pela Asaas. O Splitpost nao armazena dados de cartao ou
              informacoes financeiras sensiveis.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              3. Como Usamos seus Dados
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Autenticacao:</strong> identificar voce e manter sua sessao
                ativa.
              </li>
              <li>
                <strong>Prestacao do servico:</strong> enviar seu conteudo a API de IA
                para gerar adaptacoes.
              </li>
              <li>
                <strong>Historico:</strong> permitir que voce acesse geracoes
                anteriores.
              </li>
              <li>
                <strong>Cobranca:</strong> gerenciar sua assinatura e processar
                pagamentos via Asaas.
              </li>
              <li>
                <strong>Comunicacao:</strong> enviar emails transacionais
                (boas-vindas, confirmacao de upgrade).
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              4. Compartilhamento de Dados
            </h2>
            <p className="mb-3">
              Seus dados podem ser compartilhados com os seguintes terceiros,
              exclusivamente para a prestacao do servico:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Anthropic (Claude API):</strong> seu conteudo original e
                enviado para geracao de adaptacoes. A Anthropic nao utiliza dados
                enviados via API para treinamento de modelos.
              </li>
              <li>
                <strong>Asaas:</strong> dados necessarios para processamento de
                pagamentos (nome, email, CPF).
              </li>
              <li>
                <strong>Resend:</strong> endereco de email para envio de emails
                transacionais.
              </li>
              <li>
                <strong>Neon (banco de dados):</strong> armazenamento seguro dos
                dados da aplicacao.
              </li>
              <li>
                <strong>Vercel:</strong> hospedagem da aplicacao.
              </li>
            </ul>
            <p className="mt-3">
              Nao vendemos, alugamos ou compartilhamos seus dados pessoais para
              fins de marketing de terceiros.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              5. Armazenamento e Seguranca
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Dados sao armazenados em banco de dados PostgreSQL hospedado na
                Neon, com conexao criptografada (SSL/TLS).
              </li>
              <li>
                A aplicacao utiliza HTTPS em todas as comunicacoes.
              </li>
              <li>
                Autenticacao segura via OAuth 2.0 (Google). Nao armazenamos senhas.
              </li>
              <li>
                Tokens de sessao sao gerenciados pelo NextAuth com secrets seguros.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              6. Seus Direitos (LGPD)
            </h2>
            <p className="mb-3">
              Como titular de dados pessoais, voce tem os seguintes direitos
              garantidos pela LGPD (Art. 18):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Acesso:</strong> solicitar quais dados pessoais temos sobre
                voce.
              </li>
              <li>
                <strong>Correcao:</strong> solicitar a correcao de dados incompletos
                ou desatualizados.
              </li>
              <li>
                <strong>Eliminacao:</strong> solicitar a exclusao dos seus dados
                pessoais.
              </li>
              <li>
                <strong>Portabilidade:</strong> solicitar seus dados em formato
                estruturado.
              </li>
              <li>
                <strong>Revogacao de consentimento:</strong> revogar a qualquer
                momento o consentimento para tratamento de dados.
              </li>
              <li>
                <strong>Informacao:</strong> ser informado sobre com quem seus dados
                sao compartilhados.
              </li>
            </ul>
            <p className="mt-3">
              Para exercer qualquer desses direitos, entre em contato pelo email{" "}
              <a
                href="mailto:joaowoigt@gmail.com"
                className="text-violet-600 hover:underline"
              >
                joaowoigt@gmail.com
              </a>
              . Responderemos em ate 15 dias uteis.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              7. Retencao de Dados
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Dados de conta sao mantidos enquanto sua conta estiver ativa.
              </li>
              <li>
                Historico de geracoes do plano Free e retido por 7 dias. Planos
                pagos tem historico ilimitado.
              </li>
              <li>
                Apos exclusao de conta, todos os dados pessoais sao removidos em
                ate 30 dias, exceto quando a retencao for necessaria por obrigacao
                legal.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              8. Cookies
            </h2>
            <p>
              O Splitpost utiliza apenas cookies essenciais para autenticacao e
              manutencao de sessao. Nao utilizamos cookies de rastreamento ou
              marketing.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              9. Menores de Idade
            </h2>
            <p>
              O Splitpost nao e destinado a menores de 18 anos. Nao coletamos
              intencionalmente dados de menores. Se tomarmos conhecimento de que
              dados de um menor foram coletados, eles serao excluidos
              imediatamente.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              10. Alteracoes nesta Politica
            </h2>
            <p>
              Podemos atualizar esta Politica periodicamente. Alteracoes
              significativas serao comunicadas por email ou pela Plataforma. A
              data de ultima atualizacao sera sempre indicada no topo desta
              pagina.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-semibold text-neutral-800 mb-3">
              11. Contato
            </h2>
            <p>
              Para duvidas, solicitacoes ou exercicio de direitos relacionados a
              seus dados pessoais, entre em contato pelo email{" "}
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
