"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-error-50 flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-error-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h1 className="font-heading text-2xl font-bold text-neutral-800 mb-3">
        Algo deu errado
      </h1>

      <p className="font-body text-sm text-neutral-500 mb-8 max-w-sm">
        Ocorreu um erro inesperado. Tente novamente ou volte à página inicial.
      </p>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="bg-primary-500 text-white font-body font-medium px-6 py-2.5 rounded-lg text-sm hover:bg-primary-400 active:bg-primary-600 transition-colors shadow-sm"
        >
          Tentar novamente
        </button>
        <a
          href="/"
          className="bg-neutral-100 text-neutral-700 font-body font-medium px-6 py-2.5 rounded-lg text-sm hover:bg-neutral-200 transition-colors"
        >
          Voltar ao início
        </a>
      </div>
    </div>
  );
}
