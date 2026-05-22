"use client";
import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

type Station = {
  id: string;
  name: string;
  genre: string;
  emoji: string;
  description: string;
  color: string;
  bgColor: string;
  vibe: string;
  fakeSongs: string[];
};

const STATIONS: Station[] = [
  {
    id: "rain",
    name: "비오는날 FM",
    genre: "인디",
    emoji: "🌧️",
    description: "빗소리와 함께 듣는 감성 인디 음악",
    color: "#1E40AF",
    bgColor: "#EFF6FF",
    vibe: "감성적·차분함·쓸쓸함",
    fakeSongs: ["빗소리 - 위로", "그 날처럼 - 감성보이", "창밖에서 - 소울오디오", "기억할게 - 다온"],
  },
  {
    id: "study",
    name: "공부할게요 FM",
    genre: "Lo-fi",
    emoji: "📚",
    description: "집중력 높여주는 Lo-fi beats",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    vibe: "집중·차분·몰입",
    fakeSongs: ["Study Session #42", "Deep Focus Mix", "Morning Coffee Beats", "Chill Lofi Study"],
  },
  {
    id: "hype",
    name: "신나는 FM",
    genre: "팝/댄스",
    emoji: "🔥",
    description: "기분 업! 신나는 팝과 댄스 뮤직",
    color: "#DC2626",
    bgColor: "#FFF1F2",
    vibe: "신남·에너지·흥",
    fakeSongs: ["Let's Go! - DJ Hype", "Dance All Night", "Energy Boost Mix", "파티타임 - 킹스"],
  },
  {
    id: "retro",
    name: "추억의 라디오",
    genre: "레트로/팝스",
    emoji: "📻",
    description: "2000년대 감성 그 자체",
    color: "#B45309",
    bgColor: "#FFFBEB",
    vibe: "추억·그리움·아날로그",
    fakeSongs: ["그때 그 시절 - 노스탤지아", "학창시절 - 레트로맨", "2003년의 봄 - 팝스타", "첫 MP3 - 올드비"],
  },
  {
    id: "sleep",
    name: "잘자요 FM",
    genre: "앰비언트",
    emoji: "😴",
    description: "스르륵 잠들게 해주는 수면 음악",
    color: "#1E3A5F",
    bgColor: "#EFF6FF",
    vibe: "졸림·편안·수면",
    fakeSongs: ["자장가 ver.2", "星空 Starfield Ambient", "빗소리 ASMR 30min", "Deep Sleep Mix #7"],
  },
  {
    id: "nature",
    name: "자연소리 FM",
    genre: "ASMR/자연",
    emoji: "🌿",
    description: "숲, 바다, 비소리로 힐링",
    color: "#166534",
    bgColor: "#F0FDF4",
    vibe: "힐링·자연·치유",
    fakeSongs: ["숲속 빗소리 1시간", "파도소리 바다 ASMR", "새소리 캠핑 모닝", "강물 흐르는 소리"],
  },
];

export default function RadioRoulettePage() {
  const [current, setCurrent] = useState<Station | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [history, setHistory] = useState<Station[]>([]);

  function spinRoulette() {
    if (spinning) return;
    setSpinning(true);
    setCurrent(null);
    let i = 0;
    const total = 12;
    const interval = setInterval(() => {
      const rand = STATIONS[Math.floor(Math.random() * STATIONS.length)];
      setCurrent(rand);
      i++;
      if (i >= total) {
        clearInterval(interval);
        const final = STATIONS[Math.floor(Math.random() * STATIONS.length)];
        setCurrent(final);
        setHistory((h) => [final, ...h.slice(0, 4)]);
        setSpinning(false);
      }
    }, 100);
  }

  return (
    <LayoutContainer>
      <div className="py-4 max-w-sm mx-auto text-center">
        <div className="text-5xl mb-3">📻</div>
        <h1 className="text-2xl font-black text-gray-900 mb-1">라디오 룰렛</h1>
        <p className="text-sm text-gray-400 mb-7">오늘 기분에 맞는 라디오 채널을 뽑아봐요</p>

        {/* 라디오 카드 */}
        <div
          className="relative rounded-3xl overflow-hidden mb-6 shadow-lg transition-all duration-300"
          style={{ background: current ? current.bgColor : "#F3F4F6", minHeight: 220 }}
        >
          {current ? (
            <div className="p-6">
              <div className="text-6xl mb-3">{current.emoji}</div>
              <div
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 text-white"
                style={{ background: current.color }}
              >
                {current.genre}
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-1">{current.name}</h2>
              <p className="text-sm text-gray-500 mb-3">{current.description}</p>
              <div className="bg-white/70 rounded-xl p-3">
                <div className="text-xs text-gray-400 mb-1">🎵 지금 재생 중 (가상)</div>
                {current.fakeSongs.map((s, i) => (
                  <div
                    key={i}
                    className={`text-sm py-1 ${i === 0 ? "font-bold text-gray-900" : "text-gray-500"}`}
                  >
                    {i === 0 && "▶ "}{s}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-400">
                분위기: {current.vibe}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[220px]">
              <div className="text-gray-300 text-4xl">{spinning ? "🎲" : "📻"}</div>
            </div>
          )}
        </div>

        {/* 버튼 */}
        <button
          onClick={spinRoulette}
          disabled={spinning}
          className={`w-full py-4 rounded-2xl text-white font-black text-lg shadow-lg transition-all ${
            spinning ? "opacity-60 cursor-not-allowed scale-95" : "hover:scale-105 active:scale-95"
          }`}
          style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)" }}
        >
          {spinning ? "채널 찾는 중..." : "🎲 랜덤 채널 뽑기"}
        </button>

        {/* 최근 기록 */}
        {history.length > 0 && (
          <div className="mt-6 text-left">
            <div className="text-xs text-gray-400 font-bold mb-2">최근 뽑은 채널</div>
            <div className="flex flex-wrap gap-2">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(h)}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {h.emoji} {h.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-gray-300 mt-6">
          ※ 표시된 곡들은 실제 곡이 아닌 가상의 예시입니다
        </p>
      </div>
    </LayoutContainer>
  );
}
