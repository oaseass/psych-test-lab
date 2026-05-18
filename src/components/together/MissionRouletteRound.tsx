"use client";
import { useState, useEffect } from "react";
import type { TogetherRoom, TogetherRound } from "@/lib/together/types";
import RoundProgress from "./RoundProgress";

interface Props {
  room: TogetherRoom;
  round: TogetherRound;
  myParticipantId: string;
  onAnswerSubmit: (answerId: string) => void;
  onNextRound: () => void;
}

const ROULETTE_COLORS = ["#7C3AED", "#EC4899", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export default function MissionRouletteRound({ room, round, myParticipantId, onAnswerSubmit, onNextRound }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [rotation, setRotation] = useState(0);
  const isHost = room.hostId === myParticipantId;

  useEffect(() => {
    setSpinning(false);
    setRevealed(false);
    setRotation(0);
  }, [round.id]);

  const targetParticipant = room.participants.find((p) => p.id === round.targetParticipantId);
  const isTargeted = round.targetParticipantId === myParticipantId;

  const handleSpin = () => {
    if (spinning || revealed) return;
    setSpinning(true);
    const spins = 1440 + Math.floor(Math.random() * 720);
    setRotation((prev) => prev + spins);
    setTimeout(() => {
      setSpinning(false);
      setRevealed(true);
      onAnswerSubmit("revealed");
    }, 2500);
  };

  if (revealed) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
        <div className="max-w-md mx-auto space-y-5">
          <RoundProgress current={room.currentRound} total={room.totalRounds} />
          <div className="text-center">
            <div className="text-5xl mb-3">🎰</div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">{round.roundNumber}번째 미션!</h2>
          </div>

          {/* 당첨자 */}
          <div
            className={`rounded-3xl p-6 text-center border-4 ${
              isTargeted
                ? "bg-yellow-50 border-yellow-400"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="text-5xl mb-2">{targetParticipant?.emoji || "🎯"}</div>
            <div className="text-xl font-black text-gray-900 mb-1">
              {targetParticipant?.nickname || "?"}
            </div>
            {isTargeted && (
              <span className="inline-block text-sm bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold mb-2">
                당신이 당첨됐어요! 🎉
              </span>
            )}
            <div className="bg-gray-50 rounded-2xl p-4 mt-3">
              <p className="text-xs text-gray-500 mb-1">미션</p>
              <p className="text-lg font-bold text-gray-900">{round.missionText}</p>
            </div>
          </div>

          {/* 참가자 목록 */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500">이번 라운드 참가자</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {room.participants.map((p) => (
                <span
                  key={p.id}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold
                    ${p.id === round.targetParticipantId
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {p.emoji} {p.nickname}
                  {p.id === round.targetParticipantId && " 🎯"}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onNextRound}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg hover:opacity-90 transition-all"
          >
            {room.currentRound >= room.totalRounds ? "미션 완료! 결과 보기 🎊" : "다음 미션 →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <RoundProgress current={room.currentRound} total={room.totalRounds} />
        <div className="text-center">
          <div className="text-4xl mb-2">🎰</div>
          <h2 className="text-xl font-black text-gray-900">{round.roundNumber}번째 미션</h2>
          <p className="text-sm text-gray-500 mt-1">룰렛을 돌려 미션 대상자를 선택해요!</p>
        </div>

        {/* 룰렛 시각화 */}
        <div className="flex justify-center">
          <div className="relative w-56 h-56">
            <div
              className="w-full h-full rounded-full border-8 border-gray-200 overflow-hidden transition-transform"
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionDuration: spinning ? "2.5s" : "0s",
                transitionTimingFunction: "cubic-bezier(0.17, 0.67, 0.12, 0.99)",
              }}
            >
              {room.participants.map((p, i) => {
                const angle = (360 / room.participants.length) * i;
                const color = ROULETTE_COLORS[i % ROULETTE_COLORS.length];
                return (
                  <div
                    key={p.id}
                    className="absolute inset-0 flex items-center justify-center origin-center"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pt-4"
                      style={{ color }}
                    >
                      <span className="text-xl">{p.emoji}</span>
                      <span className="text-[10px] font-bold mt-0.5" style={{ color }}>
                        {p.nickname.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-full shadow-md border-2 border-gray-200" />
              </div>
            </div>
            {/* 화살표 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-2xl">▼</div>
          </div>
        </div>

        {spinning && (
          <div className="text-center">
            <p className="text-violet-600 font-bold animate-pulse">🎰 룰렛 돌아가는 중...</p>
          </div>
        )}

        {(isHost || !revealed) && (
          <button
            onClick={handleSpin}
            disabled={spinning || revealed}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xl hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {spinning ? "돌아가는 중..." : "🎰 룰렛 돌리기!"}
          </button>
        )}

        {!isHost && !spinning && (
          <p className="text-center text-sm text-gray-400">방장이 룰렛을 돌립니다</p>
        )}
      </div>
    </div>
  );
}
