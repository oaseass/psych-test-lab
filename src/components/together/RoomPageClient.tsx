"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { TogetherRoom, TogetherGameType } from "@/lib/together/types";
import {
  getRoom,
  getMyParticipantId,
  joinRoom,
  submitAnswer,
  computeBotAnswers,
  nextRound,
  finishRoom,
} from "@/lib/together/roomService";
import RoomLobby from "./RoomLobby";
import ImageVoteRound from "./ImageVoteRound";
import BalanceRoomRound from "./BalanceRoomRound";
import InitialQuizRoomRound from "./InitialQuizRoomRound";
import CompatibilityRoomRound from "./CompatibilityRoomRound";
import FriendQuizRound from "./FriendQuizRound";
import MissionRouletteRound from "./MissionRouletteRound";

interface Props {
  roomCode: string;
}

const ROUND_COMPONENTS: Record<TogetherGameType, React.ComponentType<{
  room: TogetherRoom;
  round: NonNullable<TogetherRoom["rounds"][number]>;
  myParticipantId: string;
  onAnswerSubmit: (answerId: string, targetId?: string) => void;
  onNextRound: () => void;
}>> = {
  "image-vote": ImageVoteRound,
  "balance-room": BalanceRoomRound,
  "initial-quiz-room": InitialQuizRoomRound,
  "compatibility-room": CompatibilityRoomRound,
  "friend-quiz": FriendQuizRound,
  "mission-roulette": MissionRouletteRound,
};

export default function RoomPageClient({ roomCode }: Props) {
  const router = useRouter();
  const [room, setRoom] = useState<TogetherRoom | null>(null);
  const [myId, setMyId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [joinNickname, setJoinNickname] = useState("");
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState("");

  const loadRoom = useCallback(() => {
    const r = getRoom(roomCode);
    const id = getMyParticipantId(roomCode);
    setRoom(r);
    setMyId(id ?? "");
    setLoading(false);
  }, [roomCode]);

  useEffect(() => {
    loadRoom();
  }, [loadRoom]);

  // 방이 playing 상태일 때 주기적으로 폴링 (봇 답변 확인용)
  useEffect(() => {
    if (!room || room.status !== "playing") return;
    const timer = setInterval(() => {
      const updated = getRoom(roomCode);
      if (updated) setRoom(updated);
    }, 2000);
    return () => clearInterval(timer);
  }, [room?.status, roomCode]);

  const handleRoomUpdate = (updated: TogetherRoom) => {
    setRoom(updated);
  };

  const handleAnswerSubmit = (answerId: string, targetId?: string) => {
    if (!room || !myId) return;
    const currentRound = room.rounds[room.currentRound - 1];
    if (!currentRound) return;

    // 내 답변 저장
    let updated = submitAnswer(room.roomCode, currentRound.id, myId, answerId, targetId);
    if (!updated) return;

    // 봇 답변 동기적으로 계산
    updated = computeBotAnswers(room.roomCode, currentRound.id) ?? updated;
    setRoom(updated);
  };

  const handleNextRound = () => {
    if (!room) return;

    if (room.currentRound >= room.totalRounds) {
      // 게임 종료
      const finished = finishRoom(room.roomCode);
      if (finished) {
        setRoom(finished);
        router.push(`/together/room/${roomCode}/result`);
      }
      return;
    }

    const updated = nextRound(room.roomCode);
    if (updated) {
      if (updated.status === "finished") {
        setRoom(updated);
        router.push(`/together/room/${roomCode}/result`);
      } else {
        setRoom(updated);
      }
    }
  };

  const handleJoin = () => {
    if (!joinNickname.trim()) {
      setJoinError("닉네임을 입력해주세요");
      return;
    }
    setJoining(true);
    const participant = joinRoom(roomCode, joinNickname.trim());
    if (!participant) {
      setJoinError("참여에 실패했습니다. 방이 가득 찼거나 이미 시작된 게임일 수 있어요.");
      setJoining(false);
      return;
    }
    setMyId(participant.id);
    loadRoom();
    setJoining(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-bounce">🎮</div>
          <p className="text-gray-600">방 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-xl font-black text-gray-900 mb-2">방을 찾을 수 없어요</h1>
          <p className="text-gray-500 mb-6">방 코드 <strong>{roomCode}</strong>에 해당하는 방이 없습니다.</p>
          <button
            onClick={() => router.push("/together")}
            className="px-6 py-3 rounded-2xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition-all"
          >
            같이놀기 홈으로
          </button>
        </div>
      </div>
    );
  }

  // 참가자가 아닌 경우 참여 폼 표시
  const isParticipant = myId && room.participants.some((p) => p.id === myId);
  if (!isParticipant) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">👋</div>
            <h1 className="text-xl font-black text-gray-900">{room.title}</h1>
            <p className="text-gray-500 mt-1">방 코드: <strong>{roomCode}</strong></p>
          </div>

          {room.status !== "lobby" ? (
            <div className="text-center">
              <p className="text-gray-500">이미 시작된 게임이에요.</p>
              <button
                onClick={() => router.push("/together")}
                className="mt-4 px-6 py-3 rounded-2xl bg-violet-600 text-white font-bold"
              >
                다른 방 만들기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={joinNickname}
                onChange={(e) => setJoinNickname(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                placeholder="닉네임 입력"
                maxLength={10}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-violet-400 text-gray-900"
              />
              {joinError && <p className="text-sm text-red-500">{joinError}</p>}
              <button
                onClick={handleJoin}
                disabled={joining}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {joining ? "참여 중..." : "🎮 게임 참여하기"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 로비
  if (room.status === "lobby") {
    return (
      <RoomLobby
        room={room}
        myParticipantId={myId}
        onRoomUpdate={handleRoomUpdate}
      />
    );
  }

  // 게임 완료 시 결과 페이지로 리디렉트
  if (room.status === "finished") {
    router.push(`/together/room/${roomCode}/result`);
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">🎉</div>
          <p className="text-gray-600">결과 페이지로 이동 중...</p>
        </div>
      </div>
    );
  }

  // 게임 중 - 현재 라운드 렌더링
  const currentRound = room.rounds[room.currentRound - 1];
  if (!currentRound) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">라운드 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const RoundComponent = ROUND_COMPONENTS[room.gameType];

  return (
    <RoundComponent
      room={room}
      round={currentRound}
      myParticipantId={myId}
      onAnswerSubmit={handleAnswerSubmit}
      onNextRound={handleNextRound}
    />
  );
}
