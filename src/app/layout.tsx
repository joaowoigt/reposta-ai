import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import { SessionProvider } from "@/components/app/session-provider";
import { Toaster } from "@/components/ui/sonner";
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

export const metadata: Metadata = {
  title: "RepostAI",
  description: "Transforme 1 conteúdo em 10 posts — em segundos.",
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
      </body>
    </html>
  );
}
