import type { Metadata } from "next";
import Link from "next/link";
import CreateRoomForm from "@/components/together/CreateRoomForm";

export const metadata: Metadata = {
  title: "방 만들기 | 같이놀기 | 심심풀이 연구소",
  description: "같이놀기 게임 방을 만들어보세요. AI 봇과 함께 혼자서도 즐겁게!",
};

export default function CreateRoomPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <Link href="/together" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
            ← 같이놀기 홈
          </Link>
        </div>
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎮</div>
          <h1 className="text-2xl font-black text-gray-900">방 만들기</h1>
          <p className="text-gray-500 mt-1 text-sm">게임을 선택하고 방을 만들어보세요!</p>
        </div>
        <CreateRoomForm />
      </div>
    </div>
  );
}
