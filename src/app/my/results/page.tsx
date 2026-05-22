"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { getCurrentUser } from "@/lib/user/authService";
import type { UserProfile } from "@/lib/user/types";

interface Result {
  type: string;
  title: string;
  result: string;
  date: string;
  href?: string;
}

const TYPE_LABEL: Record<string, string> = {
  test: "심리테스트",
  worldcup: "이상형 월드컵",
  lucky: "럭키존",
  quiz: "퀴즈",
  balance: "밸런스게임",
};

const TYPE_EMOJI: Record<string, string> = {
  test: "🧠",
  worldcup: "🏆",
  lucky: "🍀",
  quiz: "❓",
  balance: "⚖️",
};

const TYPE_TABS = ["전체", "심리테스트", "이상형 월드컵", "럭키존", "퀴즈", "밸런스게임"];

export default function MyResultsPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [selectedType, setSelectedType] = useState("전체");

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      const saved = JSON.parse(localStorage.getItem(`my_results_${user.id}`) ?? "[]");
      setResults(saved);
    }
  }, []);

  const filtered = selectedType === "전체"
    ? results
    : results.filter((r) => (TYPE_LABEL[r.type] ?? r.type) === selectedType);

  return (
    <LayoutContainer>
      <div className="pt-4 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-brand-text">📚 내 결과 모아보기</h1>
          <p className="text-sm text-brand-muted mt-1">완료한 테스트와 게임 결과</p>
        </div>

        {!currentUser ? (
          <div className="pt-16 text-center">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-brand-muted text-sm mb-4">로그인 후 결과가 저장돼요</p>
            <a href="/login" className="btn-primary px-6 py-2.5 text-sm">로그인하기</a>
          </div>
        ) : (
          <>
            {/* 타입 탭 */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
              {TYPE_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedType(tab)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedType === tab ? "bg-brand-purple text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 통계 */}
            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-5 flex items-center justify-between">
              <span className="text-sm text-brand-muted font-semibold">총 기록</span>
              <span className="font-black text-violet-700">{results.length}개</span>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🤷</div>
                <p className="text-brand-muted text-sm">아직 이 카테고리 결과가 없어요</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((result, i) => (
                  <div key={i} className="bg-white border border-brand-border rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                          {TYPE_EMOJI[result.type] ?? "🎮"}
                        </div>
                        <div>
                          <div className="text-[10px] text-brand-purple font-bold mb-0.5">{TYPE_LABEL[result.type] ?? result.type}</div>
                          <div className="font-bold text-brand-text text-sm">{result.title}</div>
                          <div className="text-xs text-brand-muted mt-0.5 leading-snug">{result.result}</div>
                        </div>
                      </div>
                      {result.href && (
                        <Link href={result.href} className="flex-shrink-0 text-[10px] text-brand-purple font-bold hover:underline whitespace-nowrap">
                          다시하기
                        </Link>
                      )}
                    </div>
                    <div className="text-[10px] text-brand-muted mt-2 text-right">
                      {new Date(result.date).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </LayoutContainer>
  );
}
