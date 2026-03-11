"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="font-body text-xs px-3 py-1 rounded-md transition-colors duration-200 bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
    >
      {copied ? "Copiado!" : "Copiar"}
    </button>
  );
}
