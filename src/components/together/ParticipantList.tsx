// ParticipantList - 참가자 목록 표시
import type { Participant } from "@/lib/together/types";
import BotBadge from "./BotBadge";

interface Props {
  participants: Participant[];
  myParticipantId?: string;
  showScore?: boolean;
}

export default function ParticipantList({ participants, myParticipantId, showScore = false }: Props) {
  const sorted = showScore
    ? [...participants].sort((a, b) => b.score - a.score)
    : participants;

  return (
    <ul className="space-y-2">
      {sorted.map((p, idx) => (
        <li
          key={p.id}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all
            ${p.id === myParticipantId
              ? "bg-violet-50 border-violet-300"
              : "bg-white border-gray-100"
            }`}
        >
          {showScore && (
            <span className="text-sm font-bold text-gray-400 w-5 text-center">{idx + 1}</span>
          )}
          <span className="text-xl">{p.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-gray-800 truncate">
                {p.nickname}
              </span>
              {p.id === myParticipantId && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 font-bold">나</span>
              )}
              {p.isHost && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700 font-bold">방장</span>
              )}
              {p.type === "bot" && <BotBadge size="xs" />}
            </div>
          </div>
          {showScore && (
            <span className="text-sm font-bold text-violet-600">{p.score}점</span>
          )}
        </li>
      ))}
    </ul>
  );
}
