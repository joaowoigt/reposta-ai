import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { UserMenu } from "@/components/app/user-menu";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-3">
        <h1 className="text-lg font-bold tracking-tight text-neutral-900">
          Repost<span className="text-orange-500">AI</span>
        </h1>
        <UserMenu />
      </header>
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Dashboard</h2>
        <p className="mt-2 text-neutral-500">
          Bem-vindo, {session.user.name}! Esta pagina sera construida em breve.
        </p>
      </main>
    </div>
  );
}
