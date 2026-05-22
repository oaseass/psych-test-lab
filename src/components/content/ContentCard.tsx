import Link from "next/link";
import type { ContentItem } from "@/lib/content/types";

interface ContentCardProps {
  item: ContentItem;
  compact?: boolean;
  showCategory?: boolean;
}

const KIND_LABEL: Record<string, string> = {
  "psych-test": "심리테스트",
  "iq-test": "IQ테스트",
  "eq-test": "EQ테스트",
  "mbti-like": "MBTI형",
  "blood-type": "혈액형",
  "worldcup": "월드컵",
  "balance": "밸런스게임",
  "initial-quiz": "초성퀴즈",
  "nonsense-quiz": "넌센스퀴즈",
  "spot-difference": "틀린그림",
  "memory": "기억력",
  "reaction": "반응속도",
  "observation": "관찰력",
  "poll": "투표",
  "generator": "생성기",
  "together": "같이놀기",
  "lucky-game": "럭키존",
  "experiment": "웹실험",
  "explore": "탐험",
  "story": "스토리",
  "gauge": "측정기",
  "ranking-guess": "순위맞히기",
  "bingo": "빙고",
  "daily": "오늘의",
};

export default function ContentCard({ item, compact = false, showCategory = true }: ContentCardProps) {
  const kindLabel = KIND_LABEL[item.kind] ?? item.kind;

  if (compact) {
    return (
      <Link href={item.route}>
        <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-brand-border hover:border-brand-purple/30 hover:shadow-card-hover transition-all active:scale-[0.99] group">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: item.gradient || "#EDE9FE" }}
          >
            {item.emoji || item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-brand-text text-sm truncate">{item.title}</div>
            <div className="text-xs text-brand-muted truncate mt-0.5">{item.subtitle}</div>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            {item.isHot && <span className="pill-hot">🔥 HOT</span>}
            {item.isNew && !item.isHot && <span className="pill-new">NEW</span>}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={item.route}>
      <div className="card card-hover p-4 flex flex-col gap-3 h-full group">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: item.gradient || "#EDE9FE" }}
          >
            {item.emoji || item.icon}
          </div>
          <div className="flex gap-1 flex-wrap justify-end">
            {item.isHot && <span className="pill-hot">🔥 HOT</span>}
            {item.isNew && !item.isHot && <span className="pill-new">✨ NEW</span>}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-bold text-brand-text text-[15px] leading-snug mb-1">{item.title}</h3>
          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">{item.subtitle}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-brand-border/60">
          <div className="flex items-center gap-1.5">
            {showCategory && (
              <span className="text-[10px] font-semibold text-brand-muted">{kindLabel}</span>
            )}
            <span className="text-[10px] text-brand-muted">· {item.estimatedMinutes}분</span>
          </div>
          <span className="text-[10px] font-bold text-brand-purple group-hover:translate-x-0.5 transition-transform">시작 →</span>
        </div>
      </div>
    </Link>
  );
}
