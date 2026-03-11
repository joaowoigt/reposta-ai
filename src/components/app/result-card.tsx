"use client";

import { useState } from "react";
import { CopyButton } from "./copy-button";

const PLATFORM_CONFIG: Record<
  string,
  { label: string; icon: string }
> = {
  x: { label: "X (Twitter)", icon: "𝕏" },
  linkedin: { label: "LinkedIn", icon: "in" },
  instagram: { label: "Instagram", icon: "📷" },
  newsletter: { label: "Newsletter", icon: "✉" },
};

interface ResultCardProps {
  id: string;
  platform: string;
  outputText: string;
  tokensUsed: number;
  showRegenerate?: boolean;
  onRegenerated?: (id: string, newOutput: string, newTokens: number) => void;
}

export function ResultCard({
  id,
  platform,
  outputText,
  tokensUsed,
  showRegenerate = false,
  onRegenerated,
}: ResultCardProps) {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const config = PLATFORM_CONFIG[platform] || {
    label: platform,
    icon: "📝",
  };

  // Formatar X threads: separar por \n\n---\n\n ou numeração tipo "1/" "2/"
  const isThread = platform === "x" && outputText.includes("---");
  const threadParts = isThread
    ? outputText.split(/\n*---\n*/).filter((p) => p.trim())
    : null;

  async function handleRegenerate() {
    setIsRegenerating(true);
    try {
      const res = await fetch("/api/generate/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ generationId: id }),
      });

      if (!res.ok) return;

      const data = await res.json();
      onRegenerated?.(id, data.outputText, data.tokensUsed);
    } finally {
      setIsRegenerating(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-md bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-600">
            {config.icon}
          </span>
          <span className="font-body text-sm font-medium text-neutral-800">
            {config.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {showRegenerate && (
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="font-body text-xs px-3 py-1 rounded-md transition-colors duration-200 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRegenerating ? (
                <span className="flex items-center gap-1">
                  <svg
                    className="animate-spin h-3 w-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      opacity="0.25"
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Regenerando...
                </span>
              ) : (
                "Regenerar"
              )}
            </button>
          )}
          <CopyButton text={outputText} />
        </div>
      </div>

      {/* Content */}
      {threadParts ? (
        <div className="space-y-3">
          {threadParts.map((tweet, i) => (
            <div key={i} className="flex gap-3">
              <span className="font-body text-xs font-medium text-primary-500 mt-0.5 shrink-0">
                {i + 1}/{threadParts.length}
              </span>
              <p className="font-body text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">
                {tweet.trim()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-body text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">
          {outputText}
        </p>
      )}

      {/* Footer */}
      <p className="font-body text-xs text-neutral-400 mt-3">
        {tokensUsed} tokens usados
      </p>
    </div>
  );
}
