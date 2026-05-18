// ================================================
// localStorage 기반 방 서비스
// 추후 Supabase Realtime 마이그레이션 예정
//
// localStorage keys:
//   sslab_together_room_${roomCode}  → TogetherRoom JSON
//   sslab_together_me_${roomCode}    → participantId string
// ================================================
import type {
  TogetherRoom,
  TogetherRound,
  Participant,
  RoundAnswer,
  CreateRoomInput,
  TogetherGameType,
} from "@/lib/together/types";
import { createBot, generateBotAnswer } from "@/lib/together/botEngine";
import {
  TOGETHER_GAMES,
  IMAGE_VOTE_QUESTIONS,
  BALANCE_ROOM_PAIRS,
  INITIAL_QUIZ_QUESTIONS,
  COMPATIBILITY_QUESTIONS,
  FRIEND_QUIZ_QUESTIONS,
  MISSION_ROULETTE_MISSIONS,
} from "@/data/together/togetherGames";

// ─── helpers ───
const ROOM_KEY = (code: string) => `sslab_together_room_${code}`;
const MY_ID_KEY = (code: string) => `sslab_together_me_${code}`;
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateRoomCode(): string {
  return Array.from({ length: 6 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join("");
}

function generateId(): string {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

// ─── 라운드 생성 ───
function generateRounds(room: TogetherRoom): TogetherRound[] {
  const { gameType, totalRounds, roomCode, participants } = room;
  const rounds: TogetherRound[] = [];

  if (gameType === "image-vote") {
    const questions = pickRandom(IMAGE_VOTE_QUESTIONS, totalRounds);
    const participantOptions = participants.map((p) => ({ id: p.id, text: p.nickname, emoji: p.emoji }));
    for (let i = 0; i < totalRounds; i++) {
      rounds.push({
        id: generateId(),
        roomCode,
        roundNumber: i + 1,
        question: questions[i],
        options: shuffle(participantOptions),
        answers: [],
      });
    }
  } else if (gameType === "balance-room") {
    const pairs = pickRandom(BALANCE_ROOM_PAIRS, totalRounds);
    for (let i = 0; i < totalRounds; i++) {
      const pair = pairs[i];
      rounds.push({
        id: generateId(),
        roomCode,
        roundNumber: i + 1,
        question: `${pair.emoji} 둘 중 하나를 골라야 한다면?`,
        options: [
          { id: "a", text: pair.optionA, emoji: "🅰️" },
          { id: "b", text: pair.optionB, emoji: "🅱️" },
        ],
        answers: [],
      });
    }
  } else if (gameType === "initial-quiz-room") {
    const questions = pickRandom(INITIAL_QUIZ_QUESTIONS, totalRounds);
    for (let i = 0; i < totalRounds; i++) {
      const q = questions[i];
      const shuffledOptions = shuffle(q.options);
      const correctIdx = shuffledOptions.indexOf(q.correctAnswer);
      const optionIds = ["opt_0", "opt_1", "opt_2", "opt_3"];
      rounds.push({
        id: generateId(),
        roomCode,
        roundNumber: i + 1,
        question: `[${q.category}] ${q.question}`,
        options: shuffledOptions.map((text, idx) => ({ id: optionIds[idx], text })),
        answers: [],
        correctOptionId: optionIds[correctIdx],
      });
    }
  } else if (gameType === "compatibility-room") {
    // 궁합방: 항상 5문제
    const questions = COMPATIBILITY_QUESTIONS.slice(0, 5);
    for (let i = 0; i < 5; i++) {
      const q = questions[i];
      rounds.push({
        id: generateId(),
        roomCode,
        roundNumber: i + 1,
        question: q.question,
        options: [
          { id: "a", text: q.optionA, emoji: "🅰️" },
          { id: "b", text: q.optionB, emoji: "🅱️" },
        ],
        answers: [],
      });
    }
  } else if (gameType === "friend-quiz") {
    const hostParticipant = participants.find((p) => p.id === room.hostId);
    const questions = pickRandom(FRIEND_QUIZ_QUESTIONS, totalRounds);
    for (let i = 0; i < totalRounds; i++) {
      const q = questions[i];
      const shuffledOptions = shuffle(q.options);
      const optionIds = ["fq_0", "fq_1", "fq_2", "fq_3"];
      // 방장 답변: 무작위 (실제로는 방장이 미리 설정한 것처럼)
      const hostAnswerId = optionIds[Math.floor(Math.random() * shuffledOptions.length)];
      rounds.push({
        id: generateId(),
        roomCode,
        roundNumber: i + 1,
        question: `[${hostParticipant?.nickname || "방장"} 관련] ${q.question}`,
        options: shuffledOptions.map((text, idx) => ({ id: optionIds[idx], text })),
        answers: [],
        hostAnswerId,
      });
    }
  } else if (gameType === "mission-roulette") {
    const missions = pickRandom(MISSION_ROULETTE_MISSIONS, totalRounds);
    const shuffledParticipants = shuffle(participants);
    for (let i = 0; i < totalRounds; i++) {
      const target = shuffledParticipants[i % shuffledParticipants.length];
      rounds.push({
        id: generateId(),
        roomCode,
        roundNumber: i + 1,
        question: `${i + 1}번째 미션`,
        options: [],
        answers: [],
        targetParticipantId: target.id,
        missionText: missions[i],
      });
    }
  }

  return rounds;
}

// ─── Public API ───

export function createRoom(input: CreateRoomInput): TogetherRoom | null {
  const storage = getStorage();
  if (!storage) return null;

  const config = TOGETHER_GAMES.find((g) => g.gameType === input.gameType);
  if (!config) return null;

  const roomCode = generateRoomCode();
  const hostId = generateId();

  const host: Participant = {
    id: hostId,
    nickname: input.hostNickname,
    emoji: "👑",
    type: "human",
    joinedAt: new Date().toISOString(),
    isHost: true,
    score: 0,
  };

  const participants: Participant[] = [host];

  // 봇 자동 추가 (허용 시 2~3명)
  if (input.allowBots) {
    const botCount = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < botCount; i++) {
      participants.push(createBot(i));
    }
  }

  const room: TogetherRoom = {
    id: generateId(),
    roomCode,
    gameType: input.gameType,
    title: config.title,
    status: "lobby",
    hostId,
    participants,
    minPlayers: config.minPlayers,
    maxPlayers: config.maxPlayers,
    currentRound: 0,
    totalRounds: input.totalRounds,
    allowBots: input.allowBots,
    botCount: input.allowBots ? participants.filter((p) => p.type === "bot").length : 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rounds: [],
  };

  storage.setItem(ROOM_KEY(roomCode), JSON.stringify(room));
  storage.setItem(MY_ID_KEY(roomCode), hostId);

  return room;
}

export function getRoom(roomCode: string): TogetherRoom | null {
  const storage = getStorage();
  if (!storage) return null;
  const raw = storage.getItem(ROOM_KEY(roomCode));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TogetherRoom;
  } catch {
    return null;
  }
}

export function getMyParticipantId(roomCode: string): string | null {
  const storage = getStorage();
  if (!storage) return null;
  return storage.getItem(MY_ID_KEY(roomCode));
}

function saveRoom(room: TogetherRoom): TogetherRoom {
  const storage = getStorage();
  if (!storage) return room;
  const updated = { ...room, updatedAt: new Date().toISOString() };
  storage.setItem(ROOM_KEY(room.roomCode), JSON.stringify(updated));
  return updated;
}

export function joinRoom(roomCode: string, nickname: string): Participant | null {
  const storage = getStorage();
  if (!storage) return null;

  const room = getRoom(roomCode);
  if (!room || room.status !== "lobby") return null;
  if (room.participants.length >= room.maxPlayers) return null;

  const participant: Participant = {
    id: generateId(),
    nickname,
    emoji: "👤",
    type: "human",
    joinedAt: new Date().toISOString(),
    isHost: false,
    score: 0,
  };

  room.participants.push(participant);
  saveRoom(room);
  storage.setItem(MY_ID_KEY(roomCode), participant.id);
  return participant;
}

export function startRoom(roomCode: string): TogetherRoom | null {
  const room = getRoom(roomCode);
  if (!room) return null;
  if (room.status !== "lobby") return null;
  if (room.participants.length < room.minPlayers) return null;

  const rounds = generateRounds(room);
  const updated = {
    ...room,
    status: "playing" as const,
    currentRound: 1,
    rounds,
  };
  return saveRoom(updated);
}

export function addBot(roomCode: string): TogetherRoom | null {
  const room = getRoom(roomCode);
  if (!room) return null;
  if (room.status !== "lobby") return null;
  if (room.participants.length >= room.maxPlayers) return null;

  const botIndex = room.participants.filter((p) => p.type === "bot").length;
  const bot = createBot(botIndex);
  room.participants.push(bot);
  room.botCount = room.participants.filter((p) => p.type === "bot").length;
  return saveRoom(room);
}

export function removeBot(roomCode: string): TogetherRoom | null {
  const room = getRoom(roomCode);
  if (!room) return null;
  if (room.status !== "lobby") return null;

  const lastBotIdx = [...room.participants].reverse().findIndex((p) => p.type === "bot");
  if (lastBotIdx === -1) return room;
  const actualIdx = room.participants.length - 1 - lastBotIdx;
  room.participants.splice(actualIdx, 1);
  room.botCount = room.participants.filter((p) => p.type === "bot").length;
  return saveRoom(room);
}

export function submitAnswer(
  roomCode: string,
  roundId: string,
  participantId: string,
  answerId: string,
  targetParticipantId?: string
): TogetherRoom | null {
  const room = getRoom(roomCode);
  if (!room) return null;

  const roundIdx = room.rounds.findIndex((r) => r.id === roundId);
  if (roundIdx === -1) return null;

  const round = room.rounds[roundIdx];

  // 중복 답변 방지
  if (round.answers.find((a) => a.participantId === participantId)) return room;

  const answer: RoundAnswer = {
    roundId,
    participantId,
    answerId,
    targetParticipantId,
    createdAt: new Date().toISOString(),
  };

  room.rounds[roundIdx].answers.push(answer);
  return saveRoom(room);
}

export function computeBotAnswers(roomCode: string, roundId: string): TogetherRoom | null {
  const room = getRoom(roomCode);
  if (!room) return null;

  const roundIdx = room.rounds.findIndex((r) => r.id === roundId);
  if (roundIdx === -1) return null;

  const round = room.rounds[roundIdx];
  const bots = room.participants.filter((p) => p.type === "bot");

  for (const bot of bots) {
    // 이미 답변한 봇 건너뜀
    if (round.answers.find((a) => a.participantId === bot.id)) continue;

    // 미션 룰렛은 봇 답변 없음
    if (room.gameType === "mission-roulette") continue;

    const answerId = generateBotAnswer({
      options: round.options,
      gameType: room.gameType,
      personality: bot.botPersonality ?? "random",
      correctOptionId: round.correctOptionId,
      participants: room.participants,
      selfId: bot.id,
    });

    if (answerId) {
      const answer: RoundAnswer = {
        roundId,
        participantId: bot.id,
        answerId,
        createdAt: new Date().toISOString(),
      };
      room.rounds[roundIdx].answers.push(answer);
    }
  }

  return saveRoom(room);
}

export function nextRound(roomCode: string): TogetherRoom | null {
  const room = getRoom(roomCode);
  if (!room) return null;

  if (room.currentRound >= room.totalRounds) {
    // 점수 집계 후 종료
    const updated = calculateFinalScores({ ...room, status: "finished" as const });
    return saveRoom(updated);
  }

  const updated = {
    ...room,
    currentRound: room.currentRound + 1,
  };
  return saveRoom(updated);
}

export function finishRoom(roomCode: string): TogetherRoom | null {
  const room = getRoom(roomCode);
  if (!room) return null;
  const updated = calculateFinalScores({ ...room, status: "finished" as const });
  return saveRoom(updated);
}

// ─── 점수 계산 ───
function calculateFinalScores(room: TogetherRoom): TogetherRoom {
  const { gameType, participants, rounds } = room;

  const scoreMap: Record<string, number> = {};
  participants.forEach((p) => (scoreMap[p.id] = 0));

  if (gameType === "initial-quiz-room") {
    for (const round of rounds) {
      for (const answer of round.answers) {
        if (answer.answerId === round.correctOptionId) {
          scoreMap[answer.participantId] = (scoreMap[answer.participantId] ?? 0) + 10;
        }
      }
    }
  } else if (gameType === "friend-quiz") {
    for (const round of rounds) {
      for (const answer of round.answers) {
        if (answer.participantId !== room.hostId && answer.answerId === round.hostAnswerId) {
          scoreMap[answer.participantId] = (scoreMap[answer.participantId] ?? 0) + 10;
        }
      }
    }
  }

  const updatedParticipants = participants.map((p) => ({
    ...p,
    score: scoreMap[p.id] ?? 0,
  }));

  return { ...room, participants: updatedParticipants };
}

// ─── 궁합 계산 ───
export type CompatibilityResult = {
  pair: [Participant, Participant];
  score: number;
  label: string;
};

export function getCompatibilityResults(roomCode: string): CompatibilityResult[] {
  const room = getRoom(roomCode);
  if (!room) return [];

  const participants = room.participants;
  const results: CompatibilityResult[] = [];

  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const p1 = participants[i];
      const p2 = participants[j];

      let matches = 0;
      let total = 0;

      for (const round of room.rounds) {
        const a1 = round.answers.find((a) => a.participantId === p1.id);
        const a2 = round.answers.find((a) => a.participantId === p2.id);
        if (a1 && a2) {
          total++;
          if (a1.answerId === a2.answerId) matches++;
        }
      }

      const score = total > 0 ? Math.round((matches / total) * 100) : 0;
      const label =
        score >= 80 ? "환상의 궁합 ✨" :
        score >= 60 ? "꽤 잘 맞아요 😊" :
        score >= 40 ? "그럭저럭 😐" :
        "정반대 조합 🔥";

      results.push({ pair: [p1, p2], score, label });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

// ─── 최고/최저 투표 집계 (image-vote) ───
export function getImageVoteResults(roomCode: string): Record<string, number> {
  const room = getRoom(roomCode);
  if (!room) return {};

  const counts: Record<string, number> = {};
  room.participants.forEach((p) => (counts[p.id] = 0));

  for (const round of room.rounds) {
    for (const answer of round.answers) {
      counts[answer.answerId] = (counts[answer.answerId] ?? 0) + 1;
    }
  }

  return counts;
}
