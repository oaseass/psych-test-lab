// ================================================
// 틀린그림 찾기 데이터
// ================================================

export type SceneType =
  | "cafe"
  | "convenience"
  | "cat-room"
  | "dog-walk"
  | "school-desk"
  | "office-desk"
  | "beach-picnic"
  | "camping"
  | "subway"
  | "birthday";

export type DifferencePoint = {
  id: string;
  x: number; // percent 0-100 (of scene width)
  y: number; // percent 0-100 (of scene height)
  radius: number; // click tolerance in px (at 360px wide)
  label: string;
};

export type SpotSceneData = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  difficulty: "easy" | "normal" | "hard";
  timeLimit: number; // seconds
  differences: DifferencePoint[];
  sceneType: SceneType;
  color: string;
  bgColor: string;
  emoji: string;
};

export const spotSceneList: SpotSceneData[] = [
  {
    id: "sp-01",
    slug: "cafe-table",
    title: "카페 테이블",
    subtitle: "커피 한 잔의 여유 속에 숨겨진 차이를 찾아보세요",
    difficulty: "normal",
    timeLimit: 120,
    color: "#92400E",
    bgColor: "#FEF3C7",
    emoji: "☕",
    sceneType: "cafe",
    differences: [
      { id: "d1", x: 22, y: 74, radius: 22, label: "커피잔 손잡이 방향" },
      { id: "d2", x: 54, y: 68, radius: 20, label: "케이크 딸기 개수" },
      { id: "d3", x: 83, y: 22, radius: 20, label: "꽃 색깔" },
      { id: "d4", x: 66, y: 70, radius: 20, label: "영수증 줄 개수" },
      { id: "d5", x: 38, y: 79, radius: 20, label: "스마트폰 아이콘 개수" },
    ],
  },
  {
    id: "sp-02",
    slug: "convenience-store",
    title: "편의점 진열대",
    subtitle: "24시간 불이 꺼지지 않는 편의점에 뭔가 다르다",
    difficulty: "normal",
    timeLimit: 120,
    color: "#1D4ED8",
    bgColor: "#EFF6FF",
    emoji: "🏪",
    sceneType: "convenience",
    differences: [
      { id: "d1", x: 55, y: 37, radius: 20, label: "음료 캔 색깔" },
      { id: "d2", x: 52, y: 57, radius: 20, label: "가격표 금액" },
      { id: "d3", x: 27, y: 42, radius: 22, label: "과자 봉지 색깔" },
      { id: "d4", x: 76, y: 33, radius: 18, label: "스티커 유무" },
    ],
  },
  {
    id: "sp-03",
    slug: "cat-room",
    title: "고양이 방",
    subtitle: "편안히 쉬는 고양이, 뭔가 달라졌다냥",
    difficulty: "easy",
    timeLimit: 90,
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    emoji: "🐱",
    sceneType: "cat-room",
    differences: [
      { id: "d1", x: 50, y: 52, radius: 18, label: "고양이 눈 색깔" },
      { id: "d2", x: 71, y: 73, radius: 20, label: "물고기 장난감 유무" },
      { id: "d3", x: 50, y: 73, radius: 22, label: "방석 색깔" },
      { id: "d4", x: 45, y: 41, radius: 16, label: "귀 모양" },
    ],
  },
  {
    id: "sp-04",
    slug: "dog-walk",
    title: "강아지 산책",
    subtitle: "공원에서 산책 중인 강아지를 잘 살펴봐요",
    difficulty: "easy",
    timeLimit: 90,
    color: "#059669",
    bgColor: "#ECFDF5",
    emoji: "🐶",
    sceneType: "dog-walk",
    differences: [
      { id: "d1", x: 55, y: 57, radius: 20, label: "강아지 점 개수" },
      { id: "d2", x: 27, y: 24, radius: 18, label: "풍선 색깔" },
      { id: "d3", x: 70, y: 18, radius: 18, label: "새 마리 수" },
      { id: "d4", x: 78, y: 66, radius: 22, label: "벤치 색깔" },
    ],
  },
  {
    id: "sp-05",
    slug: "school-desk",
    title: "학교 책상",
    subtitle: "시험 준비 중인 책상에 뭔가 다르다",
    difficulty: "normal",
    timeLimit: 100,
    color: "#2563EB",
    bgColor: "#EFF6FF",
    emoji: "📚",
    sceneType: "school-desk",
    differences: [
      { id: "d1", x: 65, y: 62, radius: 18, label: "연필 개수" },
      { id: "d2", x: 30, y: 55, radius: 22, label: "책 표지 색깔" },
      { id: "d3", x: 80, y: 20, radius: 20, label: "시계 시각" },
    ],
  },
  {
    id: "sp-06",
    slug: "office-desk",
    title: "직장인 책상",
    subtitle: "바쁜 회사원의 책상에 숨겨진 차이",
    difficulty: "hard",
    timeLimit: 90,
    color: "#1E40AF",
    bgColor: "#EFF6FF",
    emoji: "💼",
    sceneType: "office-desk",
    differences: [
      { id: "d1", x: 72, y: 64, radius: 18, label: "머그컵 색깔" },
      { id: "d2", x: 50, y: 37, radius: 25, label: "모니터 내용" },
      { id: "d3", x: 18, y: 36, radius: 22, label: "화분 잎 개수" },
    ],
  },
  {
    id: "sp-07",
    slug: "beach-picnic",
    title: "바닷가 피크닉",
    subtitle: "파도 소리 들리는 해변에서 차이를 찾아봐요",
    difficulty: "normal",
    timeLimit: 110,
    color: "#0284C7",
    bgColor: "#F0F9FF",
    emoji: "🏖️",
    sceneType: "beach-picnic",
    differences: [
      { id: "d1", x: 50, y: 22, radius: 25, label: "파라솔 무늬" },
      { id: "d2", x: 22, y: 72, radius: 25, label: "파도 개수" },
      { id: "d3", x: 78, y: 78, radius: 20, label: "게 유무" },
    ],
  },
  {
    id: "sp-08",
    slug: "camping",
    title: "캠핑장",
    subtitle: "별이 빛나는 밤, 캠핑장에 숨겨진 차이",
    difficulty: "normal",
    timeLimit: 110,
    color: "#065F46",
    bgColor: "#ECFDF5",
    emoji: "⛺",
    sceneType: "camping",
    differences: [
      { id: "d1", x: 50, y: 60, radius: 30, label: "텐트 색깔" },
      { id: "d2", x: 75, y: 14, radius: 20, label: "별 개수" },
      { id: "d3", x: 50, y: 83, radius: 22, label: "장작 개수" },
    ],
  },
  {
    id: "sp-09",
    slug: "subway",
    title: "지하철 풍경",
    subtitle: "출퇴근 지하철 안에서 뭔가 달라졌어요",
    difficulty: "hard",
    timeLimit: 90,
    color: "#1E3A5F",
    bgColor: "#F0F9FF",
    emoji: "🚇",
    sceneType: "subway",
    differences: [
      { id: "d1", x: 30, y: 65, radius: 22, label: "좌석 색깔" },
      { id: "d2", x: 70, y: 30, radius: 25, label: "광고 내용" },
      { id: "d3", x: 55, y: 27, radius: 20, label: "창문 상태" },
    ],
  },
  {
    id: "sp-10",
    slug: "birthday-party",
    title: "생일파티 테이블",
    subtitle: "신나는 생일파티! 두 장면의 차이를 찾아봐요",
    difficulty: "easy",
    timeLimit: 100,
    color: "#BE185D",
    bgColor: "#FDF2F8",
    emoji: "🎂",
    sceneType: "birthday",
    differences: [
      { id: "d1", x: 50, y: 43, radius: 22, label: "케이크 초 개수" },
      { id: "d2", x: 25, y: 22, radius: 18, label: "풍선 색깔" },
      { id: "d3", x: 72, y: 72, radius: 20, label: "선물 리본 색깔" },
      { id: "d4", x: 50, y: 63, radius: 25, label: "케이크 층수" },
    ],
  },
];
