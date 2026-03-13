import Link from "next/link";
import { PlatformIcon } from "./platform-icon";

const PLATFORM_LABELS: Record<string, string> = {
  x: "X",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  newsletter: "Newsletter",
};

interface GenerationListItemProps {
  batchId: string;
  inputText: string;
  inputUrl: string | null;
  platforms: string[] | string;
  createdAt: string;
}

function parsePlatforms(platforms: string[] | string): string[] {
  if (Array.isArray(platforms)) return platforms;
  if (typeof platforms === "string") {
    // Postgres array_agg can return "{x,linkedin}" format
    const cleaned = platforms.replace(/^\{|\}$/g, "");
    return cleaned.split(",").filter(Boolean);
  }
  return [];
}

export function GenerationListItem({
  batchId,
  inputText,
  inputUrl,
  platforms: rawPlatforms,
  createdAt,
}: GenerationListItemProps) {
  const platforms = parsePlatforms(rawPlatforms);
  const truncated =
    inputText.length > 100 ? inputText.slice(0, 100) + "..." : inputText;

  const formattedDate = new Date(createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link
      href={`/generate/${batchId}`}
      className="block bg-white rounded-xl border border-neutral-200 shadow-sm p-4 hover:border-primary-300 hover:shadow transition-all group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2.5">
          {/* Conteúdo original */}
          <div>
            <span className="font-body text-[11px] font-medium text-neutral-400 uppercase tracking-wide">
              Conteúdo original
            </span>
            <p className="font-body text-sm text-neutral-800 leading-relaxed mt-0.5 truncate">
              {truncated}
            </p>
            {inputUrl && (
              <p className="font-body text-xs text-neutral-400 mt-0.5 truncate">
                {inputUrl}
              </p>
            )}
          </div>

          {/* Plataformas criadas */}
          <div>
            <span className="font-body text-[11px] font-medium text-neutral-400 uppercase tracking-wide">
              Plataformas criadas
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              {platforms.map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-600 rounded-md px-2 py-0.5 text-xs font-body"
                >
                  <PlatformIcon platform={platform} className="w-3 h-3" />
                  {platform !== "x" && (PLATFORM_LABELS[platform] ?? platform)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between self-stretch shrink-0">
          <svg
            className="w-4 h-4 text-neutral-300 group-hover:text-primary-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
          <span className="font-body text-xs text-neutral-400">
            {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  );
}
