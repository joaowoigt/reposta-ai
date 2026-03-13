import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
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
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h1 className="font-heading text-2xl font-bold text-neutral-800 mb-3">
        Página não encontrada
      </h1>

      <p className="font-body text-sm text-neutral-500 mb-8 max-w-sm">
        A página que você está procurando não existe ou foi movida.
      </p>

      <Link
        href="/"
        className="bg-primary-500 text-white font-body font-medium px-6 py-2.5 rounded-lg text-sm hover:bg-primary-400 active:bg-primary-600 transition-colors shadow-sm"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
