import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app/app-sidebar";
import { UserMenu } from "@/components/app/user-menu";
import Link from "next/link";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 h-16 flex items-center px-5 shrink-0">
        <Link href="/dashboard" className="font-heading text-xl font-bold text-neutral-900">
          Repost<span className="text-primary-500">AI</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <UserMenu />
        </div>
      </header>
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
