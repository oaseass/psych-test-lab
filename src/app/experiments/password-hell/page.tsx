"use client";
import { useState, useEffect } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

type Condition = {
  id: string;
  text: string;
  check: (password: string) => boolean;
};

function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
}

function getCurrentMinute(): number {
  return new Date().getMinutes();
}

const ALL_CONDITIONS: Condition[] = [
  { id: "c01", text: "8자 이상이어야 합니다", check: (p) => p.length >= 8 },
  { id: "c02", text: "숫자가 포함되어야 합니다", check: (p) => /[0-9]/.test(p) },
  { id: "c03", text: "특수문자(!@#$%^&*)가 포함되어야 합니다", check: (p) => /[!@#$%^&*]/.test(p) },
  { id: "c04", text: "한글이 한 글자 이상 포함되어야 합니다", check: (p) => /[가-힣]/.test(p) },
  { id: "c05", text: `오늘 날짜(${getToday()})가 포함되어야 합니다`, check: (p) => p.includes(getToday()) },
  { id: "c06", text: "이모지가 포함되어야 합니다", check: (p) => /\p{Emoji}/u.test(p) },
  { id: "c07", text: "'퇴근'이라는 단어가 포함되어야 합니다", check: (p) => p.includes("퇴근") },
  { id: "c08", text: "3의 배수인 숫자가 포함되어야 합니다 (예: 3, 6, 9, 12...)", check: (p) => /[369]/.test(p) || /12|15|18|21|24|27|30/.test(p) },
  { id: "c09", text: "초성 'ㄱ'과 'ㅅ'이 모두 포함되어야 합니다", check: (p) => p.includes("ㄱ") && p.includes("ㅅ") },
  { id: "c10", text: "같은 글자가 2번 연속 나오면 안 됩니다", check: (p) => !/(.)\1/.test(p) },
  { id: "c11", text: "영문 대문자로 시작해야 합니다", check: (p) => /^[A-Z]/.test(p) },
  { id: "c12", text: "마지막 글자는 느낌표(!)여야 합니다", check: (p) => p.endsWith("!") },
  {
    id: "c13",
    text: `현재 분 단위 숫자(${getCurrentMinute()})가 포함되어야 합니다`,
    check: (p) => p.includes(String(getCurrentMinute())),
  },
  { id: "c14", text: "길이가 20자를 넘으면 안 됩니다", check: (p) => p.length <= 20 },
  { id: "c15", text: "'심심풀이'가 포함되어야 합니다", check: (p) => p.includes("심심풀이") },
];

export default function PasswordHellPage() {
  const [password, setPassword] = useState("");
  const [activeCount, setActiveCount] = useState(1);
  const [failed, setFailed] = useState(false);
  const [cleared, setCleared] = useState(false);

  const activeConditions = ALL_CONDITIONS.slice(0, activeCount);

  const conditionResults = activeConditions.map((c) => ({
    ...c,
    passed: c.check(password),
  }));

  const allPassed = conditionResults.every((c) => c.passed);

  // 이전 단계 조건들이 전부 통과되면 다음 조건 추가
  useEffect(() => {
    if (activeCount < ALL_CONDITIONS.length && allPassed && password.length > 0) {
      const timer = setTimeout(() => {
        setActiveCount((n) => n + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
    if (activeCount >= ALL_CONDITIONS.length && allPassed && password.length > 0) {
      setCleared(true);
    }
  }, [allPassed, password, activeCount]);

  function handleGiveUp() {
    setFailed(true);
  }

  function handleRetry() {
    setPassword("");
    setActiveCount(1);
    setFailed(false);
    setCleared(false);
  }

  if (failed || cleared) {
    return (
      <LayoutContainer>
        <div className="py-12 max-w-sm mx-auto text-center">
          <div className="text-6xl mb-4">{cleared ? "🏆" : "😵"}</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            {cleared ? "비밀번호 지옥 클리어!" : "포기했습니다"}
          </h2>
          <div className="text-5xl font-black my-6" style={{ color: cleared ? "#059669" : "#DC2626" }}>
            {activeCount - (cleared ? 0 : 1)} / {ALL_CONDITIONS.length}
          </div>
          <p className="text-gray-500 text-sm mb-2">
            {cleared ? "대단해요! 모든 조건을 통과했어요!" : `${activeCount - 1}단계까지 버텼어요.`}
          </p>
          <p className="text-gray-400 text-xs mb-6">이 정도면 회원가입 포기합니다 🙏</p>
          <button
            onClick={handleRetry}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold"
          >
            다시 도전하기
          </button>
        </div>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      <div className="py-4 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔐</div>
          <h1 className="text-xl font-black text-gray-900">비밀번호 지옥 챌린지</h1>
          <p className="text-sm text-gray-400 mt-1">
            단계 {activeCount} / {ALL_CONDITIONS.length}
          </p>
        </div>

        {/* 진행 바 */}
        <div className="h-2 rounded-full bg-gray-200 mb-6 overflow-hidden">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-red-500 to-pink-400 transition-all"
            style={{ width: `${(activeCount / ALL_CONDITIONS.length) * 100}%` }}
          />
        </div>

        {/* 입력창 */}
        <div className="mb-4">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요..."
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base font-mono focus:outline-none focus:border-red-400 transition-colors"
            autoComplete="off"
            autoCapitalize="none"
          />
        </div>

        {/* 조건 목록 */}
        <div className="space-y-2 mb-6">
          {conditionResults.map((c) => (
            <div
              key={c.id}
              className={`flex items-start gap-3 p-3 rounded-xl text-sm transition-all ${
                c.passed ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-100"
              }`}
            >
              <span className="text-base flex-shrink-0 mt-0.5">{c.passed ? "✅" : "❌"}</span>
              <span className={c.passed ? "text-green-700 line-through" : "text-red-700"}>{c.text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleGiveUp}
          className="w-full py-3 rounded-2xl border-2 border-gray-200 text-gray-400 text-sm font-semibold hover:border-gray-300 transition-colors"
        >
          😮‍💨 포기합니다
        </button>
      </div>
    </LayoutContainer>
  );
}
