"use client";

import { useState } from "react";
import Link from "next/link";
import { ResultCard } from "@/components/app/result-card";

interface ResultItem {
  id: string;
  platform: string;
  outputText: string;
  tokensUsed: number;
}

interface ResultsViewProps {
  batchId: string;
  inputText: string;
  inputUrl: string | null;
  createdAt: string;
  results: ResultItem[];
}

export function ResultsView({
  inputText,
  inputUrl,
  createdAt,
  results: initialResults,
}: ResultsViewProps) {
  const [results, setResults] = useState(initialResults);
  const [showFullInput, setShowFullInput] = useState(false);

  const truncatedInput =
    inputText.length > 300 ? inputText.slice(0, 300) + "..." : inputText;
  const formattedDate = new Date(createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  function handleRegenerated(id: string, newOutput: string, newTokens: number) {
    setResults((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, outputText: newOutput, tokensUsed: newTokens } : r,
      ),
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/generate"
          className="font-body text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          &larr; Nova geração
        </Link>
      </div>

      <h1 className="font-heading text-2xl font-bold text-neutral-800">
        Resultados
      </h1>

      {/* Input original */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-body text-sm font-medium text-neutral-500">
            Conteúdo original
          </h2>
          <span className="font-body text-xs text-neutral-400">
            {formattedDate}
          </span>
        </div>

        {inputUrl && (
          <p className="font-body text-xs text-primary-500 mb-2 break-all">
            {inputUrl}
          </p>
        )}

        <p className="font-body text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">
          {showFullInput ? inputText : truncatedInput}
        </p>

        {inputText.length > 300 && (
          <button
            onClick={() => setShowFullInput(!showFullInput)}
            className="font-body text-xs text-primary-500 hover:text-primary-400 mt-2 transition-colors"
          >
            {showFullInput ? "Mostrar menos" : "Mostrar tudo"}
          </button>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h2 className="font-heading text-lg font-semibold text-neutral-800">
          {results.length} {results.length === 1 ? "plataforma" : "plataformas"}
        </h2>

        {results.map((result) => (
          <ResultCard
            key={result.id}
            id={result.id}
            platform={result.platform}
            outputText={result.outputText}
            tokensUsed={result.tokensUsed}
            showRegenerate
            onRegenerated={handleRegenerated}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Link
          href="/generate"
          className="bg-primary-500 text-white font-body font-medium px-6 py-2.5 rounded-lg text-sm hover:bg-primary-400 active:bg-primary-600 transition-colors shadow-sm"
        >
          Gerar novo conteúdo
        </Link>
      </div>
    </div>
  );
}
