"use client";

/**
 * BenchmarkRankCard
 * 재사용 가능한 벤치마크 비교 결과 카드.
 * 현재: 반응속도 / 추후: 기억력, 타자속도, 퀴즈 등에도 재사용 가능.
 */

export type ComparisonItem = {
  label: string;        // e.g. "Human Benchmark 중앙값 (273ms)보다"
  delta: number;        // 양수 = 더 느림/낮음, 음수 = 더 빠름/높음
  unit: string;
  lowerIsBetter?: boolean; // true면 delta 음수가 좋은 것
};

export type TierRow = {
  tier: string;
  range: string;
  label: string;
  color: string;
  bgColor: string;
  isCurrentTier: boolean;
};

type Props = {
  value: number;
  unit: string;
  tier: string;
  tierColor: string;
  tierBgColor: string;
  label: string;
  score: number;
  scoreLabel: string;
  roastLine: string;
  comparisons: ComparisonItem[];
  tierTable: TierRow[];
  caution: string[];
  shareText: string;
};

function DeltaChip({ item }: { item: ComparisonItem }) {
  const lowerIsBetter = item.lowerIsBetter !== false;
  const isBetter = lowerIsBetter ? item.delta < 0 : item.delta > 0;
  const sign = item.delta > 0 ? "+" : "";
  const color = item.delta === 0
    ? "text-gray-500 bg-gray-100"
    : isBetter
    ? "text-green-700 bg-green-100"
    : "text-red-700 bg-red-100";

  return (
    <div className="flex items-center justify-between gap-2 py-2 px-1 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-600 leading-tight">{item.label}</span>
      <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${color}`}>
        {sign}{item.delta}{item.unit}
      </span>
    </div>
  );
}

export default function BenchmarkRankCard({
  value,
  unit,
  tier,
  tierColor,
  tierBgColor,
  label,
  score,
  scoreLabel,
  roastLine,
  comparisons,
  tierTable,
  caution,
  shareText,
}: Props) {
  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({ text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert("클립보드에 복사됐어요!");
      }
    } catch {
      // user cancelled
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* ── 결과 헤더 ── */}
      <div
        className="rounded-2xl p-5 text-center"
        style={{ background: tierBgColor }}
      >
        {/* 티어 배지 */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-black mb-3"
          style={{ background: tierColor, color: "#fff" }}
        >
          <span className="text-lg leading-none">{tier}</span>
          <span>{label}</span>
        </div>

        {/* 반응속도 수치 */}
        <div
          className="text-5xl font-black tabular-nums mb-1"
          style={{ color: tierColor }}
        >
          {value}
          <span className="text-xl font-bold ml-1 opacity-80">{unit}</span>
        </div>

        {/* 점수 */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="text-2xl font-black text-gray-800">
            {score}
            <span className="text-sm font-normal text-gray-400"> / 100점</span>
          </div>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: tierColor, color: "#fff" }}
          >
            {scoreLabel}
          </span>
        </div>

        {/* 로스트 문구 */}
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">{roastLine}</p>
      </div>

      {/* ── 비교 수치 ── */}
      <div className="bg-white rounded-2xl border border-gray-100 px-4 py-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">비교</p>
        {comparisons.map((item, i) => (
          <DeltaChip key={i} item={item} />
        ))}
      </div>

      {/* ── SSS~F 티어표 ── */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide px-4 pt-3 pb-2">
          전체 티어표
        </p>
        {tierTable.map((row) => (
          <div
            key={row.tier}
            className={`flex items-center gap-3 px-4 py-2 text-sm border-t border-gray-50 transition-all ${
              row.isCurrentTier ? "ring-2 ring-inset" : ""
            }`}
            style={
              row.isCurrentTier
                ? { background: row.bgColor, outline: `2px solid ${row.color}`, outlineOffset: "-2px" }
                : undefined
            }
          >
            <span
              className="w-8 text-center font-black text-xs rounded-full py-0.5"
              style={{ background: row.color, color: "#fff" }}
            >
              {row.tier}
            </span>
            <span className="w-24 text-xs text-gray-400 tabular-nums">{row.range}</span>
            <span className={`font-semibold flex-1 ${row.isCurrentTier ? "text-gray-900" : "text-gray-600"}`}>
              {row.label}
            </span>
            {row.isCurrentTier && (
              <span className="text-xs font-bold" style={{ color: row.color }}>
                ← 나
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ── 공유 버튼 ── */}
      <button
        onClick={handleShare}
        className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.98]"
        style={{ background: tierColor }}
      >
        📤 결과 공유하기
      </button>

      {/* ── 주의사항 ── */}
      {caution.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <p className="text-xs font-bold text-amber-700 mb-1">참고 사항</p>
          {caution.map((c, i) => (
            <p key={i} className="text-xs text-amber-600 leading-relaxed mt-0.5">
              · {c}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
