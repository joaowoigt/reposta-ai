import Link from "next/link";

export default function BatchNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      </div>

      <h1 className="font-heading text-xl font-bold text-neutral-800 mb-3">
        Geração não encontrada
      </h1>

      <p className="font-body text-sm text-neutral-500 mb-12 max-w-sm">
        Essa geração não existe ou não pertence à sua conta. Verifique o link ou gere um novo conteúdo.
      </p>

      <Link
        href="/generate"
        className="bg-primary-500 text-white font-body font-medium px-6 py-2.5 rounded-lg text-sm hover:bg-primary-400 active:bg-primary-600 transition-colors shadow-sm"
      >
        Gerar novo conteúdo
      </Link>
    </div>
  );
}
