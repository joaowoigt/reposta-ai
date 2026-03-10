import { SignInButton } from "@/components/app/sign-in-button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <div className="w-full max-w-sm space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Repost<span className="text-primary-500">AI</span>
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Transforme 1 conteúdo em 10 posts — em segundos.
          </p>
        </div>
        <div className="flex justify-center">
          <SignInButton />
        </div>
        <p className="text-center text-xs text-neutral-400">
          Ao entrar, você concorda com nossos Termos de Serviço e Política de
          Privacidade.
        </p>
      </div>
    </div>
  );
}
