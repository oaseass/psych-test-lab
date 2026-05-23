"use client";
import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

type Exhibit = {
  id: string;
  num: string;
  room: string;
  era: string;
  title: string;
  emoji: string;
  desc: string;
  funFact: string;
  color: string;
};

const EXHIBITS: Exhibit[] = [
  // 브라우저 홀
  { id: "e1", num: "B-001", room: "브라우저 홀", era: "1995–2013", title: "인터넷 익스플로러", emoji: "🌐", desc: "한때 세상을 지배했던 파란 'e'. 호환성 이슈로 수많은 개발자들의 눈물을 자아냈다.", funFact: "IE6는 2001년 출시 후 무려 10년 넘게 사용됐다.", color: "#1D4ED8" },
  { id: "e2", num: "B-002", room: "브라우저 홀", era: "1996–2012", title: "야후! 코리아", emoji: "🔵", desc: "한국 최초의 포털 전쟁 주역. '야후! 재팬'과 함께 황금기를 누렸다.", funFact: "2000년대 초 야후코리아의 일 방문자는 1,000만 명을 넘었다.", color: "#7C3AED" },
  { id: "e3", num: "B-003", room: "브라우저 홀", era: "1999–현재", title: "네이버 지식iN", emoji: "❓", desc: "모르면 물어보면 됐다. 한국 인터넷 집단지성의 상징.", funFact: "2003년 서비스 시작 후 5억 건 이상의 문답이 쌓였다.", color: "#03C75A" },
  // 통신 홀
  { id: "e4", num: "C-001", room: "통신 홀", era: "1990–2005", title: "삐삐 (무선호출기)", emoji: "📟", desc: "숫자로 메시지를 보내던 시절. 0179는 '영원히 구해', 1004는 '천사'였다.", funFact: "1997년 한국 삐삐 가입자 수는 1,500만 명을 돌파했다.", color: "#374151" },
  { id: "e5", num: "C-002", room: "통신 홀", era: "1998–2010", title: "MSN 메신저", emoji: "💬", desc: "자판기 옆에서 채팅하던 그 감성. '삐리리' 소리와 함께 친구가 접속했다.", funFact: "2000년대 한국 십대의 유일한 온라인 소통 창구.", color: "#0EA5E9" },
  { id: "e6", num: "C-003", room: "통신 홀", era: "2002–2010", title: "버디버디", emoji: "🟡", desc: "노란 아이콘과 함께하던 국산 메신저. MSN과 치열하게 경쟁했다.", funFact: "최전성기 가입자 수 2,000만 명 이상을 기록했다.", color: "#D97706" },
  { id: "e7", num: "C-004", room: "통신 홀", era: "2000s", title: "폴더폰 문자", emoji: "📱", desc: "자음·모음을 여러 번 눌러 한 글자씩 쓰던 감성. 단어 하나에 30초.", funFact: "'ㄱ'을 3번 누르면 'ㄷ'가 나왔다. 지금 할 수 있어요?", color: "#DC2626" },
  { id: "e8", num: "C-005", room: "통신 홀", era: "2004–2020", title: "공인인증서", emoji: "🔐", desc: "인터넷 뱅킹의 상징이자 악몽. ActiveX와 함께 한국 IT를 10년 후퇴시켰다는 평가.", funFact: "NPKI 폴더 하나가 없으면 이체가 불가능했다.", color: "#111827" },
  // 게임실
  { id: "e9", num: "G-001", room: "게임실", era: "1998–2005", title: "스타크래프트 PC방", emoji: "⚔️", desc: "엄마한테 들키면 안 되는 방과 후 비밀 활동. PC방 예약 전쟁.", funFact: "2000년대 초 한국 PC방 매출의 90%가 스타크래프트였다.", color: "#B45309" },
  { id: "e10", num: "G-002", room: "게임실", era: "1998–2010", title: "리니지 혈맹", emoji: "⚔️", desc: "처음으로 사람들이 게임 아이템에 진짜 돈을 쓰기 시작한 순간.", funFact: "2001년 서버 정기점검 때 출근 시간 지하철이 한산해졌다는 전설이 있다.", color: "#9D174D" },
  { id: "e11", num: "G-003", room: "게임실", era: "2000–2010", title: "플래시 게임기", emoji: "🎮", desc: "넷마블, 넷게임즈… 플래시로 만든 조악하지만 중독성 있는 게임들.", funFact: "어도비가 플래시를 종료한 2020년, 전 세계가 동시에 추억에 잠겼다.", color: "#7C3AED" },
  { id: "e12", num: "G-004", room: "게임실", era: "2005–2012", title: "카트라이더 붐", emoji: "🏎️", desc: "최초의 국민 캐주얼 레이싱 게임. 속도보다 빠른 것은 없었다.", funFact: "2006년 최고 동시 접속자 20만 명을 돌파했다.", color: "#F97316" },
  // 음악실
  { id: "e13", num: "M-001", room: "음악실", era: "2000–2008", title: "소리바다·벅스", emoji: "🎵", desc: "MP3 불법 다운로드 전성시대. 지금 생각하면 큰일 났을 행동들.", funFact: "소리바다는 전 세계 최초 P2P 음악 공유 서비스 중 하나였다.", color: "#0891B2" },
  { id: "e14", num: "M-002", room: "음악실", era: "2000–2010", title: "싸이월드 BGM", emoji: "🎸", desc: "미니홈피에 꼭 있던 감성 BGM. 방문자들이 깜짝 놀라게 하는 큰 음악.", funFact: "BGM 설정에 2시간 쓰는 건 기본이었다.", color: "#D97706" },
  { id: "e15", num: "M-003", room: "음악실", era: "2000–2007", title: "아이리버 MP3", emoji: "🎧", desc: "한국이 만든 세계 최고의 휴대용 MP3 플레이어. 애플 이전의 시대.", funFact: "2004년 전 세계 MP3 시장 점유율 1위를 차지했다.", color: "#6B21A8" },
  // 영상실
  { id: "e16", num: "V-001", room: "영상실", era: "2000–2010", title: "디지털 카메라 (디카)", emoji: "📸", desc: "스마트폰 전의 카메라. SD카드 512MB로 사진 100장 찍던 시절의 마법.", funFact: "2003년 200만 화소 디카가 고급형이었다.", color: "#6B21A8" },
  { id: "e17", num: "V-002", room: "영상실", era: "1980–2005", title: "VHS 비디오 테이프", emoji: "📼", desc: "영화 한 편을 빌리러 비디오 가게에 가던 시절. '꼭 되감아 주세요'.", funFact: "VHS 테이프 하나의 평균 용량은 약 3~4GB였다.", color: "#1D4ED8" },
  { id: "e18", num: "V-003", room: "영상실", era: "2005–2015", title: "곰플레이어", emoji: "🐻", desc: "한국인이라면 누구나 설치했던 국민 동영상 플레이어.", funFact: "코덱 설치 화면이 나오면 모두가 '예'를 눌렀다.", color: "#854D0E" },
  // 소셜 홀
  { id: "e19", num: "S-001", room: "소셜 홀", era: "2001–2015", title: "싸이월드 미니홈피", emoji: "🏠", desc: "일촌 맺기, 도토리, 방명록… 한국 최초의 SNS가 여기서 시작됐다.", funFact: "전성기 회원 수 3,200만 명, 한국 인구의 65%였다.", color: "#F43F5E" },
  { id: "e20", num: "S-002", room: "소셜 홀", era: "2003–2015", title: "다음 카페", emoji: "☕", desc: "오프라인 모임을 온라인으로 옮겨온 최초의 커뮤니티 플랫폼.", funFact: "2004년 카페 수 600만 개를 돌파했다.", color: "#1D4ED8" },
  { id: "e21", num: "S-003", room: "소셜 홀", era: "2002–2015", title: "네이트온", emoji: "🔴", desc: "SK의 야심작. 파일 전송·화상채팅·쪽지 기능으로 MSN을 눌렀다.", funFact: "2009년 한국 메신저 시장 점유율 1위를 기록했다.", color: "#E11D48" },
  // 하드웨어 홀
  { id: "e22", num: "H-001", room: "하드웨어 홀", era: "1990–2005", title: "다이얼업 모뎀 소리", emoji: "📠", desc: "인터넷에 접속하려면 삐~위위위 소리를 참아야 했다. 평균 속도 56Kbps.", funFact: "고화질 사진 한 장(1MB) 다운로드에 약 3분이 걸렸다.", color: "#374151" },
  { id: "e23", num: "H-002", room: "하드웨어 홀", era: "1999–2009", title: "윈도우 XP 배경화면", emoji: "🌄", desc: "전 세계 어디에나 있던 언덕과 파란 하늘. 화면보호기 '비눗방울'도 함께.", funFact: "초록 언덕 사진은 나파 밸리에서 찍힌 실제 사진이다.", color: "#0369A1" },
  { id: "e24", num: "H-003", room: "하드웨어 홀", era: "2000–2010", title: "플로피 디스크", emoji: "💾", desc: "저장 아이콘의 원조. 1.44MB에 담긴 꿈들.", funFact: "지금도 전 세계 소프트웨어에서 '저장' 아이콘으로 살아 있다.", color: "#4B5563" },
  { id: "e25", num: "H-004", room: "하드웨어 홀", era: "2000–2015", title: "ActiveX 설치 요청", emoji: "🔧", desc: "페이지 하나 열 때마다 팝업으로 나타나던 공포의 설치 창.", funFact: "한국은 ActiveX 의존도가 세계 최고 수준이었다.", color: "#7C2D12" },
];

const ROOMS = ["전체", "브라우저 홀", "통신 홀", "게임실", "음악실", "영상실", "소셜 홀", "하드웨어 홀"];

const ROOM_EMOJI: Record<string, string> = {
  "전체": "🏛️", "브라우저 홀": "🌐", "통신 홀": "📡", "게임실": "🎮",
  "음악실": "🎵", "영상실": "📺", "소셜 홀": "💬", "하드웨어 홀": "🖥️",
};

export default function InternetMuseumPage() {
  const [selectedRoom, setSelectedRoom] = useState("전체");
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const filtered = selectedRoom === "전체" ? EXHIBITS : EXHIBITS.filter((e) => e.room === selectedRoom);
  const visitedCount = flipped.size;

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
        {/* Header */}
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">🏛️</div>
          <h1 className="text-2xl font-black text-gray-900">인터넷 박물관</h1>
          <p className="text-sm text-gray-500 mt-1">2000년대 인터넷 유물 전시회에 오신 것을 환영합니다</p>
          {visitedCount > 0 && (
            <div className="inline-flex items-center gap-1.5 mt-3 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
              <span className="text-amber-500 text-xs font-bold">🔍 {visitedCount}개 관람 완료</span>
              <span className="text-amber-300 text-xs">/ {EXHIBITS.length}개</span>
            </div>
          )}
        </div>

        {/* 전시관 탭 */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5" style={{ scrollbarWidth: "none" }}>
          {ROOMS.map((room) => (
            <button
              key={room}
              onClick={() => setSelectedRoom(room)}
              className={`flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-2 rounded-full font-bold transition-colors ${
                selectedRoom === room
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{ROOM_EMOJI[room]}</span>
              <span>{room}</span>
            </button>
          ))}
        </div>

        {/* 전시 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((ex) => {
            const isFlipped = flipped.has(ex.id);
            return (
              <div key={ex.id} className="cursor-pointer select-none" onClick={() => toggleFlip(ex.id)}>
                {!isFlipped ? (
                  <div className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow" style={{ background: ex.color }}>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-3xl">{ex.emoji}</span>
                        <span className="text-[10px] font-bold text-white/50 bg-white/10 px-2 py-0.5 rounded-full">
                          {ex.num}
                        </span>
                      </div>
                      <div className="text-[11px] text-white/60 mb-1">{ex.room} · {ex.era}</div>
                      <h3 className="font-black text-white text-sm mb-1.5">{ex.title}</h3>
                      <p className="text-white/75 text-xs line-clamp-2 leading-relaxed">{ex.desc}</p>
                      <div className="mt-3 flex items-center gap-1 text-white/40 text-xs">
                        <span>💡 흥미로운 사실 보기</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl overflow-hidden border-2 border-amber-200 bg-amber-50 hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">💡</span>
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-100 px-2 py-0.5 rounded-full">
                          {ex.num}
                        </span>
                      </div>
                      <div className="text-xs text-amber-600 font-bold mb-2">흥미로운 사실</div>
                      <p className="text-sm text-gray-800 font-semibold leading-relaxed">{ex.funFact}</p>
                      <div className="mt-4 text-xs text-gray-400">탭해서 닫기 ←</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          당신도 이 시절을 기억하시나요? 📼
        </p>
      </div>
    </LayoutContainer>
  );
}

