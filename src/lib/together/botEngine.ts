// ================================================
// AI 봇 엔진
// 초기: rule-based / 추후 LLM 기반으로 교체 가능
// ================================================
import type { Participant, BotPersonality, TogetherGameType, RoundOption } from "@/lib/together/types";

const BOT_NICKNAMES = ["모찌", "하루", "콩이", "라떼", "밤비", "초코", "도도", "유자", "구름", "나나", "망고", "단추"];
const BOT_EMOJIS = ["🐶", "🐱", "🐰", "🐻", "🐼", "🐸", "🐥", "🦊", "🐯", "🐨", "🐹", "🐵"];
const BOT_PERSONALITIES: BotPersonality[] = ["random", "playful", "serious", "bold", "careful", "emotional", "logical"];

function generateId(): string {
  return `bot_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// 봇 닉네임 중복 방지
const usedBotNicknames = new Set<string>();

export function createBot(index = 0): Participant {
  // 사용되지 않은 닉네임 찾기
  const available = BOT_NICKNAMES.filter((n) => !usedBotNicknames.has(n));
  const nicknamePool = available.length > 0 ? available : BOT_NICKNAMES;
  const nickname = nicknamePool[index % nicknamePool.length];
  usedBotNicknames.add(nickname);

  const emojiIdx = BOT_NICKNAMES.indexOf(nickname) % BOT_EMOJIS.length;
  const personality = BOT_PERSONALITIES[Math.floor(Math.random() * BOT_PERSONALITIES.length)];

  return {
    id: generateId(),
    nickname,
    emoji: BOT_EMOJIS[emojiIdx],
    type: "bot",
    botPersonality: personality,
    joinedAt: new Date().toISOString(),
    isHost: false,
    score: 0,
  };
}

export function resetBotNicknames(): void {
  usedBotNicknames.clear();
}

// ─── 봇 답변 생성 ───
// 나중에 LLM으로 교체 가능하도록 함수 분리

function weightedRandom(options: RoundOption[], weights: number[]): string {
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < options.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return options[i].id;
  }
  return options[options.length - 1].id;
}

function personalityWeights(options: RoundOption[], personality: BotPersonality): number[] {
  const texts = options.map((o) => o.text.toLowerCase());
  const boldKeywords = ["불안정", "모험", "사업", "설렘", "즉흥", "솔직", "먼저", "강한"];
  const safeKeywords = ["안정", "계획", "저축", "무난", "기다리", "편한", "모아"];
  const emotionalKeywords = ["사랑", "감정", "설레", "그리움", "공감", "다정"];
  const logicalKeywords = ["효율", "현실", "계산", "미래", "저축", "해결"];
  const playfulKeywords = ["웃긴", "재밌", "신나", "파티", "즉흥", "모험"];

  if (options.length === 0) return [];

  return options.map((_, i) => {
    const text = texts[i];
    let weight = 1;
    if (personality === "random") return 1;
    if (personality === "bold") {
      weight += boldKeywords.some((k) => text.includes(k)) ? 2 : 0;
      weight -= safeKeywords.some((k) => text.includes(k)) ? 0.5 : 0;
    } else if (personality === "careful") {
      weight += safeKeywords.some((k) => text.includes(k)) ? 2 : 0;
      weight -= boldKeywords.some((k) => text.includes(k)) ? 0.5 : 0;
    } else if (personality === "emotional") {
      weight += emotionalKeywords.some((k) => text.includes(k)) ? 2 : 0;
    } else if (personality === "logical") {
      weight += logicalKeywords.some((k) => text.includes(k)) ? 2 : 0;
    } else if (personality === "playful") {
      weight += playfulKeywords.some((k) => text.includes(k)) ? 2 : 0;
    } else if (personality === "serious") {
      weight += safeKeywords.some((k) => text.includes(k)) ? 1.5 : 0;
    }
    return Math.max(0.1, weight);
  });
}

export type BotAnswerInput = {
  options: RoundOption[];
  gameType: TogetherGameType;
  personality: BotPersonality;
  correctOptionId?: string;  // for quiz games
  participants?: Participant[]; // for image-vote (to exclude self)
  selfId?: string;
};

export function generateBotAnswer(input: BotAnswerInput): string {
  const { options, gameType, personality, correctOptionId, participants, selfId } = input;

  if (options.length === 0) return "";

  // 초성퀴즈: 40%~80% 정답률 (봇마다 다름)
  if (gameType === "initial-quiz-room" && correctOptionId) {
    const correctRate = 0.4 + Math.random() * 0.4; // 40~80%
    if (Math.random() < correctRate) return correctOptionId;
    // 오답 선택
    const wrongOptions = options.filter((o) => o.id !== correctOptionId);
    if (wrongOptions.length === 0) return correctOptionId;
    return wrongOptions[Math.floor(Math.random() * wrongOptions.length)].id;
  }

  // 친구 맞히기: 랜덤 (약간 편향)
  if (gameType === "friend-quiz") {
    return options[Math.floor(Math.random() * options.length)].id;
  }

  // 이미지 투표: 사람 선택 (자기 자신 제외 가능하게)
  if (gameType === "image-vote" && participants) {
    const votableOptions = selfId ? options.filter((o) => o.id !== selfId) : options;
    if (votableOptions.length === 0) return options[0].id;
    return votableOptions[Math.floor(Math.random() * votableOptions.length)].id;
  }

  // 밸런스, 궁합: 성향 기반
  const weights = personalityWeights(options, personality);
  if (weights.length > 0) {
    return weightedRandom(options, weights);
  }

  return options[Math.floor(Math.random() * options.length)].id;
}

// 봇 딜레이 계산 (700ms ~ 2200ms)
export function getBotDelay(): number {
  return 700 + Math.floor(Math.random() * 1500);
}

// 봇 "선택 중" 메시지
export function getBotThinkingMessage(nickname: string): string {
  const messages = [
    `${nickname}가 고민 중...`,
    `${nickname}이/가 선택하는 중...`,
    `${nickname}가 잠깐 생각 중...`,
    `${nickname}: 음... 🤔`,
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
