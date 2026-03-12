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

interface UpgradeEmailProps {
  name: string;
}

export function UpgradeEmail({ name }: UpgradeEmailProps) {
  const firstName = name.split(" ")[0] || name;

  return (
    <Html>
      <Head />
      <Preview>Seu plano Creator está ativo — 50 gerações por mês desbloqueadas!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Plano Creator ativo!</Heading>

          <Text style={text}>
            Olá {firstName},
          </Text>

          <Text style={text}>
            Seu pagamento foi confirmado e seu plano Creator já está ativo.
            Agora você tem acesso a <strong>50 gerações por mês</strong> para
            todas as plataformas.
          </Text>

          <Section style={featureBox}>
            <Text style={featureTitle}>O que você desbloqueou:</Text>
            <Text style={featureItem}>- 50 gerações por mês (10x mais)</Text>
            <Text style={featureItem}>- X, LinkedIn, Instagram e Newsletter</Text>
            <Text style={featureItem}>- Suporte prioritário</Text>
          </Section>

          <Section style={ctaSection}>
            <Link href="https://repostai.com.br/generate" style={button}>
              Gerar conteúdo agora
            </Link>
          </Section>

          <Text style={text}>
            Você pode gerenciar sua assinatura a qualquer momento na{" "}
            <Link href="https://repostai.com.br/billing" style={link}>
              página de assinatura
            </Link>.
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

const featureBox = {
  backgroundColor: "#f0f0ff",
  borderRadius: "8px",
  padding: "16px 20px",
  margin: "24px 0",
};

const featureTitle = {
  color: "#1a1a1a",
  fontSize: "14px",
  fontWeight: "600" as const,
  margin: "0 0 8px",
};

const featureItem = {
  color: "#4a4a4a",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
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

const link = {
  color: "#6366f1",
  textDecoration: "underline",
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
