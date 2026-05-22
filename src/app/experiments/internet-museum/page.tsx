"use client";
import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

type Exhibit = {
  id: string;
  room: string;
  era: string;
  title: string;
  emoji: string;
  description: string;
  funFact: string;
  color: string;
};

const EXHIBITS: Exhibit[] = [
  // 브라우저 홀
  { id: "e1", room: "브라우저 홀", era: "2000s", title: "인터넷 익스플로러", emoji: "🌐", description: "한때 세상을 지배했던 파란 'e'. 호환성 이슈로 수많은 개발자들의 눈물을 자아냈다.", funFact: "IE6는 2001년 출시 후 무려 10년 넘게 쓰였다.", color: "#1D4ED8" },
  { id: "e2", room: "브라우저 홀", era: "2000s", title: "마이크로소프트 MSN", emoji: "💬", description: "자판기 옆에서 채팅하던 그 감성. '삐리리' 소리와 함께 친구가 접속했다.", funFact: "2000년대 한국 십대의 유일한 소통 창구.", color: "#0EA5E9" },
  // 게임실
  { id: "e3", room: "게임실", era: "2000s", title: "넷마블 플래시게임", emoji: "🎮", description: "학교 끝나고 달려가던 PC방. 플래시로 만든 조악하지만 중독성 있는 게임들", funFact: "서울 PC방 보급률이 세계 1위였던 시절의 유물", color: "#7C3AED" },
  { id: "e4", room: "게임실", era: "2000s", title: "카운터스트라이크 / 스타크래프트", emoji: "⚔️", description: "PC방 예약 전쟁. 엄마한테 들키면 안 되는 방과 후 비밀 활동", funFact: "2000년대 한국 PC방 매출의 90%는 스타크래프트가 책임졌다", color: "#B45309" },
  // 음악실
  { id: "e5", room: "음악실", era: "2000s", title: "소리바다 · 벅스", emoji: "🎵", description: "MP3 불법 다운로드 전성시대. 지금 생각하면 큰일 났을 행동들...", funFact: "소리바다는 전 세계 최초 P2P 음악 공유 서비스 중 하나였다", color: "#0891B2" },
  { id: "e6", room: "음악실", era: "2000s", title: "미니홈피 BGM", emoji: "🎸", description: "싸이월드 미니홈피에 꼭 있던 감성 BGM. 방문객들이 깜짝 놀라게 하는 큰 음악", funFact: "배경음악 설정하는 데 2시간 쓰는 건 기본", color: "#D97706" },
  // 통신 홀
  { id: "e7", room: "통신 홀", era: "2000s", title: "삐삐(무선호출기)", emoji: "📟", description: "숫자로 메시지를 보내던 시절. 0179는 '영원히 구해', 1004는 '천사'였다", funFact: "한국 삐삐 가입자 수는 1997년 1,500만명을 돌파했다", color: "#374151" },
  { id: "e8", room: "통신 홀", era: "2000s", title: "폴더폰 문자", emoji: "📱", description: "애니콜, 스카이... 자음과 모음을 누르며 문자 보내던 감성. 단어당 30초.", funFact: "'ㄱ'을 3번 누르면 'ㄷ'가 나왔다. 지금 할 수 있어요?", color: "#DC2626" },
  // 영상실
  { id: "e9", room: "영상실", era: "2000s", title: "디지털 카메라 (디카)", emoji: "📸", description: "스마트폰 전의 카메라. SD카드 512MB로 사진 100장 찍던 시절의 마법", funFact: "2000년대 초 200만 화소 디카가 고급형이었다", color: "#6B21A8" },
  { id: "e10", room: "영상실", era: "2000s", title: "VHS / 비디오 테이프", emoji: "📼", description: "영화 한 편을 빌리러 비디오 가게에 가던 시절. '꼭 되감아 주세요'", funFact: "VHS 테이프 하나의 평균 용량은 약 3~4GB였다", color: "#1D4ED8" },
];

const ROOMS = ["전체", "브라우저 홀", "게임실", "음악실", "통신 홀", "영상실"];

export default function InternetMuseumPage() {
  const [selectedRoom, setSelectedRoom] = useState("전체");
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const filtered = selectedRoom === "전체" ? EXHIBITS : EXHIBITS.filter((e) => e.room === selectedRoom);

  function toggleFlip(id: string) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <LayoutContainer>
      <div className="py-4 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🏛️</div>
          <h1 className="text-2xl font-black text-gray-900">인터넷 박물관</h1>
          <p className="text-sm text-gray-500 mt-1">2000년대 인터넷 유물 전시회에 오신 것을 환영합니다</p>
        </div>

        {/* 전시관 선택 */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none">
          {ROOMS.map((room) => (
            <button
              key={room}
              onClick={() => setSelectedRoom(room)}
              className={`flex-shrink-0 text-xs px-3 py-2 rounded-full font-bold transition-colors ${
                selectedRoom === room
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {room}
            </button>
          ))}
        </div>

        {/* 전시 목록 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((ex) => (
            <div
              key={ex.id}
              className="cursor-pointer select-none"
              onClick={() => toggleFlip(ex.id)}
            >
              <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${flipped.has(ex.id) ? "" : "hover:shadow-md"}`}>
                {!flipped.has(ex.id) ? (
                  // 앞면
                  <div className="p-5" style={{ background: ex.color }}>
                    <div className="text-4xl mb-3">{ex.emoji}</div>
                    <div className="text-xs text-white/70 mb-1">{ex.room} · {ex.era}</div>
                    <h3 className="font-black text-white text-base mb-1">{ex.title}</h3>
                    <p className="text-white/80 text-xs line-clamp-2">{ex.description}</p>
                    <div className="mt-3 text-white/50 text-xs">탭해서 더 보기 →</div>
                  </div>
                ) : (
                  // 뒷면 (Fun Fact)
                  <div className="p-5 bg-yellow-50 border border-yellow-200">
                    <div className="text-2xl mb-2">💡</div>
                    <div className="text-xs text-yellow-600 font-bold mb-2">흥미로운 사실</div>
                    <p className="text-sm text-gray-800 font-medium">{ex.funFact}</p>
                    <div className="mt-4 text-xs text-gray-400">탭해서 닫기</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          당신도 이 시절을 기억하시나요? 📼
        </p>
      </div>
    </LayoutContainer>
  );
}
