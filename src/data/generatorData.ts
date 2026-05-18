// ================================================
// 생성기 데이터
// ================================================

export type GeneratorFieldType = "text" | "date" | "select" | "birthdate";

export type GeneratorField = {
  id: string;
  label: string;
  placeholder?: string;
  type: GeneratorFieldType;
  options?: string[];
  required?: boolean;
};

export type GeneratorData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  fields: GeneratorField[];
  // 결과 템플릿 — {name}, {adjective}, {noun} 등의 변수를 포함
  resultTemplates: string[];
  // 각 변수에 대한 단어 목록
  variables?: Record<string, string[]>;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
};

export const generatorList: GeneratorData[] = [
  {
    id: "gen-01",
    slug: "nickname",
    title: "나만의 별명 생성기",
    description: "이름과 생년월일로 딱 맞는 별명을 만들어 드려요!",
    emoji: "🏷️",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    isFeatured: true,
    tags: ["별명", "재미"],
    fields: [
      { id: "name", label: "이름 (닉네임)", placeholder: "홍길동", type: "text", required: true },
      {
        id: "mood",
        label: "요즘 기분",
        type: "select",
        options: ["신남", "우울함", "설렘", "무기력", "분노", "평온"],
        required: true,
      },
    ],
    resultTemplates: [
      "{name}은(는) {adjective} {animal} 같은 존재",
      "당신의 별명은 ✨{adjective} {name}✨",
      "오늘의 {name}은: {power}을 가진 {animal}",
      "#{name} = {adjective} + {mood}한 {animal}",
    ],
    variables: {
      adjective: ["반짝이는", "따뜻한", "폭발적인", "조용한", "날카로운", "달콤한", "씩씩한", "여린", "강한"],
      animal: ["고양이", "강아지", "여우", "곰", "토끼", "펭귄", "독수리", "늑대", "코알라"],
      power: ["공감 능력", "집중력", "창의력", "체력", "친화력", "직관력", "분석력", "끈기"],
    },
  },
  {
    id: "gen-02",
    slug: "past-life",
    title: "전생 직업 생성기",
    description: "이름과 생일로 전생에 무슨 일을 했는지 알아봐요!",
    emoji: "🔮",
    color: "#9333EA",
    bgColor: "#FAF5FF",
    isFeatured: true,
    tags: ["전생", "재미"],
    fields: [
      { id: "name", label: "이름", placeholder: "이름을 입력하세요", type: "text", required: true },
      { id: "birthdate", label: "생년월일", placeholder: "YYYY-MM-DD", type: "birthdate", required: true },
    ],
    resultTemplates: [
      "전생의 {name}은(는) {era}의 {job}이었어요",
      "당신은 {era}에 살았던 위대한 {job}!",
      "{name}의 전생: {era} 시대, {job} (신뢰도: {percent}%)",
      "이생의 당신이 {job}처럼 느껴지는 이유가 여기 있었네요!",
    ],
    variables: {
      era: ["조선시대", "고려시대", "신라시대", "삼국시대", "중세 유럽", "고대 이집트", "에도 일본", "빅토리아 시대"],
      job: ["학자", "궁중 화가", "상인", "검객", "점술사", "의원", "시인", "귀족", "농부", "장군", "무희", "도공"],
      percent: ["84", "91", "76", "88", "95", "73", "82", "97"],
    },
  },
  {
    id: "gen-03",
    slug: "movie-title",
    title: "내 인생 영화 제목 생성기",
    description: "이름과 성격으로 내 인생을 영화로 만들면?",
    emoji: "🎬",
    color: "#1D4ED8",
    bgColor: "#EFF6FF",
    tags: ["영화", "인생"],
    fields: [
      { id: "name", label: "이름", placeholder: "주인공 이름", type: "text", required: true },
      {
        id: "genre",
        label: "선호 장르",
        type: "select",
        options: ["로맨스", "액션", "코미디", "공포", "SF", "판타지", "드라마"],
        required: true,
      },
    ],
    resultTemplates: [
      "《{name}의 {adjective} {noun}》",
      "《{noun}을 찾아서 — {name}의 이야기》",
      "《{adjective} {name}, {noun}을 만나다》",
      "《{name}: {adjective}한 {noun}의 기록》",
    ],
    variables: {
      adjective: ["잃어버린", "완벽한", "뜨거운", "조용한", "마지막", "숨겨진", "특별한", "평범한"],
      noun: ["봄날", "기억", "사랑", "여름", "고백", "이별", "모험", "꿈", "우정", "기적"],
    },
  },
  {
    id: "gen-04",
    slug: "love-diagnosis",
    title: "연애 고장 원인 진단서",
    description: "내 연애가 잘 안 되는 핵심 이유를 공식 진단!",
    emoji: "💔",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    isFeatured: true,
    tags: ["연애", "진단", "재미"],
    fields: [
      { id: "name", label: "이름 (혹은 닉네임)", placeholder: "이름", type: "text", required: true },
      {
        id: "ex_count",
        label: "이전 연애 횟수",
        type: "select",
        options: ["0번 (아직 없음)", "1~2번", "3~5번", "6번 이상", "기억 안 남"],
        required: true,
      },
    ],
    resultTemplates: [
      "공식 진단: {name}의 연애 고장 원인 = {cause}",
      "{name} 연애 불능 사유: {cause} (처방전 첨부)",
      "진단서 발급 — {name}: 주요 원인 '{cause}', 2차 원인 '{cause2}'",
      "연애 회사라면 {name}은 '{cause}' 사유로 경고장 수령 예정",
    ],
    variables: {
      cause: [
        "완벽주의 (상대에게 너무 높은 기대)",
        "과도한 눈치 (말 못 하고 속으로만)",
        "집착 + 불안 콤보",
        "독립심 과다 (나 혼자도 괜찮아 신드롬)",
        "타이밍 운 없음",
        "매번 쿨한 척",
        "연락 속도 미스매치",
      ],
      cause2: [
        "진지함 발동 타이밍 이상",
        "감정 표현 부족",
        "자기 기준 불명확",
        "사람 보는 눈 업데이트 필요",
      ],
    },
  },
  {
    id: "gen-05",
    slug: "daily-fortune",
    title: "오늘의 하루 운세",
    description: "이름과 오늘 날짜로 하루 운세를 뽑아드려요!",
    emoji: "🔯",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    isNew: true,
    tags: ["운세", "오늘"],
    fields: [
      { id: "name", label: "이름", placeholder: "홍길동", type: "text", required: true },
      {
        id: "vibe",
        label: "오늘 기상 기분",
        type: "select",
        options: ["상쾌함", "피곤함", "설렘", "짜증남", "그냥 평범"],
        required: true,
      },
    ],
    resultTemplates: [
      "오늘 {name}의 운세: {fortune_word} — {fortune_detail}",
      "★ {name} 오늘의 한마디: {fortune_detail}. 행운의 색: {color}, 행운의 숫자: {number}",
      "{name}의 오늘은 {fortune_word}한 하루. {fortune_advice}",
      "오늘 {name}에게 필요한 것: {item} — {fortune_detail}",
    ],
    variables: {
      fortune_word: ["상승하는", "안정적인", "반전의", "조심스러운", "활기찬", "여유로운", "도전적인"],
      fortune_detail: [
        "오후 2시 이후 좋은 소식이 올 수 있어요",
        "오늘은 직감을 믿어도 좋은 날",
        "기다리던 연락이 올 수 있어요",
        "에너지 낭비 주의, 중요한 일 먼저",
        "새로운 인연을 만날 가능성 높음",
        "오늘 결정은 내일의 나에게 영향을 줘요",
      ],
      fortune_advice: ["천천히 생각하고 말하세요", "오늘은 무리하지 마세요", "용기 내서 말해봐도 좋아요"],
      color: ["보라색", "파란색", "핑크", "초록", "노랑"],
      number: ["3", "7", "11", "14", "21", "28"],
      item: ["따뜻한 음료", "좋아하는 노래", "짧은 산책", "단 음식"],
    },
  },
  {
    id: "gen-06",
    slug: "resign-reason",
    title: "퇴사 사유 자동 생성기",
    description: "그냥 못 나가겠다고? 공식 퇴사 사유를 만들어 드려요!",
    emoji: "🏃",
    color: "#374151",
    bgColor: "#F9FAFB",
    isNew: true,
    tags: ["직장", "퇴사", "재미"],
    fields: [
      { id: "name", label: "이름", placeholder: "퇴사자 이름", type: "text", required: true },
      {
        id: "duration",
        label: "재직 기간",
        type: "select",
        options: ["1개월 미만", "3개월", "6개월", "1년", "2~3년", "5년 이상"],
        required: true,
      },
    ],
    resultTemplates: [
      "퇴사 사유서 — {name}: '{reason}'",
      "{name}의 공식 퇴사 사유: {reason}. 이하 {disclaimer}",
      "📋 {name} 퇴사 결심의 1순위: {reason}",
      "면접관: 퇴사 이유가? {name}: \"{reason}\"",
    ],
    variables: {
      reason: [
        "개인 성장을 위한 새로운 도전을 위해",
        "더 나은 방향으로 나아가기 위해",
        "워라밸 재정립을 위해",
        "사내 문화 불일치로 인해",
        "월요일이 무서워서",
        "커리어 재정비 및 자기계발",
        "상사의 무한 가스라이팅에 대한 자기보호 차원",
      ],
      disclaimer: [
        "상세 이유는 기술하지 않음",
        "이하 자세한 내용은 면담 생략",
        "구체적 사유는 본인만 알고 있음",
      ],
    },
  },
  {
    id: "gen-07",
    slug: "group-chat-role",
    title: "단톡방 역할 분석기",
    description: "단체 카톡방에서 나는 어떤 역할인지 분석!",
    emoji: "💬",
    color: "#EAB308",
    bgColor: "#FEFCE8",
    tags: ["카톡", "단체", "재미"],
    fields: [
      { id: "name", label: "이름 (닉네임)", placeholder: "홍길동", type: "text", required: true },
      {
        id: "behavior",
        label: "단톡방 행동 패턴",
        type: "select",
        options: [
          "항상 첫 번째로 읽고 반응",
          "나중에 몰아서 읽음",
          "거의 안 읽음",
          "이모티콘만 보냄",
          "분위기 메이커",
          "조용히 눈팅만",
        ],
        required: true,
      },
    ],
    resultTemplates: [
      "{name}의 단톡방 공식 역할: {role}",
      "단톡방 생태계에서 {name}은(는) {role} 포지션",
      "분석 결과: {name} = {role} (발현 확률 {percent}%)",
    ],
    variables: {
      role: [
        "분위기 메이커 (없으면 적막함)",
        "이모티콘 전문 대응관",
        "무반응 고독자 (읽씹의 달인)",
        "중요 정보 전달자",
        "의도치 않은 화제 전환자",
        "이탈 없는 충성 멤버",
        "뒤늦게 열정 폭발형",
      ],
      percent: ["78", "82", "91", "65", "88", "74"],
    },
  },
  {
    id: "gen-08",
    slug: "today-warning",
    title: "오늘의 경고문 생성기",
    description: "오늘 하루 나에게 발령되는 공식 경고문!",
    emoji: "⚠️",
    color: "#F97316",
    bgColor: "#FFF7ED",
    isNew: true,
    tags: ["경고", "재미", "오늘"],
    fields: [
      { id: "name", label: "이름", placeholder: "이름", type: "text", required: true },
      {
        id: "status",
        label: "지금 상태",
        type: "select",
        options: ["배고픔", "피곤함", "심심함", "스트레스 최고조", "의욕 넘침", "그냥 무기력"],
        required: true,
      },
    ],
    resultTemplates: [
      "⚠️ 경고 — {name}: 현재 {warning_level}. {warning_text}",
      "공식 경고문: {name}은(는) 오늘 {warning_text}. 즉각 {action} 권고",
      "발령 코드 #{code} — {name}: {warning_text}",
    ],
    variables: {
      warning_level: ["주의 단계", "경계 단계", "심각 단계", "위기 단계"],
      warning_text: [
        "즉각적인 간식 섭취가 필요함",
        "지금 당장 눕기를 권고함",
        "무분별한 쇼핑 충동 발생 우려",
        "감정 폭발 일보 직전 상태",
        "집중력 소진 — 즉각 취식 필요",
        "의지력 전지 방전 임박",
      ],
      action: ["취식", "수면", "산책", "스트레칭", "유튜브 시청"],
      code: ["XJ3", "AA7", "Q1Z", "P44", "K99"],
    },
  },
  {
    id: "gen-09",
    slug: "soul-food",
    title: "나의 소울푸드 생성기",
    description: "지금 기분과 이름으로 오늘의 소울푸드 매칭!",
    emoji: "🍜",
    color: "#F97316",
    bgColor: "#FFF7ED",
    tags: ["음식", "소울푸드"],
    fields: [
      { id: "name", label: "이름", placeholder: "이름", type: "text", required: true },
      {
        id: "emotion",
        label: "지금 감정",
        type: "select",
        options: ["행복함", "슬픔", "무기력", "기쁨", "외로움", "설레임", "화남"],
        required: true,
      },
    ],
    resultTemplates: [
      "오늘 {name}의 소울푸드는 {food}!",
      "{name}의 감정 매칭 음식: {food} — {food_reason}",
      "지금 당신의 몸이 원하는 것: {food}. 이유: {food_reason}",
    ],
    variables: {
      food: ["라면", "떡볶이", "치킨", "김치찌개", "삼겹살", "짜장면", "순대국", "칼국수", "된장찌개", "피자"],
      food_reason: [
        "지금 이 음식이 모든 것을 해결해줄 거예요",
        "먹고 나면 기운이 솟을 것",
        "위로가 되는 맛",
        "지금 기분에 딱 맞는 음식",
        "혼자 먹어도 최고인 조합",
      ],
    },
  },
  {
    id: "gen-10",
    slug: "personality-summary",
    title: "성격 한 줄 요약 생성기",
    description: "이름으로 내 성격을 딱 한 줄로 요약해 드려요!",
    emoji: "🧬",
    color: "#10B981",
    bgColor: "#ECFDF5",
    tags: ["성격", "한 줄"],
    fields: [
      { id: "name", label: "이름 (닉네임)", placeholder: "홍길동", type: "text", required: true },
      {
        id: "strength",
        label: "나의 강점은?",
        type: "select",
        options: ["공감 능력", "논리적 사고", "창의력", "끈기", "유머", "친화력", "직관력"],
        required: true,
      },
    ],
    resultTemplates: [
      "{name}의 성격 한 줄 요약: \"{summary}\"",
      "공식 성격 기술서 — {name}: \"{summary}. {detail}\"",
      "자기소개 한 줄: \"{summary}\" (by {name})",
    ],
    variables: {
      summary: [
        "겉은 조용하지만 속은 불꽃같은 사람",
        "논리로 무장했지만 따뜻한 마음 소유자",
        "웃기려고 태어난 사람 같지만 진지할 때 무서운 사람",
        "공감 능력 만점, 자기 감정 표현은 어색한 타입",
        "혼자 있어도 행복하고, 같이 있어도 행복한 밸런스형",
        "생각 많고 행동 빠른 ADHD 감성",
        "말은 적지만 할 말은 다 하는 스타일",
        "거절을 못 하지만 속으로는 다 판단하는 사람",
      ],
      detail: [
        "가까운 사람에게 더 솔직한 편",
        "처음엔 낯을 가리지만 친해지면 갈수록 재밌어짐",
        "겉으로 티 안 내지만 상처 잘 받음",
        "자기 공간과 시간을 매우 중요시함",
      ],
    },
  },
  {
    id: "gen-11",
    slug: "future-job",
    title: "미래 직업 예측기",
    description: "이름과 생년월일로 10년 후 내 직업 예측!",
    emoji: "🚀",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    isNew: true,
    tags: ["미래", "직업"],
    fields: [
      { id: "name", label: "이름", placeholder: "이름", type: "text", required: true },
      { id: "birthdate", label: "생년월일", type: "birthdate", required: true },
    ],
    resultTemplates: [
      "10년 후 {name}의 직업 예측: {future_job} ({probability}% 확률)",
      "미래 직업 예측 — {name}: {future_job}. 근거: {reason}",
      "{name}이 {future_job}이 될 가능성: {probability}%",
    ],
    variables: {
      future_job: [
        "AI 크리에이터",
        "디지털 노마드",
        "라이프스타일 디자이너",
        "콘텐츠 사업가",
        "원격 근무 전문가",
        "뇌파 분석가",
        "메타버스 설계사",
        "자동화 컨설턴트",
        "감정 코칭 전문가",
        "유튜버",
      ],
      probability: ["73", "81", "68", "87", "92", "76", "84"],
      reason: [
        "현재 관심사와 기술 트렌드의 교차점",
        "타고난 성향과 미래 직업 수요 일치",
        "디지털 전환 흐름에 최적화된 프로파일",
        "창의성과 논리의 균형이 뛰어남",
      ],
    },
  },
];

export function getGeneratorBySlug(slug: string): GeneratorData | undefined {
  return generatorList.find((g) => g.slug === slug);
}

export function getFeaturedGenerators(): GeneratorData[] {
  return generatorList.filter((g) => g.isFeatured);
}

// 결과 생성 함수 (랜덤 시드 기반)
function seededRandom(seed: number): () => number {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateResult(generator: GeneratorData, inputs: Record<string, string>): string {
  const name = inputs["name"] || "당신";
  // 입력값으로 시드 생성
  const seedStr = Object.values(inputs).join("") + generator.id;
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) % 2147483647;
  }
  const rand = seededRandom(seed);

  // 랜덤 템플릿 선택
  const templateIdx = Math.floor(rand() * generator.resultTemplates.length);
  let result = generator.resultTemplates[templateIdx];

  // {name} 치환
  result = result.replace(/{name}/g, name);

  // {mood} 등 select input 치환
  for (const [key, val] of Object.entries(inputs)) {
    if (key !== "name" && key !== "birthdate") {
      result = result.replace(new RegExp(`{${key}}`, "g"), val);
    }
  }

  // 변수 치환
  if (generator.variables) {
    for (const [key, values] of Object.entries(generator.variables)) {
      const pattern = new RegExp(`{${key}}`, "g");
      result = result.replace(pattern, () => {
        const idx = Math.floor(rand() * values.length);
        return values[idx];
      });
    }
  }

  return result;
}
