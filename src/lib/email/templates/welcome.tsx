import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  const firstName = name.split(" ")[0] || name;

  return (
    <Html>
      <Head />
      <Preview>Bem-vindo ao RepostAI — transforme seu conteúdo em posts para todas as plataformas</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Bem-vindo ao RepostAI!</Heading>

          <Text style={text}>
            Olá {firstName},
          </Text>

          <Text style={text}>
            Sua conta foi criada com sucesso. Agora você pode transformar qualquer
            conteúdo longo em posts otimizados para X, LinkedIn, Instagram e Newsletter
            — em segundos.
          </Text>

          <Section style={ctaSection}>
            <Link href="https://repostai.com.br/generate" style={button}>
              Gerar meu primeiro conteúdo
            </Link>
          </Section>

          <Text style={text}>
            No plano gratuito, você tem <strong>5 gerações por mês</strong> para
            experimentar. Quando quiser mais, é só fazer o upgrade para o plano Creator.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            RepostAI — Repurpose seu conteúdo com IA
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// ── Styles ──

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 24px",
  maxWidth: "480px",
  borderRadius: "8px",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "700" as const,
  margin: "0 0 24px",
};

const text = {
  color: "#4a4a4a",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#6366f1",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600" as const,
  textDecoration: "none",
  padding: "12px 32px",
  borderRadius: "8px",
  display: "inline-block",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0 16px",
};

const footer = {
  color: "#9ca3af",
  fontSize: "13px",
  margin: "0",
};
