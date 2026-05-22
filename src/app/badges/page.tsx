"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { getCurrentUser } from "@/lib/user/authService";
import type { UserProfile } from "@/lib/user/types";

interface Badge {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  condition: string;
}

const BADGES: Badge[] = [
  { id: "first_test", name: "첫 테스트", desc: "심리테스트 첫 완료", emoji: "🎯", rarity: "common", condition: "first_test" },
  { id: "test_10", name: "테스트 마니아", desc: "심리테스트 10회 완료", emoji: "🧠", rarity: "rare", condition: "test_10" },
  { id: "test_50", name: "테스트 중독자", desc: "심리테스트 50회 완료", emoji: "🌀", rarity: "epic", condition: "test_50" },
  { id: "lucky_1", name: "행운의 시작", desc: "럭키존 첫 도전", emoji: "🍀", rarity: "common", condition: "lucky_1" },
  { id: "lucky_winner", name: "럭키스타", desc: "럭키존에서 1000P 이상 획득", emoji: "⭐", rarity: "rare", condition: "lucky_winner" },
  { id: "worldcup_1", name: "월드컵 참가자", desc: "이상형 월드컵 첫 완주", emoji: "🏆", rarity: "common", condition: "worldcup_1" },
  { id: "worldcup_10", name: "월드컵 마스터", desc: "이상형 월드컵 10회 완주", emoji: "👑", rarity: "epic", condition: "worldcup_10" },
  { id: "checkin_7", name: "주간 체크인", desc: "7일 연속 체크인", emoji: "📅", rarity: "rare", condition: "checkin_7" },
  { id: "checkin_30", name: "한달 개근", desc: "30일 연속 체크인", emoji: "🔥", rarity: "epic", condition: "checkin_30" },
  { id: "rich", name: "포인트 부자", desc: "누적 포인트 10,000P 달성", emoji: "💰", rarity: "legendary", condition: "rich" },
  { id: "inviter", name: "소셜 커넥터", desc: "친구 3명 초대 성공", emoji: "🤝", rarity: "rare", condition: "inviter" },
  { id: "mission_10", name: "미션 전문가", desc: "미션 누적 10개 완료", emoji: "📋", rarity: "rare", condition: "mission_10" },
];

const RARITY_COLORS: Record<string, string> = {
  common: "bg-gray-50 border-gray-200 text-gray-600",
  rare: "bg-blue-50 border-blue-200 text-blue-700",
  epic: "bg-violet-50 border-violet-200 text-violet-700",
  legendary: "bg-amber-50 border-amber-300 text-amber-700",
};

const RARITY_LABEL: Record<string, string> = {
  common: "일반",
  rare: "레어",
  epic: "에픽",
  legendary: "전설",
};

export default function BadgesPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      const saved = JSON.parse(localStorage.getItem(`badges_${user.id}`) ?? "[]");
      setUnlocked(new Set(saved));
    }
  }, []);

  const unlockedCount = unlocked.size;

  return (
    <LayoutContainer>
      <div className="pt-4 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-brand-text">🏅 뱃지 컬렉션</h1>
          <p className="text-sm text-brand-muted mt-1">활동하면서 뱃지를 모아보세요</p>
        </div>

        {/* 달성 현황 */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-brand-muted mb-0.5">달성한 뱃지</div>
            <div className="text-2xl font-black text-amber-700">{unlockedCount} / {BADGES.length}</div>
          </div>
          <div className="text-3xl">🏆</div>
        </div>

        {/* 희귀도별 그룹 */}
        {(["legendary", "epic", "rare", "common"] as const).map((rarity) => {
          const items = BADGES.filter((b) => b.rarity === rarity);
          return (
            <div key={rarity} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-extrabold text-brand-text">{RARITY_LABEL[rarity]}</h2>
                <span className="text-xs text-brand-muted">({items.filter((b) => unlocked.has(b.id)).length}/{items.length})</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {items.map((badge) => {
                  const isUnlocked = unlocked.has(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`flex flex-col items-center p-3 rounded-2xl border text-center transition-all ${
                        isUnlocked ? RARITY_COLORS[rarity] : "bg-gray-50 border-gray-200 opacity-50 grayscale"
                      }`}
                    >
                      <span className="text-3xl mb-1">{badge.emoji}</span>
                      <span className="font-bold text-[11px] leading-tight">{badge.name}</span>
                      <span className={`text-[9px] mt-0.5 ${isUnlocked ? "" : "text-gray-400"}`}>{badge.desc}</span>
                      {!isUnlocked && <span className="text-[10px] text-gray-400 mt-1">🔒 잠금</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {!currentUser && (
          <div className="mt-4 p-4 bg-violet-50 border border-violet-100 rounded-2xl text-center">
            <p className="text-sm text-violet-700 font-bold mb-2">로그인하면 뱃지 달성 현황이 저장돼요</p>
            <Link href="/login" className="inline-block btn-primary px-6 py-2 text-sm">로그인하기</Link>
          </div>
        )}
      </div>
    </LayoutContainer>
  );
}
