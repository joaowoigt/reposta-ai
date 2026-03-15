import { resend, EMAIL_FROM } from "./client";
import { WelcomeEmail } from "./templates/welcome";
import { UpgradeEmail } from "./templates/upgrade";

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: "Bem-vindo ao Splitpost!",
      react: WelcomeEmail({ name }),
    });

    if (error) {
      console.error("[email] Erro ao enviar welcome:", error);
    } else {
      console.log("[email] Welcome enviado:", data?.id, "→", to);
    }
  } catch (error) {
    console.error("[email] Exception ao enviar welcome:", error);
  }
}

export async function sendUpgradeEmail(to: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: "Seu plano Creator está ativo!",
      react: UpgradeEmail({ name }),
    });

    if (error) {
      console.error("[email] Erro ao enviar upgrade:", error);
    } else {
      console.log("[email] Upgrade enviado:", data?.id, "→", to);
    }
  } catch (error) {
    console.error("[email] Exception ao enviar upgrade:", error);
  }
}
