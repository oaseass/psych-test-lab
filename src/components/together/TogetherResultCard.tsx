import type { TogetherRoom } from "@/lib/together/types";
import ParticipantList from "./ParticipantList";
import { getCompatibilityResults } from "@/lib/together/roomService";

interface Props {
  room: TogetherRoom;
  myParticipantId: string;
}

export default function TogetherResultCard({ room, myParticipantId }: Props) {
  const gameType = room.gameType;

  if (gameType === "compatibility-room") {
    const results = getCompatibilityResults(room.roomCode);
    const topPair = results[0];
    const myResults = results.filter(
      (r) => r.pair[0].id === myParticipantId || r.pair[1].id === myParticipantId
    );
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-3">💫</div>
          <h2 className="text-2xl font-black text-gray-900">궁합 결과!</h2>
          <p className="text-gray-500 mt-1">총 {room.participants.length}명의 궁합을 분석했어요</p>
        </div>

        {topPair && (
          <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl p-5 border-2 border-violet-200 text-center">
            <p className="text-xs text-violet-600 font-bold mb-2">🏆 최고 궁합 조합</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">{topPair.pair[0].emoji}</span>
              <div>
                <p className="font-black text-gray-900">{topPair.pair[0].nickname}</p>
                <p className="text-xs text-gray-400">×</p>
                <p className="font-black text-gray-900">{topPair.pair[1].nickname}</p>
              </div>
              <span className="text-3xl">{topPair.pair[1].emoji}</span>
            </div>
            <p className="text-3xl font-black text-violet-600 mt-2">{topPair.score}%</p>
            <p className="text-sm text-violet-700">{topPair.label}</p>
          </div>
        )}

        {myResults.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="font-bold text-gray-800 mb-3">내 궁합 현황</p>
            <div className="space-y-2">
              {myResults.map((r, i) => {
                const other = r.pair[0].id === myParticipantId ? r.pair[1] : r.pair[0];
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{other.emoji}</span>
                      <span className="text-sm font-semibold">{other.nickname}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-violet-600">{r.score}%</span>
                      <span className="text-xs text-gray-500">{r.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="font-bold text-gray-800 mb-3">모든 조합 궁합</p>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {r.pair[0].emoji}{r.pair[0].nickname} × {r.pair[1].emoji}{r.pair[1].nickname}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-400 to-pink-400 rounded-full"
                      style={{ width: `${r.score}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-violet-600 w-8">{r.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameType === "image-vote") {
    const voteCounts: Record<string, number> = {};
    room.participants.forEach((p) => (voteCounts[p.id] = 0));
    room.rounds.forEach((round) => {
      round.answers.forEach((a) => {
        voteCounts[a.answerId] = (voteCounts[a.answerId] ?? 0) + 1;
      });
    });
    const sorted = [...room.participants].sort((a, b) => (voteCounts[b.id] ?? 0) - (voteCounts[a.id] ?? 0));

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-3">🗳️</div>
          <h2 className="text-2xl font-black text-gray-900">투표 최종 결과!</h2>
        </div>
        <div className="space-y-3">
          {sorted.map((p, idx) => {
            const count = voteCounts[p.id] ?? 0;
            const isMe = p.id === myParticipantId;
            return (
              <div
                key={p.id}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2
                  ${idx === 0 ? "border-pink-400 bg-pink-50" : isMe ? "border-violet-200 bg-violet-50" : "border-gray-100 bg-white"}`}
              >
                <span className="text-lg font-black text-gray-400 w-6">{idx + 1}</span>
                <span className="text-2xl">{p.emoji}</span>
                <div className="flex-1">
                  <span className="font-bold text-gray-900">{p.nickname}</span>
                  {idx === 0 && count > 0 && <span className="text-xs text-pink-600 ml-2 font-bold">최다 득표 🏆</span>}
                  {isMe && <span className="text-xs text-violet-600 ml-2 font-bold">나</span>}
                </div>
                <span className="text-lg font-black text-gray-700">{count}표</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (gameType === "mission-roulette") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-3">🎰</div>
          <h2 className="text-2xl font-black text-gray-900">미션 완료!</h2>
          <p className="text-gray-500">이번 게임에서의 미션 기록이에요</p>
        </div>
        <div className="space-y-3">
          {room.rounds.map((round) => {
            const target = room.participants.find((p) => p.id === round.targetParticipantId);
            const isMe = round.targetParticipantId === myParticipantId;
            return (
              <div key={round.id} className={`p-4 rounded-2xl border-2 ${isMe ? "border-yellow-400 bg-yellow-50" : "border-gray-100 bg-white"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{target?.emoji}</span>
                  <span className="font-bold text-gray-900">{target?.nickname}</span>
                  {isMe && <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">나 🎯</span>}
                </div>
                <p className="text-sm text-gray-700">{round.missionText}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 점수 기반 게임 (초성퀴즈, 친구맞히기)
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-3">🏆</div>
        <h2 className="text-2xl font-black text-gray-900">최종 결과!</h2>
        <p className="text-gray-500 mt-1">{room.title} 종료</p>
      </div>
      <div className="bg-white rounded-2xl p-4 border border-gray-100">
        <p className="font-bold text-gray-800 mb-3">점수 순위</p>
        <ParticipantList participants={room.participants} myParticipantId={myParticipantId} showScore />
      </div>
      <div className="text-center bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <p className="text-sm text-gray-500">총 {room.totalRounds}라운드 완료!</p>
        <p className="text-xs text-gray-400 mt-1">함께해줘서 고마워요 😊</p>
      </div>
    </div>
  );
}
