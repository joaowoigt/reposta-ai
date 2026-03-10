"use client";

interface ToneSelectorProps {
  value: string;
  onChange: (tone: string) => void;
}

const TONES = [
  { id: "", label: "Padrão" },
  { id: "casual", label: "Casual" },
  { id: "profissional", label: "Profissional" },
  { id: "educacional", label: "Educacional" },
  { id: "inspiracional", label: "Inspiracional" },
];

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TONES.map((tone) => {
        const isSelected = value === tone.id;
        return (
          <button
            key={tone.id}
            type="button"
            onClick={() => onChange(tone.id)}
            className={`px-3 py-1.5 rounded-lg font-body text-sm transition-colors duration-200 ${
              isSelected
                ? "bg-primary-500 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {tone.label}
          </button>
        );
      })}
    </div>
  );
}
