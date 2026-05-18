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

export default function InitialQuizRoomRound({ room, round, myParticipantId, onAnswerSubmit, onNextRound }: Props) {
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

  const isCorrect = (optionId: string) => optionId === round.correctOptionId;
  const myAnswer = round.answers.find((a) => a.participantId === myParticipantId);
  const myCorrect = myAnswer?.answerId === round.correctOptionId;

  const getAnswerCount = (optionId: string) =>
    round.answers.filter((a) => a.answerId === optionId).length;

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
        <div className="max-w-md mx-auto space-y-5">
          <RoundProgress current={room.currentRound} total={room.totalRounds} />
          <div className="text-center">
            <div className="text-5xl mb-2">{myCorrect ? "🎉" : "😅"}</div>
            <h2 className="text-xl font-black text-gray-900 mb-1">{round.question}</h2>
            <div className={`inline-block text-sm px-4 py-1.5 rounded-full font-bold ${
              myCorrect
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {myCorrect ? "정답! +10점 🎯" : "오답..."}
            </div>
          </div>

          <div className="space-y-2">
            {round.options.map((opt) => {
              const count = getAnswerCount(opt.id);
              const correct = isCorrect(opt.id);
              const isMine = myAnswer?.answerId === opt.id;
              return (
                <div
                  key={opt.id}
                  className={`p-4 rounded-2xl border-2 transition-all
                    ${correct ? "border-green-400 bg-green-50" : isMine ? "border-red-300 bg-red-50" : "border-gray-100 bg-white"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{opt.text}</span>
                      {correct && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">정답 ✓</span>}
                      {isMine && !correct && <span className="text-xs bg-red-400 text-white px-2 py-0.5 rounded-full font-bold">내 선택</span>}
                      {isMine && correct && <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-bold">내 선택 ✓</span>}
                    </div>
                    <span className="text-sm font-bold text-gray-500">{count}명</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 순위 */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-2">이 라운드 정답자</p>
            <div className="flex gap-2 flex-wrap">
              {round.answers.filter((a) => a.answerId === round.correctOptionId).map((a) => {
                const p = room.participants.find((p) => p.id === a.participantId);
                if (!p) return null;
                return (
                  <span key={a.participantId} className="flex items-center gap-1 bg-green-50 rounded-lg px-2 py-1 text-xs font-semibold text-green-700">
                    {p.emoji} {p.nickname}
                  </span>
                );
              })}
              {round.answers.filter((a) => a.answerId === round.correctOptionId).length === 0 && (
                <span className="text-xs text-gray-400">정답자 없음</span>
              )}
            </div>
          </div>

          <button
            onClick={onNextRound}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-lg hover:opacity-90 transition-all"
          >
            {room.currentRound >= room.totalRounds ? "최종 결과 보기 🏆" : "다음 문제 →"}
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
          <div className="text-5xl mb-2">🔤</div>
          <h2 className="text-2xl font-black text-orange-600 mb-2">{round.question}</h2>
          <p className="text-sm text-gray-500">정답을 선택하세요!</p>
        </div>

        {waiting && !showResult && (
          <div className="text-center">
            <p className="text-sm text-orange-600 font-medium animate-pulse">🤖 AI 친구들이 선택 중...</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {round.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={!!selected}
              className={`p-4 rounded-2xl border-2 text-center transition-all
                ${selected === opt.id
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : selected
                    ? "border-gray-100 bg-gray-50 opacity-60"
                    : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-md"
                }`}
            >
              <span className="font-bold text-gray-900">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
