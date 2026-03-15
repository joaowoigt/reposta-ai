import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import { SessionProvider } from "@/components/app/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://splitpost.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Splitpost — Um conteúdo. Todas as redes.",
    template: "%s | Splitpost",
  },
  description:
    "Cole seu artigo, blog post ou transcrição e receba posts otimizados para X, LinkedIn, Instagram e Newsletter em segundos. Repurposing de conteúdo com IA.",
  keywords: [
    "repurposing",
    "conteúdo",
    "IA",
    "inteligência artificial",
    "redes sociais",
    "social media",
    "posts",
    "marketing digital",
    "criador de conteúdo",
    "Splitpost",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Splitpost",
    title: "Splitpost — Um conteúdo. Todas as redes.",
    description:
      "Cole seu artigo, blog post ou transcrição e receba posts otimizados para X, LinkedIn, Instagram e Newsletter em segundos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Splitpost — Um conteúdo. Todas as redes.",
    description:
      "Cole seu artigo, blog post ou transcrição e receba posts otimizados para X, LinkedIn, Instagram e Newsletter em segundos.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
        <Toaster position="top-right" richColors closeButton />
        <Analytics />
      </body>
    </html>
  );
}
