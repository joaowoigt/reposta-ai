"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlatformSelector } from "@/components/app/platform-selector";
import { ToneSelector } from "@/components/app/tone-selector";
import { UsageCounter } from "@/components/app/usage-counter";

interface GenerateFormProps {
  usageUsed: number;
  usageLimit: number;
}

interface GenerationResult {
  platform: string;
  outputText: string;
  tokensUsed: number;
}

export function GenerateForm({ usageUsed, usageLimit }: GenerateFormProps) {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [tone, setTone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<GenerationResult[] | null>(null);

  const isAtLimit = usageUsed >= usageLimit;
  const charCount = inputText.length;
  const canSubmit = inputText.trim().length >= 100 && platforms.length > 0 && !isLoading && !isAtLimit;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResults(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputText,
          platforms,
          tone: tone || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao gerar conteúdo");
        return;
      }

      setResults(data.results);
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Usage counter */}
      <UsageCounter used={usageUsed} limit={usageLimit} />

      {isAtLimit && (
        <div className="bg-error-50 border border-error-500/20 rounded-lg p-4">
          <p className="font-body text-sm text-error-500 font-medium">
            Limite de {usageLimit} gerações por mês atingido.
          </p>
          <p className="font-body text-sm text-neutral-600 mt-1">
            Faça upgrade do seu plano para continuar gerando conteúdo.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Textarea */}
        <div>
          <label className="block font-body text-sm font-medium text-neutral-700 mb-1.5">
            Cole seu conteúdo
          </label>
          <textarea
            rows={8}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Cole seu artigo, blog post, transcrição de vídeo, thread — qualquer texto longo..."
            className="w-full font-body text-base text-neutral-800 bg-white border border-neutral-200 rounded-lg px-4 py-3 shadow-sm resize-y placeholder:text-neutral-400 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-colors duration-200"
            disabled={isAtLimit}
          />
          <div className="flex justify-between mt-1.5">
            <p className={`font-body text-xs ${charCount < 100 && charCount > 0 ? "text-warning-500" : "text-neutral-400"}`}>
              {charCount < 100 && charCount > 0
                ? `Mínimo 100 caracteres (faltam ${100 - charCount})`
                : "Mínimo 100 caracteres"}
            </p>
            <p className="font-body text-xs text-neutral-400">{charCount} caracteres</p>
          </div>
        </div>

        {/* Plataformas */}
        <div>
          <label className="block font-body text-sm font-medium text-neutral-700 mb-2">
            Plataformas
          </label>
          <PlatformSelector selected={platforms} onChange={setPlatforms} />
          {platforms.length === 0 && (
            <p className="font-body text-xs text-neutral-400 mt-1.5">Selecione pelo menos uma plataforma</p>
          )}
        </div>

        {/* Tom */}
        <div>
          <label className="block font-body text-sm font-medium text-neutral-700 mb-2">
            Tom <span className="text-neutral-400 font-normal">(opcional)</span>
          </label>
          <ToneSelector value={tone} onChange={setTone} />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-error-50 border border-error-500/20 rounded-lg p-3">
            <p className="font-body text-sm text-error-500">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-primary-500 text-white font-body font-medium px-6 py-3 rounded-lg text-base hover:bg-primary-400 active:bg-primary-600 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Gerando seus posts...
            </>
          ) : (
            "Gerar conteúdo"
          )}
        </button>
      </form>

      {/* Results */}
      {results && (
        <div className="space-y-4 mt-8">
          <h2 className="font-heading text-lg font-semibold text-neutral-800">Resultados</h2>
          {results.map((result) => (
            <ResultCard key={result.platform} result={result} />
          ))}
        </div>
      )}
    </div>
  );
}

function ResultCard({ result }: { result: GenerationResult }) {
  const [copied, setCopied] = useState(false);

  const PLATFORM_LABELS: Record<string, string> = {
    x: "X (Twitter)",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    newsletter: "Newsletter",
  };

  async function handleCopy() {
    await navigator.clipboard.writeText(result.outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-body text-sm font-medium text-neutral-800">
          {PLATFORM_LABELS[result.platform] || result.platform}
        </span>
        <button
          onClick={handleCopy}
          className="font-body text-xs px-3 py-1 rounded-md transition-colors duration-200 bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <p className="font-body text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">
        {result.outputText}
      </p>
      <p className="font-body text-xs text-neutral-400 mt-3">
        {result.tokensUsed} tokens usados
      </p>
    </div>
  );
}
