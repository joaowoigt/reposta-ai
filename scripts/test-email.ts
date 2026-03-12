import { config } from "dotenv";
config({ path: ".env.local" });

import { Resend } from "resend";

async function main() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log("Enviando email de teste...");

  const { data, error } = await resend.emails.send({
    from: "RepostAI <onboarding@resend.dev>",
    to: "joaowoigt@gmail.com",
    subject: "Teste RepostAI - Email funcionando!",
    html: "<h1>Teste</h1><p>Se voce recebeu isso, o Resend esta funcionando.</p>",
  });

  if (error) {
    console.error("Erro:", error);
  } else {
    console.log("Enviado!", data);
  }
}

main().catch(console.error);
