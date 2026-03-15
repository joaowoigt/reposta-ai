import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Usar domínio de teste do Resend até ter domínio próprio verificado
export const EMAIL_FROM = "Splitpost <onboarding@resend.dev>";
