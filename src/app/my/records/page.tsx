"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/user/authService";
import { getMyBestRecords } from "@/lib/ranking/rankingService";
import type { RankingEntry } from "@/lib/ranking/types";

type Records = ReturnType<typeof getMyBestRecords>;

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}초`;
}

function RecordCard({
  icon,
  title,
  entry,
  valueLabel,
}: {
  icon: string;
  title: string;
  entry?: RankingEntry;
  valueLabel?: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-base font-bold text-gray-800">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      {entry ? (
        <div className="flex items-end justify-between mt-1">
          <div>
            <div className="text-2xl font-extrabold text-violet-600">
              {entry.displayValue}
            </div>
            {entry.subValue && (
              <div className="text-xs text-gray-400 mt-0.5">{entry.subValue}</div>
            )}
            {valueLabel && (
              <div className="text-xs text-gray-400 mt-0.5">{valueLabel}</div>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-gray-500">
              {entry.rankIcon} {entry.rankName}
            </div>
            <div className="text-xs text-gray-400">
              전체 #{entry.rank}위
            </div>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-400 mt-1">아직 기록이 없어요</div>
      )}
    </div>
  );
}

export default function MyRecordsPage() {
  const [records, setRecords] = useState<Records | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== "member") {
      setIsGuest(true);
      return;
    }
    setUserId(user.id);
    setRecords(getMyBestRecords(user.id));
  }, []);

  if (isGuest) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow p-8 max-w-sm w-full text-center flex flex-col gap-4">
          <div className="text-4xl">🔒</div>
          <h2 className="text-xl font-extrabold text-gray-800">로그인이 필요해요</h2>
          <p className="text-sm text-gray-500">
            회원가입하면 기록을 랭킹에 남길 수 있어요.<br />
            가입하면 500P 받고 이등병부터 시작합니다.
          </p>
          <Link
            href="/auth/signup"
            className="bg-violet-600 text-white font-bold py-3 px-6 rounded-full hover:bg-violet-700 transition"
          >
            회원가입하기
          </Link>
          <Link href="/my" className="text-sm text-gray-400 hover:text-gray-600">
            ← 마이페이지로
          </Link>
        </div>
      </main>
    );
  }

  if (!records) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">불러오는 중...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 pt-10 pb-6">
        <Link href="/my" className="text-white/70 text-sm hover:text-white block mb-3">
          ← 마이페이지
        </Link>
        <h1 className="text-2xl font-extrabold">내 게임 기록</h1>
        <p className="text-white/70 text-sm mt-1">전체 랭킹에서의 내 위치를 확인해요</p>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-6 flex flex-col gap-4">
        {/* 게임 기록 섹션 */}
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">게임 기록</div>

        <RecordCard icon="⚡" title="반응속도 최고기록" entry={records.reaction} valueLabel="낮을수록 좋아요" />
        <RecordCard icon="📝" title="초성퀴즈 최고점수" entry={records.initialQuiz} />
        <RecordCard icon="🧠" title="기억력 최고레벨" entry={records.memory} />
        <RecordCard icon="🔍" title="틀린그림찾기 최고기록" entry={records.spotDifference} valueLabel="낮을수록 좋아요" />
        <RecordCard icon="🏆" title="월드컵 우승기록" entry={records.worldcup} />

        {/* 포인트 기록 섹션 */}
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1 mt-2">포인트 활동</div>

        <RecordCard icon="🎰" title="럭키존 포인트" entry={records.luckyPoints} />
        <RecordCard icon="🔥" title="럭키존 연승" entry={records.luckyStreak} />
        <RecordCard icon="🎮" title="같이놀기 방장기록" entry={records.togetherHost} />

        {/* 전체 리더보드 링크 */}
        <Link
          href="/leaderboard"
          className="mt-2 flex items-center justify-center gap-2 bg-white border border-violet-200 text-violet-600 font-bold py-4 rounded-2xl hover:bg-violet-50 transition shadow-sm"
        >
          🏅 전체 리더보드 보기
        </Link>
      </div>
    </main>
  );
}
