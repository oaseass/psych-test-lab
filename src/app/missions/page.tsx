"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { getCurrentUser, saveCurrentUser } from "@/lib/user/authService";
import type { UserProfile } from "@/lib/user/types";

interface Mission {
  id: string;
  label: string;
  desc: string;
  points: number;
  emoji: string;
  href?: string;
}

const MISSIONS: Mission[] = [
  { id: "daily_test", label: "테스트 1개 완료", desc: "아무 심리테스트나 완료하기", points: 50, emoji: "🧠", href: "/tests" },
  { id: "daily_worldcup", label: "월드컵 참여", desc: "이상형 월드컵 1판 완주", points: 50, emoji: "🏆", href: "/games/worldcup" },
  { id: "daily_poll", label: "투표 1회 참여", desc: "HOT 투표에 한 번 답하기", points: 30, emoji: "🗳️", href: "/polls" },
  { id: "daily_balance", label: "밸런스게임 참여", desc: "밸런스게임 1판 완료", points: 30, emoji: "⚖️", href: "/games/balance" },
  { id: "daily_login", label: "오늘 로그인", desc: "오늘 사이트에 접속하기", points: 20, emoji: "🔓" },
];

const MILESTONES = [
  { count: 1, reward: 30, label: "첫 번째 미션 완료!" },
  { count: 3, reward: 200, label: "3개 완료 보너스" },
  { count: 5, reward: 500, label: "전체 미션 완료!" },
];

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function MissionsPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [claimed, setClaimed] = useState<Set<number>>(new Set());

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    const today = getTodayKey();
    const saved: string[] = JSON.parse(localStorage.getItem(`missions_${today}`) ?? "[]");
    const claimedSaved: number[] = JSON.parse(localStorage.getItem(`missions_claimed_${today}`) ?? "[]");
    const completedSet = new Set(saved);

    if (user) {
      completedSet.add("daily_login");
      localStorage.setItem(`missions_${today}`, JSON.stringify([...completedSet]));
    }
    setCompleted(completedSet);
    setClaimed(new Set(claimedSaved));
  }, []);

  function markComplete(missionId: string) {
    if (!currentUser) return;
    const today = getTodayKey();
    const updated = new Set(completed);
    updated.add(missionId);
    setCompleted(updated);
    localStorage.setItem(`missions_${today}`, JSON.stringify([...updated]));
  }

  function claimMilestone(count: number, reward: number) {
    if (!currentUser || claimed.has(count)) return;
    const today = getTodayKey();
    const updated = new Set(claimed);
    updated.add(count);
    setClaimed(updated);
    localStorage.setItem(`missions_claimed_${today}`, JSON.stringify([...updated]));
    const userJson = localStorage.getItem("sslab_current_user");
    if (userJson) {
      const u = JSON.parse(userJson);
      u.points = (u.points ?? 0) + reward;
      localStorage.setItem("sslab_current_user", JSON.stringify(u));
    }
  }

  const completedCount = completed.size;
  const totalPoints = MISSIONS.filter((m) => completed.has(m.id)).reduce((s, m) => s + m.points, 0);

  return (
    <LayoutContainer>
      <div className="pt-4 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-brand-text">📋 오늘의 미션</h1>
          <p className="text-sm text-brand-muted mt-1">매일 자정에 초기화 · 최대 500P</p>
        </div>

        {/* 진행도 */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-amber-900 text-sm">{completedCount} / {MISSIONS.length} 완료</span>
            <span className="font-black text-amber-700">+{totalPoints}P</span>
          </div>
          <div className="w-full bg-amber-100 rounded-full h-2.5">
            <div
              className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / MISSIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 마일스톤 보상 */}
        <div className="mb-6">
          <h2 className="text-sm font-extrabold text-brand-text mb-3">🎁 마일스톤 보상</h2>
          <div className="flex gap-2">
            {MILESTONES.map((m) => {
              const reached = completedCount >= m.count;
              const alreadyClaimed = claimed.has(m.count);
              return (
                <button
                  key={m.count}
                  onClick={() => reached && !alreadyClaimed && claimMilestone(m.count, m.reward)}
                  className={`flex-1 flex flex-col items-center p-3 rounded-2xl border text-center transition-all ${
                    alreadyClaimed
                      ? "bg-gray-100 border-gray-200 opacity-60"
                      : reached
                      ? "bg-amber-400 border-amber-500 text-white hover:bg-amber-500 active:scale-95"
                      : "bg-white border-brand-border opacity-50"
                  }`}
                >
                  <span className="text-lg mb-1">{alreadyClaimed ? "✅" : reached ? "🎁" : "🔒"}</span>
                  <span className="text-xs font-bold">{m.count}개</span>
                  <span className={`text-[11px] font-black mt-0.5 ${reached && !alreadyClaimed ? "text-white" : "text-brand-text"}`}>+{m.reward}P</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 미션 목록 */}
        <div className="flex flex-col gap-2">
          {MISSIONS.map((m) => {
            const done = completed.has(m.id);
            return (
              <div
                key={m.id}
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                  done ? "bg-emerald-50 border-emerald-200" : "bg-white border-brand-border"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${done ? "bg-emerald-100" : "bg-gray-50"}`}>
                  {done ? "✅" : m.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-sm ${done ? "text-emerald-700 line-through opacity-70" : "text-brand-text"}`}>{m.label}</div>
                  <div className="text-xs text-brand-muted">{m.desc}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-black text-amber-600">+{m.points}P</span>
                  {!done && m.href && (
                    <Link href={m.href} onClick={() => markComplete(m.id)}>
                      <span className="text-[10px] bg-brand-purple text-white px-2 py-0.5 rounded-full font-bold">시작 →</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!currentUser && (
          <div className="mt-6 p-4 bg-violet-50 border border-violet-100 rounded-2xl text-center">
            <p className="text-sm text-violet-700 font-bold mb-2">포인트 지급은 로그인 후 가능해요</p>
            <Link href="/login" className="inline-block btn-primary px-6 py-2 text-sm">로그인하기</Link>
          </div>
        )}
      </div>
    </LayoutContainer>
  );
}
