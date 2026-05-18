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

export default function CompatibilityRoomRound({ room, round, myParticipantId, onAnswerSubmit, onNextRound }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    setSelected(null);
    setShowResult(false);
    setWaiting(false);
  }, [round.id]);

  const handleSelect = (optionId: string) => {
    if (selected || waiting) return;
    setSelected(optionId);
    setWaiting(true);
    onAnswerSubmit(optionId);
    setTimeout(() => setShowResult(true), 1200);
  };

  const optionA = round.options[0];
  const optionB = round.options[1];
  const countA = round.answers.filter((a) => a.answerId === "a").length;
  const countB = round.answers.filter((a) => a.answerId === "b").length;
  const total = round.answers.length;
  const myAnswer = round.answers.find((a) => a.participantId === myParticipantId);

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
        <div className="max-w-md mx-auto space-y-5">
          <RoundProgress current={room.currentRound} total={room.totalRounds} label={`${room.currentRound}/5 번째 질문`} />
          <div className="text-center">
            <div className="text-4xl mb-2">💫</div>
            <h2 className="text-lg font-black text-gray-900">{round.question}</h2>
            <p className="text-xs text-gray-400 mt-1">모든 답변이 공개됩니다</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[optionA, optionB].map((opt, idx) => {
              const count = idx === 0 ? countA : countB;
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              const isMine = myAnswer?.answerId === opt.id;
              return (
                <div
                  key={opt.id}
                  className={`p-4 rounded-2xl border-2 text-center
                    ${isMine ? "border-violet-400 bg-violet-50" : "border-gray-100 bg-white"}`}
                >
                  <div className="font-bold text-gray-900 mb-2">{opt.text}</div>
                  <div className="text-2xl font-black text-violet-600">{pct}%</div>
                  <div className="text-xs text-gray-500">{count}명</div>
                  {isMine && <div className="text-xs text-violet-700 font-bold mt-1">내 선택 ✓</div>}
                </div>
              );
            })}
          </div>

          {/* 참가자별 답변 */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-3">참가자 답변 현황</p>
            <div className="space-y-2">
              {room.participants.map((p) => {
                const ans = round.answers.find((a) => a.participantId === p.id);
                const choice = ans
                  ? (ans.answerId === "a" ? optionA?.text : optionB?.text)
                  : "미답변";
                return (
                  <div key={p.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{p.emoji}</span>
                      <span className="text-sm text-gray-700">{p.nickname}</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg
                      ${ans?.answerId === "a" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                      {choice}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {room.currentRound < room.totalRounds ? (
            <button
              onClick={onNextRound}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold text-lg hover:opacity-90 transition-all"
            >
              다음 질문 →
            </button>
          ) : (
            <button
              onClick={onNextRound}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold text-lg hover:opacity-90 transition-all"
            >
              궁합 결과 보기 💫
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
      <div className="max-w-md mx-auto space-y-5">
        <RoundProgress current={room.currentRound} total={room.totalRounds} label={`${room.currentRound}/5 번째 질문`} />
        <div className="text-center">
          <div className="text-4xl mb-2">💫</div>
          <h2 className="text-xl font-black text-gray-900">{round.question}</h2>
          <p className="text-sm text-gray-500 mt-1">솔직하게 선택해주세요</p>
        </div>

        {waiting && !showResult && (
          <div className="text-center">
            <p className="text-sm text-violet-600 font-medium animate-pulse">🤖 AI 친구들이 선택 중...</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {[optionA, optionB].map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={!!selected}
              className={`p-5 rounded-2xl border-2 text-center transition-all
                ${selected === opt.id
                  ? "border-violet-500 bg-violet-50 shadow-lg"
                  : selected
                    ? "border-gray-100 bg-gray-50 opacity-60"
                    : "border-gray-200 bg-white hover:border-violet-300 hover:shadow-md"
                }`}
            >
              <div className="font-bold text-gray-900">{opt.text}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
