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

export default function BalanceRoomRound({ room, round, myParticipantId, onAnswerSubmit, onNextRound }: Props) {
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
    setTimeout(() => setShowResult(true), 1500);
  };

  const optionA = round.options[0];
  const optionB = round.options[1];

  const countA = round.answers.filter((a) => a.answerId === "a").length;
  const countB = round.answers.filter((a) => a.answerId === "b").length;
  const total = round.answers.length;
  const pctA = total > 0 ? Math.round((countA / total) * 100) : 50;
  const pctB = total > 0 ? Math.round((countB / total) * 100) : 50;
  const myAnswer = round.answers.find((a) => a.participantId === myParticipantId);
  const isMinority = myAnswer && (
    (myAnswer.answerId === "a" && countA < countB) ||
    (myAnswer.answerId === "b" && countB < countA)
  );

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
        <div className="max-w-md mx-auto space-y-5">
          <RoundProgress current={room.currentRound} total={room.totalRounds} />
          <div className="text-center">
            <div className="text-4xl mb-2">⚖️</div>
            <h2 className="text-lg font-black text-gray-900 mb-1">{round.question}</h2>
            {isMinority && (
              <span className="inline-block text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
                소수파 클럽 🔥 희귀한 선택!
              </span>
            )}
          </div>

          <div className="space-y-3">
            {[optionA, optionB].map((opt, idx) => {
              const count = idx === 0 ? countA : countB;
              const pct = idx === 0 ? pctA : pctB;
              const isMine = myAnswer?.answerId === opt.id;
              const isMajority = count >= (total - count);
              return (
                <div
                  key={opt.id}
                  className={`p-4 rounded-2xl border-2 transition-all
                    ${isMine ? "border-blue-400 bg-blue-50" : "border-gray-100 bg-white"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{opt.text}</span>
                      {isMajority && count > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">다수파</span>
                      )}
                      {isMine && (
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-bold">내 선택 ✓</span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-gray-600">{pct}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{count}명 선택</p>
                </div>
              );
            })}
          </div>

          {/* 참가자별 선택 */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-3">참가자 선택 현황</p>
            <div className="flex gap-2 flex-wrap">
              {room.participants.map((p) => {
                const ans = round.answers.find((a) => a.participantId === p.id);
                const choice = ans ? (ans.answerId === "a" ? optionA.text : optionB.text) : "미선택";
                return (
                  <div key={p.id} className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2 py-1.5">
                    <span>{p.emoji}</span>
                    <span className="text-xs text-gray-600">{p.nickname}</span>
                    <span className={`text-xs font-bold ${ans?.answerId === "a" ? "text-blue-600" : "text-purple-600"}`}>
                      {choice.length > 5 ? choice.slice(0, 5) + "..." : choice}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={onNextRound}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-bold text-lg hover:opacity-90 transition-all"
          >
            {room.currentRound >= room.totalRounds ? "결과 보기 🎉" : "다음 라운드 →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
      <div className="max-w-md mx-auto space-y-5">
        <RoundProgress current={room.currentRound} total={room.totalRounds} />
        <div className="text-center">
          <div className="text-4xl mb-2">⚖️</div>
          <h2 className="text-xl font-black text-gray-900">{round.question}</h2>
          <p className="text-sm text-gray-500 mt-1">둘 중 하나를 선택하세요!</p>
        </div>

        {waiting && !showResult && (
          <div className="text-center">
            <p className="text-sm text-blue-600 font-medium animate-pulse">🤖 AI 친구들이 고민 중...</p>
          </div>
        )}

        <div className="space-y-3">
          {[optionA, optionB].map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={!!selected}
              className={`w-full p-5 rounded-2xl border-2 text-left transition-all
                ${selected === opt.id
                  ? "border-blue-500 bg-blue-50 shadow-lg"
                  : selected
                    ? "border-gray-100 bg-gray-50 opacity-60"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5"
                }`}
            >
              <div className="font-bold text-gray-900 text-base">{opt.text}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
