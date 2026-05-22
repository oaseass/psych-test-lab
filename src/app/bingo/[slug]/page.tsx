"use client";
import { use, useState, useMemo } from "react";
import { notFound } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { bingoList } from "@/data/bingoData";

type Props = { params: Promise<{ slug: string }> };

const SIZE = 5;

// 빙고 라인 체크 (가로5, 세로5, 대각선2 = 12라인)
function checkBingo(checked: boolean[]): number {
  let bingo = 0;
  // 가로
  for (let r = 0; r < SIZE; r++) {
    if ([0,1,2,3,4].every((c) => checked[r * SIZE + c])) bingo++;
  }
  // 세로
  for (let c = 0; c < SIZE; c++) {
    if ([0,1,2,3,4].every((r) => checked[r * SIZE + c])) bingo++;
  }
  // 대각선
  if ([0,6,12,18,24].every((i) => checked[i])) bingo++;
  if ([4,8,12,16,20].every((i) => checked[i])) bingo++;
  return bingo;
}

export default function BingoDetailPage({ params }: Props) {
  const { slug } = use(params);
  const bingo = bingoList.find((b) => b.slug === slug);
  if (!bingo) notFound();

  const [checked, setChecked] = useState<boolean[]>(Array(25).fill(false));

  function toggle(i: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  const bingoCount = checkBingo(checked);
  const checkedCount = checked.filter(Boolean).length;

  function reset() {
    setChecked(Array(25).fill(false));
  }

  const resultMessage = useMemo(() => {
    if (bingoCount >= 5) return { msg: "🏆 빙고 마스터! 진짜로요?", color: "#7C3AED" };
    if (bingoCount >= 3) return { msg: "😱 공감 폭발! 많이 해당되셨군요", color: "#DC2626" };
    if (bingoCount >= 1) return { msg: "😄 빙고! 꽤 해당되네요", color: "#059669" };
    return { msg: "😇 청렴한 분이네요...", color: "#6B7280" };
  }, [bingoCount]);

  return (
    <LayoutContainer>
      <div className="py-4 max-w-md mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">{bingo.emoji}</div>
          <h1 className="text-xl font-black text-gray-900">{bingo.title}</h1>
          <p className="text-sm text-gray-400 mt-1">{bingo.subtitle}</p>
        </div>

        {/* 빙고 카운트 */}
        <div className="flex items-center justify-center gap-6 mb-4 bg-gray-50 rounded-2xl py-3">
          <div className="text-center">
            <div className="text-2xl font-black" style={{ color: bingo.color }}>{bingoCount}</div>
            <div className="text-xs text-gray-400">빙고</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-gray-700">{checkedCount}</div>
            <div className="text-xs text-gray-400">체크</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-gray-700 max-w-[100px]" style={{ color: resultMessage.color }}>
              {bingoCount >= 1 ? resultMessage.msg : "항목을 체크해봐요!"}
            </div>
          </div>
        </div>

        {/* 빙고판 */}
        <div className="grid grid-cols-5 gap-1.5 mb-5">
          {bingo.items.map((item, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`aspect-square rounded-xl text-[10px] font-semibold leading-tight p-1 flex items-center justify-center text-center transition-all ${
                checked[i]
                  ? "text-white shadow-sm scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={checked[i] ? { background: bingo.color } : undefined}
            >
              {item}
            </button>
          ))}
        </div>

        {/* 결과 */}
        {bingoCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center mb-4">
            <div className="text-2xl mb-1">🎊</div>
            <div className="font-black text-gray-900">{bingoCount}빙고 달성!</div>
            <div className="text-sm text-gray-500 mt-1">{resultMessage.msg}</div>
          </div>
        )}

        <button
          onClick={reset}
          className="w-full py-3 rounded-2xl border-2 border-gray-200 text-gray-500 text-sm font-bold hover:border-gray-300 transition-colors"
        >
          초기화
        </button>
      </div>
    </LayoutContainer>
  );
}
