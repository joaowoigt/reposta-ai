import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-neutral-900">Dashboard</h1>
      <p className="font-body text-neutral-500 mt-1">
        Bem-vindo, {session.user.name}!
      </p>
      <div className="mt-8">
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 bg-primary-500 text-white font-body font-medium px-6 py-3 rounded-lg text-base hover:bg-primary-400 transition-colors duration-200 shadow-sm"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          Gerar conteúdo
        </Link>
      </div>
    </div>
  );
}
