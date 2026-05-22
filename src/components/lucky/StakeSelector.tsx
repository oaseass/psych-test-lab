"use client";

// ─────────────────────────────────────────────
// StakeSelector — 도전 포인트 선택
// ─────────────────────────────────────────────

const PRESETS = [10, 50, 100, 300, 500];

type Props = {
  value: number;
  onChange: (v: number) => void;
  max?: number;
  disabled?: boolean;
};

export default function StakeSelector({ value, onChange, max = 500, disabled = false }: Props) {
  const available = PRESETS.filter((p) => p <= max);
  return (
    <div>
      <p className="text-xs font-bold text-gray-500 mb-2">도전 포인트 선택</p>
      <div className="flex gap-2 flex-wrap">
        {available.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            disabled={disabled}
            className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all ${
              value === p
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white text-gray-700 border-gray-200 hover:border-violet-300"
            } disabled:opacity-40`}
          >
            {p}P
          </button>
        ))}
      </div>
    </div>
  );
}
