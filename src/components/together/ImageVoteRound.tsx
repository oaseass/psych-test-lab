"use client";
import { useState, useEffect } from "react";
import type { TogetherRoom, TogetherRound, Participant } from "@/lib/together/types";
import RoundProgress from "./RoundProgress";

interface Props {
  room: TogetherRoom;
  round: TogetherRound;
  myParticipantId: string;
  onAnswerSubmit: (answerId: string) => void;
  onNextRound: () => void;
}

export default function ImageVoteRound({ room, round, myParticipantId, onAnswerSubmit, onNextRound }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    setSelected(null);
    setShowResult(false);
    setWaiting(false);
  }, [round.id]);

  // 자신을 제외한 참가자 목록
  const votableParticipants: Participant[] = round.options
    .map((opt) => room.participants.find((p) => p.id === opt.id))
    .filter(Boolean) as Participant[];

  const handleVote = (participantId: string) => {
    if (selected || waiting) return;
    setSelected(participantId);
    setWaiting(true);
    onAnswerSubmit(participantId);
    setTimeout(() => setShowResult(true), 1500);
  };

  // 결과 집계
  const voteCounts: Record<string, number> = {};
  round.answers.forEach((a) => {
    voteCounts[a.answerId] = (voteCounts[a.answerId] ?? 0) + 1;
  });
  const maxVotes = Math.max(0, ...Object.values(voteCounts));
  const topVotedId = Object.entries(voteCounts).find(([, v]) => v === maxVotes)?.[0];
  const totalVotes = Object.values(voteCounts).reduce((a, b) => a + b, 0);

  const myAnswer = round.answers.find((a) => a.participantId === myParticipantId);

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
        <div className="max-w-md mx-auto space-y-5">
          <RoundProgress current={room.currentRound} total={room.totalRounds} />
          <div className="text-center">
            <div className="text-5xl mb-3">🗳️</div>
            <h2 className="text-xl font-black text-gray-900 mb-1">{round.question}</h2>
            <p className="text-sm text-gray-500">투표 결과</p>
          </div>
          <div className="space-y-3">
            {votableParticipants
              .sort((a, b) => (voteCounts[b.id] ?? 0) - (voteCounts[a.id] ?? 0))
              .map((participant) => {
                const count = voteCounts[participant.id] ?? 0;
                const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                const isTop = participant.id === topVotedId && count > 0;
                return (
                  <div
                    key={participant.id}
                    className={`p-4 rounded-2xl border-2 transition-all
                      ${isTop ? "border-pink-400 bg-pink-50" : "border-gray-100 bg-white"}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{participant.emoji}</span>
                      <span className="font-bold text-gray-900">{participant.nickname}</span>
                      {isTop && <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full font-bold">최다 득표 🏆</span>}
                      {myAnswer?.answerId === participant.id && (
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-bold">내 선택 ✓</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-600 w-12 text-right">
                        {count}표 ({pct}%)
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          <button
            onClick={onNextRound}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold text-lg hover:opacity-90 transition-all"
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
          <div className="text-5xl mb-3">🗳️</div>
          <h2 className="text-xl font-black text-gray-900 px-2">{round.question}</h2>
          <p className="text-sm text-gray-500 mt-1">한 명을 선택해주세요</p>
        </div>

        {waiting && !showResult && (
          <div className="text-center py-2">
            <p className="text-sm text-violet-600 font-medium animate-pulse">🤖 AI 친구들이 선택 중...</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {votableParticipants.map((participant) => (
            <button
              key={participant.id}
              onClick={() => handleVote(participant.id)}
              disabled={!!selected}
              className={`p-4 rounded-2xl border-2 text-center transition-all
                ${selected === participant.id
                  ? "border-pink-500 bg-pink-50 shadow-md"
                  : selected
                    ? "border-gray-100 bg-gray-50 opacity-50"
                    : "border-gray-100 bg-white hover:border-pink-300 hover:shadow-md hover:-translate-y-0.5"
                }`}
            >
              <div className="text-3xl mb-2">{participant.emoji}</div>
              <div className="font-semibold text-sm text-gray-800">{participant.nickname}</div>
              {participant.isHost && (
                <div className="text-xs text-yellow-600 mt-1">방장</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
