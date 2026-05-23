import type { PlayableTest, TestMeta, TestQuestion, TestResult } from "@/types";
import { createSeededRandomFromSlug, seededPickN } from "./seed";
import { QA_BANKS } from "./banks/qa";
import { RESULT_BANKS } from "./banks/results";
import type { QAOption, ResultTemplate } from "./banks/types";

// 카테고리별 질문 템플릿 뱅크
const QUESTION_TEMPLATES_BY_CATEGORY: Record<string, string[]> = {
  yeonae: [
    "연인에게 섭섭한 게 있을 때 당신은?",
    "연락이 갑자기 줄면 가장 먼저 드는 생각은?",
    "연애에서 가장 중요하게 생각하는 것은?",
    "처음 만나는 사람에게 먼저 연락하는 편인가요?",
    "상대가 내 말에 공감하지 못하면 어떤 기분인가요?",
    "연인과 다투고 나서 당신은?",
    "연애 초반, 상대가 너무 좋아한다는 게 느껴지면?",
    "전 연인 생각이 날 때 당신은?",
    "연인과 취미가 달라도 함께 시간을 보낼 수 있나요?",
    "상대가 나를 많이 의존하면 어떤 기분인가요?",
    "연애에서 거짓말을 발견했을 때 당신은?",
    "완벽한 연애 상대를 설명한다면?",
  ],
  "don-sobi": [
    "월급날 가장 먼저 하는 일은?",
    "충동 구매를 하는 편인가요?",
    "돈이 생기면 어디에 제일 먼저 쓰고 싶나요?",
    "저축은 어떻게 하고 있나요?",
    "큰 지출이 있을 때 어떻게 결정하나요?",
    "돈을 빌려달라는 요청을 받으면?",
    "쇼핑할 때 나의 방식은?",
    "재정적으로 가장 힘들었던 이유를 고른다면?",
    "투자에 대해 어떻게 생각하나요?",
    "돈과 시간 중 하나를 선택해야 한다면?",
    "주변 사람의 소비가 나의 소비에 영향을 주나요?",
    "장기적인 재정 목표가 있나요?",
  ],
  "ingangwan-gye": [
    "처음 만나는 사람과 쉽게 친해지는 편인가요?",
    "친한 척하는 사람이 불편할 때 당신은?",
    "관계에서 먼저 연락하는 편인가요?",
    "갈등이 생겼을 때 당신의 반응은?",
    "단체 모임에서 당신의 포지션은?",
    "사람을 처음 만날 때 어떤 것을 가장 먼저 파악하나요?",
    "친구가 힘들다고 할 때 당신은?",
    "오랫동안 연락을 안 한 친구가 갑자기 연락하면?",
    "가까운 사람이 기대에 어긋났을 때?",
    "사람을 사귀는 속도가 어떤 편인가요?",
    "혼자 있는 시간과 함께 있는 시간 중 어느 쪽이 더 편한가요?",
    "나에 대한 험담을 들었을 때 당신은?",
  ],
  jikjang: [
    "직장에서 불합리한 상황을 만나면?",
    "팀 프로젝트에서 내가 맡는 역할은?",
    "상사에게 피드백을 받을 때 기분은?",
    "직장 내 인간관계가 힘들 때 당신은?",
    "야근 요청을 받으면?",
    "직장에서 실수를 하면 어떻게 대처하나요?",
    "같은 팀원이 일을 제대로 못 하면?",
    "직장에서 인정받고 싶은 방식은?",
    "회사 문화와 내 스타일이 맞지 않으면?",
    "새로운 업무나 프로젝트를 맡았을 때?",
    "직장 동료와 사생활을 공유하는 편인가요?",
    "직장을 그만두고 싶다는 생각이 들 때는?",
  ],
  seonggyek: [
    "화가 났을 때 나는 어떻게 반응하나요?",
    "새로운 상황에 적응하는 속도는?",
    "다른 사람의 눈치를 보는 편인가요?",
    "나 자신을 한 단어로 설명한다면?",
    "칭찬을 받았을 때 기분은?",
    "내가 틀렸다는 게 명확해졌을 때 당신은?",
    "예상치 못한 변화가 생겼을 때 반응은?",
    "완벽하게 하지 못한 일이 있으면?",
    "혼자 결정을 내리는 편인가요, 다른 사람 의견을 구하는 편인가요?",
    "나의 강점이라고 생각하는 것은?",
    "비판을 받을 때 어떻게 반응하나요?",
    "내가 가장 편안함을 느끼는 상황은?",
  ],
  default: [
    "이 상황에서 당신은 어떻게 행동하나요?",
    "가장 중요하게 생각하는 것은?",
    "어려운 선택 앞에서 당신은?",
    "주변 사람들이 나를 어떻게 보길 원하나요?",
    "스트레스 상황에서 나의 반응은?",
    "나 자신에 대해 가장 잘 아는 것은?",
    "관계에서 가장 중요한 것은?",
    "성공을 어떻게 정의하나요?",
    "실패했을 때 당신은?",
    "나를 가장 힘들게 하는 것은?",
    "내가 바꾸고 싶은 것이 있다면?",
    "이상적인 하루를 보낸다면?",
  ],
};

// 기본 선택지 텍스트 템플릿
const OPTION_TEXTS = [
  ["바로 행동한다", "천천히 생각한 뒤 행동한다", "상황을 지켜본다", "다른 사람 의견을 듣는다"],
  ["적극적으로 표현한다", "돌려서 표현한다", "일단 속으로 삭힌다", "표현 안 한다"],
  ["직접 해결하려 한다", "도움을 요청한다", "일단 피한다", "그냥 두면 해결될 것 같다"],
  ["매우 중요하게 생각한다", "어느 정도 중요하다", "크게 신경 안 쓴다", "전혀 신경 안 쓴다"],
];

// 카테고리별 결과 유형 템플릿
const RESULT_TEMPLATES_BY_CATEGORY: Record<string, string[]> = {
  yeonae: ["감정 표현형", "거리 두기형", "확인 요구형", "독립 추구형", "안정 추구형", "감정 억제형", "표현 서투름형", "애정 과잉형"],
  "don-sobi": ["계획 소비형", "충동 소비형", "감정 소비형", "관계 소비형", "현재 우선형", "안전 집착형", "구조 문제형", "의식 부족형"],
  "ingangwan-gye": ["친화 리더형", "선택적 교류형", "감정 공감형", "거리 유지형", "배려 과잉형", "직설 표현형", "관찰 분석형", "신중 신뢰형"],
  jikjang: ["성과 추구형", "관계 우선형", "안정 선호형", "독립 실행형", "갈등 회피형", "인정 욕구형", "완벽 추구형", "번아웃 위험형"],
  seonggyek: ["외향적 활동형", "내향적 사색형", "균형 조화형", "감성 직관형", "논리 분석형", "감정 표현형", "자기 방어형", "성장 지향형"],
  default: ["A형", "B형", "C형", "D형", "E형", "F형", "G형", "H형"],
};

function makeSimpleResult(id: string, title: string, categorySlug: string, rng: () => number): TestResult {
  return {
    id,
    title,
    subtitle: `${title}의 특성을 가진 사람입니다`,
    summary: `당신은 ${title}의 패턴을 가지고 있습니다. 이 유형은 나름의 강점과 개선할 점을 동시에 가지고 있으며, 자신의 패턴을 인식하는 것이 성장의 첫 걸음입니다.`,
    keywords: [title.replace("형", ""), "패턴", "유형", "심리"],
    strengths: [
      "자신만의 방식이 명확하다",
      "상황에 맞는 반응을 할 줄 안다",
      "일관성이 있다",
    ],
    weaknesses: [
      "가끔 유연하게 대처하기 어렵다",
      "특정 패턴이 반복될 수 있다",
    ],
    relationship: "이 유형은 관계에서도 특유의 방식으로 상호작용합니다.",
    money: "재정 측면에서도 이 성향이 영향을 미칠 수 있습니다.",
    work: "업무 환경에서도 이 특성이 나타납니다.",
    social: "사회적 상황에서 이 패턴이 드러납니다.",
    caution: "자신의 패턴을 인식하고 필요할 때 유연하게 조정하는 것이 중요합니다.",
    matchingTypes: ["보완적인 유형", "이해심 있는 유형"],
    oppositeTypes: ["반대 패턴 유형"],
    shareText: `나는 \"${title}\"이래. 너도 해봐 → `,
  };
}

// QAPair (object 형식 선택지) → TestQuestion 변환
function qaToTestQuestion(pair: { text: string; options: QAOption[] }, index: number): TestQuestion {
  return {
    id: `q${index + 1}`,
    text: pair.text,
    options: pair.options.map((opt, oi) => {
      const optText = typeof opt === "string" ? opt : opt.text;
      const resultKey = typeof opt === "string" ? `r${oi + 1}` : opt.resultKey;
      return {
        id: `opt-${String.fromCharCode(97 + oi)}`,
        text: optText,
        scores: { [resultKey]: 3 },
      };
    }),
  };
}

// ResultTemplate → TestResult 변환
function resultTemplateToTestResult(rt: ResultTemplate): TestResult {
  return {
    id: rt.key ?? rt.title,
    title: rt.title,
    subtitle: rt.subtitle,
    summary: rt.summary,
    keywords: rt.keywords,
    strengths: rt.strengths,
    weaknesses: rt.weaknesses,
    relationship: rt.relationship,
    money: rt.money,
    work: rt.work,
    social: rt.social,
    caution: rt.caution,
    matchingTypes: rt.matchingTypes,
    oppositeTypes: rt.oppositeTypes,
    shareText: rt.shareText,
  };
}

export function generatePlayableTest(meta: TestMeta): PlayableTest {
  const rng = createSeededRandomFromSlug(meta.slug);

  // slug 전용 QA 뱅크가 있으면 우선 사용
  const slugQABank = QA_BANKS[meta.slug];
  const slugResultBank = RESULT_BANKS[meta.slug];

  if (slugQABank && slugResultBank) {
    // object 형식 선택지인지 확인 (신버전 뱅크)
    const firstOpt = slugQABank[0]?.options[0];
    if (firstOpt && typeof firstOpt === "object" && "resultKey" in firstOpt) {
      const picked = seededPickN(slugQABank, 6, rng);
      const questions: TestQuestion[] = picked.map((pair, i) => qaToTestQuestion(pair, i));
      const results: TestResult[] = slugResultBank.map(resultTemplateToTestResult);
      return { meta, questions, results };
    }
  }

  // 폴백: 카테고리 템플릿 기반 생성 (구버전)
  const categoryTemplates = QUESTION_TEMPLATES_BY_CATEGORY[meta.categorySlug] ||
    QUESTION_TEMPLATES_BY_CATEGORY.default;

  const resultTitles = RESULT_TEMPLATES_BY_CATEGORY[meta.categorySlug] ||
    RESULT_TEMPLATES_BY_CATEGORY.default;

  // 질문 생성 (6개)
  const questionTexts = seededPickN(categoryTemplates, 6, rng);
  const questions: TestQuestion[] = questionTexts.map((text, qi) => {
    const optionTemplate = OPTION_TEXTS[qi % OPTION_TEXTS.length];
    return {
      id: `q${qi + 1}`,
      text,
      options: optionTemplate.map((optText, oi) => {
        const resultIdx = (qi + oi) % 8;
        return {
          id: `opt-${String.fromCharCode(97 + oi)}`,
          text: optText,
          scores: { [`r${resultIdx + 1}`]: 3 },
        };
      }),
    };
  });

  // 결과 생성 (8개)
  const results: TestResult[] = resultTitles.map((title, i) =>
    makeSimpleResult(`r${i + 1}`, title, meta.categorySlug, rng)
  );

  return { meta, questions, results };
}
