import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
