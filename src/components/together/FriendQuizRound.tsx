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

export default function FriendQuizRound({ room, round, myParticipantId, onAnswerSubmit, onNextRound }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    setSelected(null);
    setShowResult(false);
    setWaiting(false);
  }, [round.id]);

  const isHost = room.hostId === myParticipantId;
  const host = room.participants.find((p) => p.isHost);

  const handleSelect = (optionId: string) => {
    if (selected || waiting || isHost) return;
    setSelected(optionId);
    setWaiting(true);
    onAnswerSubmit(optionId);
    setTimeout(() => setShowResult(true), 1500);
  };

  const myAnswer = round.answers.find((a) => a.participantId === myParticipantId);
  const myCorrect = !isHost && myAnswer?.answerId === round.hostAnswerId;

  const correctOption = round.options.find((o) => o.id === round.hostAnswerId);

  const getAnswerCount = (optionId: string) =>
    round.answers.filter((a) => a.answerId === optionId && a.participantId !== room.hostId).length;

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
        <div className="max-w-md mx-auto space-y-5">
          <RoundProgress current={room.currentRound} total={room.totalRounds} />
          <div className="text-center">
            <div className="text-5xl mb-2">{myCorrect ? "🎉" : isHost ? "😊" : "😅"}</div>
            <h2 className="text-lg font-black text-gray-900 mb-1">{round.question}</h2>
            {!isHost && (
              <div className={`inline-block text-sm px-4 py-1.5 rounded-full font-bold ${
                myCorrect ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
              }`}>
                {myCorrect ? "정답! +10점 🎯" : "틀렸어요..."}
              </div>
            )}
          </div>

          <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-4 text-center">
            <p className="text-xs text-green-600 font-semibold mb-1">
              {host?.nickname || "방장"}의 실제 답변
            </p>
            <p className="text-xl font-black text-green-800">
              {host?.emoji} {correctOption?.text || "?"}
            </p>
          </div>

          <div className="space-y-2">
            {round.options.map((opt) => {
              const count = getAnswerCount(opt.id);
              const isCorrectOpt = opt.id === round.hostAnswerId;
              const isMine = myAnswer?.answerId === opt.id;
              return (
                <div
                  key={opt.id}
                  className={`p-3 rounded-xl border-2
                    ${isCorrectOpt ? "border-green-400 bg-green-50" : isMine ? "border-red-300 bg-red-50" : "border-gray-100 bg-white"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{opt.text}</span>
                      {isCorrectOpt && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">방장 답변 ✓</span>}
                      {isMine && !isCorrectOpt && <span className="text-xs bg-red-400 text-white px-2 py-0.5 rounded-full font-bold">내 선택</span>}
                    </div>
                    <span className="text-xs text-gray-500">{count}명</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 정답자 목록 */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-2">이 라운드 정답자</p>
            <div className="flex gap-2 flex-wrap">
              {round.answers
                .filter((a) => a.answerId === round.hostAnswerId && a.participantId !== room.hostId)
                .map((a) => {
                  const p = room.participants.find((p) => p.id === a.participantId);
                  if (!p) return null;
                  return (
                    <span key={a.participantId} className="flex items-center gap-1 bg-green-50 rounded-lg px-2 py-1 text-xs font-semibold text-green-700">
                      {p.emoji} {p.nickname}
                    </span>
                  );
                })}
              {round.answers.filter((a) => a.answerId === round.hostAnswerId && a.participantId !== room.hostId).length === 0 && (
                <span className="text-xs text-gray-400">정답자 없음</span>
              )}
            </div>
          </div>

          <button
            onClick={onNextRound}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:opacity-90 transition-all"
          >
            {room.currentRound >= room.totalRounds ? "최종 결과 보기 🏆" : "다음 문제 →"}
          </button>
        </div>
      </div>
    );
  }

  if (isHost) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
        <div className="max-w-md mx-auto space-y-5">
          <RoundProgress current={room.currentRound} total={room.totalRounds} />
          <div className="text-center">
            <div className="text-5xl mb-3">👑</div>
            <h2 className="text-xl font-black text-gray-900 mb-2">{round.question}</h2>
            <p className="text-sm text-gray-500 mb-4">방장님의 답변: <strong className="text-green-700">{correctOption?.text}</strong></p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <p className="text-sm text-emerald-700">
                친구들이 당신의 답을 맞히는 중이에요...<br/>
                잠시 기다려주세요! 😄
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowResult(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:opacity-90 transition-all"
          >
            결과 공개하기 →
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
          <div className="text-5xl mb-3">🤔</div>
          <h2 className="text-xl font-black text-gray-900 mb-1">{round.question}</h2>
          <p className="text-sm text-gray-500">
            {host?.emoji} {host?.nickname || "방장"}의 답변을 맞혀보세요!
          </p>
        </div>

        {waiting && !showResult && (
          <div className="text-center">
            <p className="text-sm text-emerald-600 font-medium animate-pulse">🤖 AI 친구들이 선택 중...</p>
          </div>
        )}

        <div className="space-y-2">
          {round.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={!!selected}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all
                ${selected === opt.id
                  ? "border-emerald-500 bg-emerald-50 shadow-md"
                  : selected
                    ? "border-gray-100 bg-gray-50 opacity-60"
                    : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md"
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
