import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-heading text-xl font-bold text-neutral-900">
          Repost<span className="text-primary-500">AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#como-funciona" className="font-body text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
            Como funciona
          </a>
          <Link href="/pricing" className="font-body text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
            Pricing
          </Link>
        </nav>
        <Link
          href="/login"
          className="bg-primary-500 text-white font-body font-medium px-4 py-2 rounded-lg text-sm hover:bg-primary-400 transition-colors duration-200"
        >
          Começar grátis
        </Link>
      </div>
    </header>
  );
}
