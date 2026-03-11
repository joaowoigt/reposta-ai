"use client";

import { PlatformIcon } from "./platform-icon";

interface PlatformSelectorProps {
  selected: string[];
  onChange: (platforms: string[]) => void;
}

const PLATFORMS = [
  { id: "x", label: "X (Twitter)", color: "bg-neutral-900" },
  { id: "linkedin", label: "LinkedIn", color: "bg-[#0A66C2]" },
  { id: "instagram", label: "Instagram", color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]" },
  { id: "newsletter", label: "Newsletter", color: "bg-neutral-700" },
];

export function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((p) => p !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {PLATFORMS.map((platform) => {
        const isSelected = selected.includes(platform.id);
        return (
          <button
            key={platform.id}
            type="button"
            onClick={() => toggle(platform.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
              isSelected
                ? "border-primary-500 bg-primary-50 shadow-sm"
                : "border-neutral-200 bg-white hover:border-neutral-300"
            }`}
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${platform.color} text-white shrink-0`}>
              <PlatformIcon platform={platform.id} className="w-4 h-4" />
            </div>
            <span className={`font-body text-sm ${isSelected ? "text-primary-700 font-medium" : "text-neutral-600"}`}>
              {platform.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
