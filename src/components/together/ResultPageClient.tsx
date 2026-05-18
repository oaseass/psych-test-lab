"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { TogetherRoom } from "@/lib/together/types";
import { getRoom, getMyParticipantId } from "@/lib/together/roomService";
import TogetherResultCard from "./TogetherResultCard";

interface Props {
  roomCode: string;
}

export default function ResultPageClient({ roomCode }: Props) {
  const router = useRouter();
  const [room, setRoom] = useState<TogetherRoom | null>(null);
  const [myId, setMyId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const r = getRoom(roomCode);
    const id = getMyParticipantId(roomCode);
    setRoom(r);
    setMyId(id ?? "");
    setLoading(false);
  }, [roomCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎉</div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-3">😕</div>
          <p className="text-gray-600 mb-4">결과를 불러올 수 없어요</p>
          <Link href="/together" className="px-6 py-3 rounded-2xl bg-violet-600 text-white font-bold">
            같이놀기 홈으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
      <div className="max-w-md mx-auto">
        <TogetherResultCard room={room} myParticipantId={myId} />

        <div className="mt-8 space-y-3">
          <button
            onClick={() => router.push("/together/create")}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold text-lg hover:opacity-90 transition-all"
          >
            🎮 새 게임 만들기
          </button>
          <Link
            href="/together"
            className="block w-full py-3 rounded-2xl border-2 border-gray-200 text-center text-gray-700 font-semibold hover:border-violet-300 transition-all"
          >
            같이놀기 홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
