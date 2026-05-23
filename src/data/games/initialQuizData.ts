// ================================================
// 초성퀴즈 데이터
// ================================================

export type InitialQuizQuestion = {
  id: string;
  initials: string;      // "ㄱㅊ" 형태
  answer: string;        // "김치"
  hint?: string;
  options: string[];     // 힌트 3단계 4지선다 (정답 포함)
  aliases?: string[];    // 허용 오타/유의어
  category: string;
};

export type InitialQuizData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  category: string;
  questions: InitialQuizQuestion[];
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  playCount?: number;
};

export const initialQuizList: InitialQuizData[] = [
  {
    id: "iq-01",
    slug: "korean-food",
    title: "한국 음식 초성퀴즈",
    description: "자주 먹는 한국 음식인데 초성으로 나오면?",
    emoji: "🍜",
    color: "#F97316",
    bgColor: "#FFF7ED",
    category: "음식",
    isFeatured: true,
    playCount: 32000,
    tags: ["음식", "한식", "인기"],
    questions: [
      { id: "q1", initials: "ㄸㅂㅇ", answer: "떡볶이", hint: "매콤달콤 국민 간식", options: ["떡볶이", "만두국", "된장국", "다시마"], category: "음식" },
      { id: "q2", initials: "ㅅㄱㅅ", answer: "삼겹살", hint: "구워서 쌈 싸먹는 고기", options: ["삼겹살", "소고기", "순대국", "새우살"], category: "음식" },
      { id: "q3", initials: "ㅂㄱㄱ", answer: "불고기", hint: "달콤 간장에 재운 소고기", options: ["불고기", "비빔국", "보쌈국", "배고기"], category: "음식" },
      { id: "q4", initials: "ㄱㅊㅉㄱ", answer: "김치찌개", hint: "얼큰한 국민 찌개", options: ["김치찌개", "기초지개", "강처자개", "곰치찌개"], category: "음식" },
      { id: "q5", initials: "ㅂㅂㅂ", answer: "비빔밥", hint: "나물+고추장+밥 비비기", options: ["비빔밥", "배배밥", "보보밥", "부부밥"], category: "음식" },
      { id: "q6", initials: "ㄴㅁ", answer: "냉면", hint: "시원한 여름 국수", options: ["냉면", "나물", "낙지", "능이"], category: "음식" },
      { id: "q7", initials: "ㅅㄷㅂㅉㄱ", answer: "순두부찌개", hint: "부드럽고 얼큰한 찌개", options: ["순두부찌개", "시도비지개", "숙도밥지개", "수도부찌개"], category: "음식" },
      { id: "q8", initials: "ㄱㅂㅉ", answer: "갈비찜", hint: "명절에 자주 등장하는 요리", options: ["갈비찜", "기비짐", "겨비찜", "갈보짬"], category: "음식" },
      { id: "q9", initials: "ㅅㄱㅌ", answer: "삼계탕", hint: "닭 안에 인삼+찹쌀", options: ["삼계탕", "숯고탕", "설겨탕", "시구탕"], category: "음식" },
      { id: "q10", initials: "ㅎㄸ", answer: "호떡", hint: "겨울 길거리 간식, 흑설탕 시럽", options: ["호떡", "흑도기", "화덕국", "한도기"], category: "음식" },
    ],
  },
  {
    id: "iq-02",
    slug: "kpop-song",
    title: "K팝 노래 초성퀴즈",
    description: "들으면 다 아는 K팝인데 초성은?",
    emoji: "🎵",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    category: "K팝",
    isFeatured: true,
    playCount: 28000,
    tags: ["K팝", "음악", "인기"],
    questions: [
      { id: "q1", initials: "ㄷㅇㄷㅇ", answer: "동의동의", hint: "IVE 노래", options: ["동의동의", "두어두어", "달이달이", "다음다음"], category: "K팝" },
      { id: "q2", initials: "ㅂㅂㅇ", answer: "붐바야", hint: "블랙핑크 데뷔곡", options: ["붐바야", "빠빠야", "봄봄야", "번번야"], category: "K팝" },
      { id: "q3", initials: "ㄷㅇㄴㅁㅇㅌ", answer: "다이너마이트", hint: "BTS 영어 노래", options: ["다이너마이트", "대낮대낮", "도네도네", "다누다누"], category: "K팝" },
      { id: "q4", initials: "ㄴㅇㅌ", answer: "놀이터", hint: "아이유 노래", options: ["놀이터", "나나나", "노노노", "날이날"], category: "K팝" },
      { id: "q5", initials: "ㄱㅇㅇㄹ", answer: "귀여워라", hint: "오마이걸 노래", options: ["귀여워라", "기억로라", "거울러라", "곱이러라"], category: "K팝" },
      { id: "q6", initials: "ㅃㄱ ㅁ", answer: "빨간 맛", hint: "레드벨벳 노래", options: ["빨간 맛", "벌려봐", "볼록봐", "블로버"], category: "K팝" },
      { id: "q7", initials: "ㄷㄹ ㄷㄹ", answer: "달러 달러", hint: "마마무 노래", options: ["달러 달러", "두라두", "데리다", "다루다"], category: "K팝" },
      { id: "q8", initials: "ㅅㅅㄷㅎㄱ", answer: "상상더하기", hint: "아이유 노래", options: ["상상더하기", "서서서", "실실실", "손손손"], category: "K팝" },
      { id: "q9", initials: "ㅊㅇㅎ ㅎㄴ", answer: "청아한 하늘", hint: "에스파 노래", options: ["청아한 하늘", "초옥한 하이", "차이한 허이", "춤으한 해이"], category: "K팝" },
      { id: "q10", initials: "ㄴㄲ", answer: "눈꽃", hint: "엠씨더맥스 발라드", options: ["눈꽃", "나그", "네기", "니근"], category: "K팝" },
    ],
  },
  {
    id: "iq-03",
    slug: "korean-movie",
    title: "한국 영화 초성퀴즈",
    description: "대박 흥행 영화들! 초성으로 나오면 맞힐 수 있을까?",
    emoji: "🎬",
    color: "#1D4ED8",
    bgColor: "#EFF6FF",
    category: "영화",
    isFeatured: true,
    playCount: 21000,
    tags: ["영화", "한국", "인기"],
    questions: [
      { id: "q1", initials: "ㄱㅅㅊ", answer: "기생충", hint: "칸 영화제 황금종려상", options: ["기생충", "고선초", "거숲창", "각설추"], category: "영화" },
      { id: "q2", initials: "ㅂㅈㄷㅅ", answer: "범죄도시", hint: "마동석 주연 액션", options: ["범죄도시", "보증대선", "벽진대사", "봄재도선"], category: "영화" },
      { id: "q3", initials: "ㅇㄱㄴ ㅇㅇㄱ", answer: "어긋난 이야기", hint: "이야기를 잘못 풀면", options: ["어긋난 이야기", "아귀아", "이기어", "오구음"], category: "영화" },
      { id: "q4", initials: "ㄷㄱ", answer: "덕구", hint: "노인+개 버디무비", options: ["덕구", "대기", "도규", "다귀"], category: "영화" },
      { id: "q5", initials: "ㅅㅇㅇ ㅊㅇ", answer: "살인의 추억", hint: "봉준호 감독 초기작", options: ["살인의 추억", "슬픔", "시험", "선학"], category: "영화" },
      { id: "q6", initials: "ㅇㄷ", answer: "오다", hint: "오는 누군가", options: ["오다", "어두", "이드", "아다"], category: "영화" },
      { id: "q7", initials: "ㄱㅊㅎㄱㄹ", answer: "건축학개론", hint: "첫사랑 로맄 명작", options: ["건축학개론", "거너", "갈나", "군나"], category: "영화" },
      { id: "q8", initials: "ㅇㄷㅂㅇ", answer: "올드보이", hint: "최민식 박찬욱 감독", options: ["올드보이", "예상", "역사", "이속"], category: "영화" },
      { id: "q9", initials: "ㅌㄴ ㅇㅇㄹ", answer: "터널 안으로", hint: "공사 중 사고 생존", options: ["터널 안으로", "태내용", "텀네용", "텅나용"], category: "영화" },
      { id: "q10", initials: "ㅅㅁ", answer: "스물", hint: "스물 살 청춘 이야기", options: ["스물", "소용", "시와", "새우"], category: "영화" },
    ],
  },
  {
    id: "iq-04",
    slug: "proverb",
    title: "속담 초성퀴즈",
    description: "다 아는 속담인데 초성으로 나오면?",
    emoji: "📜",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    category: "속담",
    playCount: 15000,
    tags: ["속담", "지식", "국어"],
    questions: [
      { id: "q1", initials: "ㄱㄴ ㅁㅇ ㄱㅇㅇ ㅇㄴ ㅁㅇ ㄱㄷ", answer: "가는 말이 고와야 오는 말이 곱다", hint: "말을 예쁘게 해야 한다는 속담", options: ["가는 말이 고와야 오는 말이 곱다", "겉 다르고 속 다르다", "개미가 물면 큰일난다", "귀한 말은 빈말"], category: "속담" },
      { id: "q2", initials: "ㅅ ㅅ ㅂㄹ ㅇㄷㄲㅈ ㄱㄷ", answer: "세 살 버릇 여든까지 간다", hint: "어릴 때 습관이 평생 간다는 속담", options: ["세 살 버릇 여든까지 간다", "시도 때도 없이 간다", "세상 다 살아도 간다", "스무 살 되어야 살다"], category: "속담" },
      { id: "q3", initials: "ㅎㄴㅇ ㅁㄴㅈㄷ ㅅㅇㄴ ㄱㅁㅇ ㅇㄷ", answer: "하늘이 무너져도 솟아날 구멍이 있다", hint: "어떤 어려움에도 길은 있다는 속담", options: ["하늘이 무너져도 솟아날 구멍이 있다", "현대에도 달리면 지다", "힘든 일에 되돌아 지다", "항상 일도 달라 지다"], category: "속담" },
      { id: "q4", initials: "ㄱㅅㅇ ㅅ ㅁㅇㅇㄷ ㄲㅇㅇ ㅂㅂ", answer: "구슬이 서 말이어도 꿰어야 보배", hint: "재능도 발휘해야 가치가 있다는 속담", options: ["구슬이 서 말이어도 꿰어야 보배", "거스를 수 지", "기술 서 재", "개수 서 지"], category: "속담" },
      { id: "q5", initials: "ㅂ ㅈㄱ ㅇ ㅈㄷ", answer: "병 주고 약 준다", hint: "해를 끼치고 도와주는 척한다는 속담", options: ["병 주고 약 준다", "봄로 하이", "바를 해요", "볼 리 하이"], category: "속담" },
      { id: "q6", initials: "ㅎㄹㅇㄷ ㅈ ㅁ ㅎㅁ ㅇㄷ", answer: "호랑이도 제 말 하면 온다", hint: "말하는 당사자가 나타난다는 속담", options: ["호랑이도 제 말 하면 온다", "화로 주년 다", "허랑 잡네 다", "흘려 제나 다"], category: "속담" },
      { id: "q7", initials: "ㄷㄷㄹㄷ ㄷㄷㄱ ㅂㄱ ㄱㄴㄹ", answer: "돌다리도 두들겨 보고 건너라", hint: "안전한 것도 확인하고 행동하라는 속담", options: ["돌다리도 두들겨 보고 건너라", "다 주 해 이이", "도지 해 여여", "두렵 하여 아아"], category: "속담" },
      { id: "q8", initials: "ㄴㅁㅇ ㅅㄱ ㄷㄱ ㅂㅁㅇ ㅈㄱ ㄷㄴㄷ", answer: "낮말은 새가 듣고 밤말은 쥐가 듣는다", hint: "어디서나 말조심하라는 속담", options: ["낮말은 새가 듣고 밤말은 쥐가 듣는다", "나 허 리 허", "낡은 해 로 했", "날 하라 하"], category: "속담" },
      { id: "q9", initials: "ㅂㅂㄷ ㅂㄲㅇ ㄷ ㅋㄷ", answer: "배보다 배꼽이 더 크다", hint: "부속이 더 크다는 속담", options: ["배보다 배꼽이 더 크다", "벌 때 서", "부터 땅 세", "봄 달 씨"], category: "속담" },
      { id: "q10", initials: "ㄷㅌㄹ ㅋ ㅈㄱ", answer: "도토리 키 재기", hint: "비슷한 수준끼리 다툼을 이르는 속담", options: ["도토리 키 재기", "다 보 마", "도박 매", "대변 무"], category: "속담" },
    ],
  },
  {
    id: "iq-05",
    slug: "mz-slang",
    title: "MZ 신조어 초성퀴즈",
    description: "요즘 유행하는 신조어, 초성으로 나오면?",
    emoji: "📱",
    color: "#9333EA",
    bgColor: "#FAF5FF",
    category: "신조어",
    isFeatured: true,
    isNew: true,
    playCount: 24000,
    tags: ["MZ", "신조어", "인기"],
    questions: [
      { id: "q1", initials: "ㄱㅅ", answer: "갓생", hint: "충실하고 성실한 삶", options: ["갓생", "고수", "기술", "감성"], category: "신조어" },
      { id: "q2", initials: "ㅅㅂㅈ", answer: "스불재", hint: "스스로 불러온 재앙", options: ["스불재", "수바즈", "소봉주", "스백지"], category: "신조어" },
      { id: "q3", initials: "ㅇㄹㅂ", answer: "워라밸", hint: "일과 삶의 균형", options: ["워라밸", "이러봐", "우루봐", "으루발"], category: "신조어" },
      { id: "q4", initials: "ㄱㅂㅆ", answer: "갑분싸", hint: "갑자기 분위기 싸해짐", options: ["갑분싸", "기분소", "갈봄새", "고부슨"], category: "신조어" },
      { id: "q5", initials: "ㅋㅂㅋ", answer: "케바케", hint: "케이스 바이 케이스", options: ["케바케", "카바코", "크비크", "코버코"], category: "신조어" },
      { id: "q6", initials: "ㄷㅂ", answer: "득보", hint: "득이 되는 보상/보너스", options: ["득보", "도부", "달봐", "디비"], category: "신조어" },
      { id: "q7", initials: "ㅈㅁ", answer: "존맛", hint: "진짜 맛있다는 표현 (순화)", options: ["존맛", "재촉", "자축", "조청"], category: "신조어" },
      { id: "q8", initials: "ㅎㅊㄱㄱ ㅅㄷ", answer: "훔쳐가고 싶다", hint: "너무 좋아서 가지고 싶을 때", options: ["훔쳐가고 싶다", "화끈화끈", "허기허기", "호그호그"], category: "신조어" },
      { id: "q9", initials: "ㄷㅅ", answer: "댓삭", hint: "댓글 삭제", options: ["댓삭", "다소", "대수", "도사"], category: "신조어" },
      { id: "q10", initials: "ㅈㅂㅈㅇ ㅈㅇ", answer: "자본주의 자아", hint: "돈에 지배되는 내면 자아", options: ["자본주의 자아", "주봐즈 이", "자봐지아", "제보즈아"], category: "신조어" },
    ],
  },
  {
    id: "iq-06",
    slug: "kdrama",
    title: "한국 드라마 초성퀴즈",
    description: "인기 한국 드라마! 초성으로 맞힐 수 있어?",
    emoji: "📺",
    color: "#0891B2",
    bgColor: "#ECFEFF",
    category: "드라마",
    playCount: 18000,
    tags: ["드라마", "한국", "TV"],
    questions: [
      { id: "q1", initials: "ㅇㅅㅎ ㅂㅎㅅ ㅇㅇㅇ", answer: "이상한 변호사 우영우", hint: "자폐 천재 변호사 드라마", options: ["이상한 변호사 우영우", "이가이스", "아기야 수", "아구아세"], category: "드라마" },
      { id: "q2", initials: "ㅅㄹㅇ ㅂㅅㅊ", answer: "사랑의 불시착", hint: "현빈+손예진 북한 드라마", options: ["사랑의 불시착", "속속", "수수", "시세"], category: "드라마" },
      { id: "q3", initials: "ㅇㅈㅇ ㄱㅇ", answer: "오징어 게임", hint: "넷플릭스 전 세계 1위 드라마", options: ["오징어 게임", "예시다", "이순도", "아신드"], category: "드라마" },
      { id: "q4", initials: "ㄱㅁㅇ ㅊㅊㅊ", answer: "갯마을 차차차", hint: "해변 마을 로맨스 드라마", options: ["갯마을 차차차", "거기", "기구", "곳곳"], category: "드라마" },
      { id: "q5", initials: "ㅂㅇㅅ ㅇ ㄱㄷ", answer: "별에서 온 그대", hint: "외계인 김수현 드라마", options: ["별에서 온 그대", "봄속", "바세", "벌서"], category: "드라마" },
      { id: "q6", initials: "ㄷㄲㅂ", answer: "도깨비", hint: "공유+이동욱 판타지 드라마", options: ["도깨비", "달리", "대로", "두루"], category: "드라마" },
      { id: "q7", initials: "ㅅㄱㄹㅇ ㅇㅅㅅㅎ", answer: "슬기로운 의사생활", hint: "의사들의 일상 드라마", options: ["슬기로운 의사생활", "신기수", "서구사", "상그수"], category: "드라마" },
      { id: "q8", initials: "ㄱㄱㅇ ㅇㄱ ㅅㄷ", answer: "그것이 알고 싶다", hint: "장수 탐사 프로그램", options: ["그것이 알고 싶다", "거두자", "거도지", "겨다즈"], category: "드라마" },
      { id: "q9", initials: "ㅈㄱ ㄷㅅㅇㄱ", answer: "지금 당신에게", hint: "불치병+사랑 감동 드라마", options: ["지금 당신에게", "졌더그", "제단기", "줄도기"], category: "드라마" },
      { id: "q10", initials: "ㅎㅆㅇㅈ ㄷㅂㅅ", answer: "힘쎈여자 도봉순", hint: "초괴력 여주인공 로맨스", options: ["힘쎈여자 도봉순", "힐 다 봐", "해 던 비", "하 다 봐"], category: "드라마" },
    ],
  },
  {
    id: "iq-07",
    slug: "brand",
    title: "브랜드 초성퀴즈",
    description: "모르면 간첩인 국내외 브랜드! 초성은?",
    emoji: "🏷️",
    color: "#374151",
    bgColor: "#F9FAFB",
    category: "브랜드",
    playCount: 14000,
    tags: ["브랜드", "생활", "상식"],
    questions: [
      { id: "q1", initials: "ㅅㅌㅂㅅ", answer: "스타벅스", hint: "초록 인어 로고 커피 브랜드", options: ["스타벅스", "세보", "수바", "소비"], category: "브랜드" },
      { id: "q2", initials: "ㅇㄹㅂㅇ", answer: "올리브영", hint: "H&B 스토어 국내 1위", options: ["올리브영", "아플러", "이프리", "어피로"], category: "브랜드" },
      { id: "q3", initials: "ㄷㅇㅅ", answer: "다이소", hint: "1000원 생활용품의 성지", options: ["다이소", "도소", "달숨", "두슘"], category: "브랜드" },
      { id: "q4", initials: "ㅋㅋㅇ", answer: "카카오", hint: "국민 메신저 운영사", options: ["카카오", "콜콜", "케크", "쿠쿠"], category: "브랜드" },
      { id: "q5", initials: "ㅅㅅ", answer: "삼성", hint: "우리나라 최대 전자 기업", options: ["삼성", "속수", "살사", "소서"], category: "브랜드" },
      { id: "q6", initials: "ㅂㄷㅇㅁㅈ", answer: "배달의민족", hint: "치킨 주문 앱", options: ["배달의민족", "발리", "봄로", "부루"], category: "브랜드" },
      { id: "q7", initials: "ㄴㅇㅋ", answer: "나이키", hint: "Just Do It 스포츠 브랜드", options: ["나이키", "나요", "너이", "누인"], category: "브랜드" },
      { id: "q8", initials: "ㅇㅁㅌ", answer: "이마트", hint: "신세계 대형마트", options: ["이마트", "에마다", "아미도", "오무드"], category: "브랜드" },
      { id: "q9", initials: "ㄱㅂㅁㄱ", answer: "교보문고", hint: "대형 서점 체인", options: ["교보문고", "거나", "기넘", "그냥"], category: "브랜드" },
      { id: "q10", initials: "ㅌㅆㅍㄹㅇㅅ", answer: "투썸플레이스", hint: "케이크+커피 카페 브랜드", options: ["투썸플레이스", "텅기", "투그", "톡기"], category: "브랜드" },
    ],
  },
  {
    id: "iq-08",
    slug: "animal",
    title: "동물 이름 초성퀴즈",
    description: "동물원에 있는 동물들! 초성은 뭘까?",
    emoji: "🐾",
    color: "#16A34A",
    bgColor: "#F0FDF4",
    category: "동물",
    playCount: 11000,
    tags: ["동물", "상식", "귀여움"],
    questions: [
      { id: "q1", initials: "ㅇㅅㄹ", answer: "오소리", hint: "숲속에 사는 흑백 포유류", options: ["오소리", "아새어", "어수이", "우사리"], category: "동물" },
      { id: "q2", initials: "ㅎㅁ", answer: "하마", hint: "물속에서 사는 큰 포유류", options: ["하마", "허구", "흠기", "흰가"], category: "동물" },
      { id: "q3", initials: "ㅍㅂ", answer: "표범", hint: "점박이 무늬 고양이과 동물", options: ["표범", "퓨어", "패임", "포으"], category: "동물" },
      { id: "q4", initials: "ㅇㄹㄴㄱㄹ", answer: "오리너구리", hint: "오리 부리를 가진 포유류", options: ["오리너구리", "아류", "어루", "으리"], category: "동물" },
      { id: "q5", initials: "ㄷㅅㄹ", answer: "독수리", hint: "하늘의 왕자", options: ["독수리", "대기", "다구", "도기"], category: "동물" },
      { id: "q6", initials: "ㅊㅍㅈ", answer: "침팬지", hint: "우리와 가장 가까운 유인원", options: ["침팬지", "처이", "추어", "초오"], category: "동물" },
      { id: "q7", initials: "ㅍㄹㅁㄱ", answer: "플라밍고", hint: "분홍색 다리 긴 새", options: ["플라밍고", "풀루", "포라", "파리"], category: "동물" },
      { id: "q8", initials: "ㅅㅋㅇ", answer: "살쾡이", hint: "야생 고양이과 동물", options: ["살쾡이", "서르", "소리", "시루"], category: "동물" },
      { id: "q9", initials: "ㅇㅇ", answer: "여우", hint: "꼬리 긴 교활한 동물", options: ["여우", "예하", "이후", "우희"], category: "동물" },
      { id: "q10", initials: "ㅁㅎㅇ", answer: "무한이", hint: "문어의 한자어", options: ["무한이", "미히", "마해", "머히"], category: "동물" },
    ],
  },
  {
    id: "iq-09",
    slug: "convenience-food",
    title: "편의점 먹거리 초성퀴즈",
    description: "편의점에서 자주 보는 먹거리! 초성은?",
    emoji: "🏪",
    color: "#F97316",
    bgColor: "#FFF7ED",
    category: "편의점",
    isNew: true,
    playCount: 19000,
    tags: ["편의점", "음식", "인기"],
    questions: [
      { id: "q1", initials: "ㅅㄱ ㄷㅅㄹ", answer: "삼각 도시락", hint: "삼각형 모양의 편의점 밥", options: ["삼각 도시락", "새기도서락", "서기대소라", "소극도식락"], category: "편의점" },
      { id: "q2", initials: "ㅍㅋㄹ ㅅㅇㅌ", answer: "포카리 스웨트", hint: "파란 캔 이온음료", options: ["포카리 스웨트", "풀러두", "파르다", "포리드"], category: "편의점" },
      { id: "q3", initials: "ㅎㄷㄱ", answer: "핫도그", hint: "소시지 옥수수 반죽", options: ["핫도그", "훗두", "허다", "하도"], category: "편의점" },
      { id: "q4", initials: "ㅂㄴㄴ ㅇㅇ", answer: "바나나 우유", hint: "노란 통에 든 달콤한 우유", options: ["바나나 우유", "베베", "보보", "비비"], category: "편의점" },
      { id: "q5", initials: "ㅎㄱㄹ", answer: "혼글라", hint: "혼자 마시기 좋은 소용량 와인", options: ["혼글라", "해구라", "후그로", "히그라"], category: "편의점" },
      { id: "q6", initials: "ㄲㅇㄷ", answer: "꼬이다", hint: "꼬깔콘 맛 과자 이름의 초성", options: ["꼬이다", "가이다", "고이다", "꾀이다"], category: "편의점" },
      { id: "q7", initials: "ㅅㅋㄹㅂ", answer: "스크류바", hint: "비틀린 막대 아이스크림", options: ["스크류바", "수크", "세크", "사크"], category: "편의점" },
      { id: "q8", initials: "ㅇㄴㅈ ㅇㄹ", answer: "에너지 음료", hint: "카페인 가득 각성 음료", options: ["에너지 음료", "아로", "어라", "이루"], category: "편의점" },
      { id: "q9", initials: "ㄲㄲㅁ", answer: "꼬꼬면", hint: "닭육수 하얀 국물 라면", options: ["꼬꼬면", "기기수", "구구서", "고거소"], category: "편의점" },
      { id: "q10", initials: "ㄷㅅㄹ ㅍㅇㅈ", answer: "도시락 편의점", hint: "편의점에서 사는 밥", options: ["도시락 편의점", "드어", "디아", "두어"], category: "편의점" },
    ],
  },
  {
    id: "iq-10",
    slug: "workplace-terms",
    title: "직장인 용어 초성퀴즈",
    description: "직장 생활 해봤다면 아는 단어들!",
    emoji: "💼",
    color: "#374151",
    bgColor: "#F9FAFB",
    category: "직장",
    isNew: true,
    playCount: 16000,
    tags: ["직장", "공감", "사회"],
    questions: [
      { id: "q1", initials: "ㅂㄱㅅ", answer: "보고서", hint: "상사에게 올리는 문서", options: ["보고서", "발기", "비기", "비구"], category: "직장" },
      { id: "q2", initials: "ㅋㅌ", answer: "칼퇴", hint: "정시에 칼같이 퇴근", options: ["칼퇴", "크타", "코테", "킬토"], category: "직장" },
      { id: "q3", initials: "ㅇㄱ", answer: "야근", hint: "밤늦게까지 일하기", options: ["야근", "아기", "어구", "이건"], category: "직장" },
      { id: "q4", initials: "ㅎㅅ", answer: "회식", hint: "직원들 함께 먹고 마시기", options: ["회식", "해수", "호서", "히스"], category: "직장" },
      { id: "q5", initials: "ㅈㅈㅅ", answer: "잡지식", hint: "업무에 쓸모없는 지식", options: ["잡지식", "재즈", "줄자", "지자"], category: "직장" },
      { id: "q6", initials: "ㅅㄱㄱ", answer: "성과급", hint: "실적에 따른 보너스", options: ["성과급", "소어", "수우", "시오"], category: "직장" },
      { id: "q7", initials: "ㄷㅅㅁㅅ", answer: "동사무소", hint: "관공서 비유 빡빡한 조직", options: ["동사무소", "대소", "도수", "딱서"], category: "직장" },
      { id: "q8", initials: "ㅈㄹ ㅂㅇ", answer: "자리 비움", hint: "오피스 자리 없음 표시", options: ["자리 비움", "지로", "줄리", "조리"], category: "직장" },
      { id: "q9", initials: "ㅌㅅ", answer: "퇴사", hint: "회사 그만두기", options: ["퇴사", "투슨", "토소", "티서"], category: "직장" },
      { id: "q10", initials: "ㄱㄱ", answer: "갈굼", hint: "상사에게 심하게 꾸지람 듣기", options: ["갈굼", "기고", "그거", "기근"], category: "직장" },
    ],
  },
];

export function getInitialQuizBySlug(slug: string): InitialQuizData | undefined {
  return initialQuizList.find((q) => q.slug === slug);
}
