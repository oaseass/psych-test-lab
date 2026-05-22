"use client";
import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

type RankingItem = {
  id: string;
  category: string;
  question: string;
  items: { name: string; rank: number; emoji: string; detail: string }[];
};

const RANKINGS: RankingItem[] = [
  {
    id: "r1",
    category: "음식",
    question: "한국인이 가장 많이 먹는 배달음식 순위는?",
    items: [
      { name: "치킨", rank: 1, emoji: "🍗", detail: "부동의 1위. 치맥의 나라" },
      { name: "피자", rank: 2, emoji: "🍕", detail: "2위도 여전히 굳건" },
      { name: "족발/보쌈", rank: 3, emoji: "🐷", detail: "야식의 정석" },
      { name: "짜장면/중식", rank: 4, emoji: "🍜", detail: "배달의 원조" },
    ],
  },
  {
    id: "r2",
    category: "앱",
    question: "한국인이 가장 오래 사용하는 앱 TOP4는?",
    items: [
      { name: "유튜브", rank: 1, emoji: "▶️", detail: "하루 평균 40분 이상" },
      { name: "카카오톡", rank: 2, emoji: "💬", detail: "국민 메신저" },
      { name: "네이버", rank: 3, emoji: "🔍", detail: "검색은 네이버" },
      { name: "인스타그램", rank: 4, emoji: "📸", detail: "MZ세대 필수앱" },
    ],
  },
  {
    id: "r3",
    category: "여가",
    question: "직장인이 퇴근 후 가장 많이 하는 활동은?",
    items: [
      { name: "유튜브/OTT 시청", rank: 1, emoji: "📺", detail: "퇴근 후 드러누워 영상 시청" },
      { name: "SNS/인터넷 서핑", rank: 2, emoji: "📱", detail: "습관적인 스크롤" },
      { name: "운동/산책", rank: 3, emoji: "🏃", detail: "건강 챙기기" },
      { name: "음식/술 약속", rank: 4, emoji: "🍺", detail: "퇴근 후 한잔" },
    ],
  },
  {
    id: "r4",
    category: "취미",
    question: "MZ세대가 가장 많이 하는 취미는?",
    items: [
      { name: "독서/책읽기", rank: 1, emoji: "📚", detail: "독서 모임이 유행" },
      { name: "헬스/운동", rank: 2, emoji: "💪", detail: "오운완 문화" },
      { name: "카페 방문", rank: 3, emoji: "☕", detail: "카페 탐방은 필수" },
      { name: "여행/나들이", rank: 4, emoji: "✈️", detail: "국내외 여행 증가" },
    ],
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function RankingGuessPage() {
  const [questions] = useState(() => RANKINGS.map((r) => ({ ...r, shuffled: shuffle(r.items) })));
  const [idx, setIdx] = useState(0);
  const [order, setOrder] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[idx];

  function initQuestion() {
    setOrder(current.shuffled.map((i) => i.name));
    setSubmitted(false);
  }

  // 현재 문제가 초기화되지 않은 경우
  if (order.length === 0 && !submitted) {
    initQuestion();
    return null;
  }

  function moveUp(i: number) {
    if (i <= 0) return;
    const next = [...order];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setOrder(next);
  }

  function moveDown(i: number) {
    if (i >= order.length - 1) return;
    const next = [...order];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setOrder(next);
  }

  function submit() {
    // 점수 계산: 정확히 맞춘 위치 개수
    let pts = 0;
    order.forEach((name, i) => {
      const item = current.items.find((it) => it.name === name);
      if (item && item.rank === i + 1) pts++;
    });
    setScore((s) => s + pts);
    setSubmitted(true);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setOrder([]);
      setSubmitted(false);
    }
  }

  if (done) {
    const maxScore = questions.length * 4;
    return (
      <LayoutContainer>
        <div className="py-12 max-w-sm mx-auto text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">랭킹 감각 테스트!</h2>
          <div className="text-6xl font-black text-purple-600 my-6">{score}점</div>
          <p className="text-gray-500 text-sm mb-2">최고 {maxScore}점 중</p>
          <p className="text-gray-500 text-sm mb-8">
            {score >= maxScore * 0.8 ? "트렌드 마스터! 모든 걸 꿰뚫고 있어요 🏆" :
             score >= maxScore * 0.6 ? "꽤 감각이 있네요! 세상 돌아가는 거 잘 알아요 👏" :
             "아직 성장 중이에요. 트렌드 공부 시작! 📚"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
          >
            다시 하기
          </button>
        </div>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      <div className="py-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="font-black text-gray-900">📊 랭킹 맞히기</div>
          <div className="text-sm text-gray-500">{idx + 1}/{questions.length} · {score}점</div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all"
            style={{ width: `${(idx / questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-purple-50 rounded-2xl p-4 mb-5">
          <div className="text-xs text-purple-600 font-bold mb-1">{current.category}</div>
          <h3 className="font-black text-gray-900 text-sm">{current.question}</h3>
        </div>

        <p className="text-xs text-gray-400 mb-3">순위에 맞게 드래그하거나 버튼으로 순서를 맞춰보세요</p>

        <div className="space-y-2 mb-5">
          {order.map((name, i) => {
            const item = current.items.find((it) => it.name === name)!;
            const isCorrect = submitted && item.rank === i + 1;
            const isWrong = submitted && item.rank !== i + 1;
            return (
              <div
                key={name}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  submitted
                    ? isCorrect
                      ? "border-green-400 bg-green-50"
                      : "border-red-300 bg-red-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black ${
                  submitted
                    ? isCorrect ? "bg-green-500 text-white" : "bg-red-400 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {i + 1}
                </div>
                <span className="text-xl">{item.emoji}</span>
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-900">{item.name}</div>
                  {submitted && (
                    <div className={`text-xs ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                      {isCorrect ? "✅ 정답!" : `❌ 실제 ${item.rank}위`} · {item.detail}
                    </div>
                  )}
                </div>
                {!submitted && (
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveUp(i)} disabled={i === 0} className="text-gray-400 disabled:opacity-20 hover:text-gray-700 text-sm leading-none">▲</button>
                    <button onClick={() => moveDown(i)} disabled={i === order.length - 1} className="text-gray-400 disabled:opacity-20 hover:text-gray-700 text-sm leading-none">▼</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted ? (
          <button
            onClick={submit}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold"
          >
            제출하기
          </button>
        ) : (
          <button
            onClick={next}
            className="w-full py-3 rounded-2xl bg-gray-800 text-white font-bold"
          >
            {idx + 1 < questions.length ? "다음 문제 →" : "결과 보기"}
          </button>
        )}
      </div>
    </LayoutContainer>
  );
}
