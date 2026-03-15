import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="font-heading text-xl text-white font-bold">
              Splitpost
            </span>
            <p className="font-body text-sm mt-2 max-w-xs">
              Um conteúdo. Todas as redes.
            </p>
          </div>
          <nav aria-label="Links do rodapé" className="flex gap-8">
            <Link href="/pricing" className="font-body text-sm hover:text-white transition-colors">
              Pricing
            </Link>
            <a href="#" className="font-body text-sm hover:text-white transition-colors">
              Termos
            </a>
            <a href="#" className="font-body text-sm hover:text-white transition-colors">
              Privacidade
            </a>
          </nav>
        </div>
        <div className="border-t border-neutral-800 mt-8 pt-8">
          <p className="font-body text-xs text-neutral-500">&copy; 2026 Splitpost. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
