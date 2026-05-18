"use client";
import { useState } from "react";
import type { TogetherRoom } from "@/lib/together/types";
import { startRoom, addBot, removeBot } from "@/lib/together/roomService";
import ParticipantList from "./ParticipantList";
import RoomShareBox from "./RoomShareBox";

interface Props {
  room: TogetherRoom;
  myParticipantId: string;
  onRoomUpdate: (room: TogetherRoom) => void;
}

export default function RoomLobby({ room, myParticipantId, onRoomUpdate }: Props) {
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const isHost = room.hostId === myParticipantId;
  const humanCount = room.participants.filter((p) => p.type === "human").length;
  const botCount = room.participants.filter((p) => p.type === "bot").length;
  const canStart = room.participants.length >= room.minPlayers;

  const handleStart = () => {
    setError("");
    if (!canStart) {
      setError(`최소 ${room.minPlayers}명이 필요합니다.`);
      return;
    }
    setStarting(true);
    const updated = startRoom(room.roomCode);
    if (updated) {
      onRoomUpdate(updated);
    } else {
      setError("게임 시작에 실패했습니다.");
      setStarting(false);
    }
  };

  const handleAddBot = () => {
    if (room.participants.length >= room.maxPlayers) return;
    const updated = addBot(room.roomCode);
    if (updated) onRoomUpdate(updated);
  };

  const handleRemoveBot = () => {
    if (botCount === 0) return;
    const updated = removeBot(room.roomCode);
    if (updated) onRoomUpdate(updated);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
      <div className="max-w-md mx-auto space-y-5">
        {/* 헤더 */}
        <div className="text-center">
          <div className="text-4xl mb-2">🎮</div>
          <h1 className="text-2xl font-black text-gray-900">{room.title}</h1>
          <p className="text-sm text-gray-500 mt-1">참가자들이 들어오길 기다리는 중...</p>
        </div>

        {/* 공유 박스 */}
        <RoomShareBox roomCode={room.roomCode} />

        {/* 참가자 목록 */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">
              참가자 {room.participants.length}/{room.maxPlayers}
            </h2>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>👤 {humanCount}명</span>
              {botCount > 0 && <span>· 🤖 {botCount}명</span>}
            </div>
          </div>
          <ParticipantList participants={room.participants} myParticipantId={myParticipantId} />
        </div>

        {/* AI 봇 관리 (방장만) */}
        {isHost && (
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-3">🤖 AI 친구 관리</h3>
            <p className="text-xs text-gray-400 mb-3">
              혼자 와도 AI 친구가 함께 놀아드려요. AI는 절대 진짜 사람처럼 속이지 않아요.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleRemoveBot}
                disabled={botCount === 0}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-all"
              >
                − AI 빼기
              </button>
              <button
                onClick={handleAddBot}
                disabled={room.participants.length >= room.maxPlayers}
                className="flex-1 py-2 rounded-xl bg-violet-50 border border-violet-200 text-sm font-semibold text-violet-700 hover:bg-violet-100 disabled:opacity-40 transition-all"
              >
                + AI 추가
              </button>
            </div>
          </div>
        )}

        {/* 게임 시작 */}
        {isHost && (
          <div>
            {error && (
              <p className="text-sm text-red-500 text-center mb-2">{error}</p>
            )}
            {!canStart && (
              <p className="text-sm text-gray-400 text-center mb-2">
                최소 {room.minPlayers}명 필요 (현재 {room.participants.length}명)
              </p>
            )}
            <button
              onClick={handleStart}
              disabled={!canStart || starting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {starting ? "시작하는 중..." : "🚀 게임 시작!"}
            </button>
          </div>
        )}

        {!isHost && (
          <div className="text-center py-4">
            <div className="text-3xl mb-2 animate-bounce">⏳</div>
            <p className="text-gray-600 font-medium">방장이 게임을 시작하기를 기다리는 중...</p>
          </div>
        )}
      </div>
    </div>
  );
}
