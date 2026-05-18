// ================================================
// 같이놀기 - 타입 정의
// 추후 Supabase Realtime 연결 예정
// ================================================

export type TogetherGameType =
  | "image-vote"
  | "balance-room"
  | "initial-quiz-room"
  | "compatibility-room"
  | "friend-quiz"
  | "mission-roulette";

export type RoomStatus = "lobby" | "playing" | "round-result" | "finished";

export type ParticipantType = "human" | "bot";

export type BotPersonality =
  | "random"
  | "playful"
  | "serious"
  | "bold"
  | "careful"
  | "emotional"
  | "logical";

export type RoundOption = {
  id: string;
  text: string;
  emoji?: string;
};

export type RoundAnswer = {
  roundId: string;
  participantId: string;
  answerId: string;
  targetParticipantId?: string;
  createdAt: string;
};

export type TogetherRound = {
  id: string;
  roomCode: string;
  roundNumber: number;
  question: string;
  options: RoundOption[];
  answers: RoundAnswer[];
  correctOptionId?: string; // initial-quiz-room
  hostAnswerId?: string;    // friend-quiz: 방장의 실제 답
  targetParticipantId?: string; // mission-roulette: 미션 받는 사람
  missionText?: string;    // mission-roulette: 미션 내용
};

export type Participant = {
  id: string;
  nickname: string;
  emoji: string;
  type: ParticipantType;
  botPersonality?: BotPersonality;
  joinedAt: string;
  isHost: boolean;
  score: number;
};

export type TogetherRoom = {
  id: string;
  roomCode: string;
  gameType: TogetherGameType;
  title: string;
  status: RoomStatus;
  hostId: string;
  participants: Participant[];
  minPlayers: number;
  maxPlayers: number;
  currentRound: number;
  totalRounds: number;
  allowBots: boolean;
  botCount: number;
  createdAt: string;
  updatedAt: string;
  rounds: TogetherRound[];
};

export type TogetherGameConfig = {
  gameType: TogetherGameType;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  recommendedPlayers: string;
  estimatedMinutes: number;
  totalRounds: number;
  tags: string[];
  isBotSupported: boolean;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
};

export type CreateRoomInput = {
  gameType: TogetherGameType;
  hostNickname: string;
  totalRounds: number;
  allowBots: boolean;
};
