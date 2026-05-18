import ReactionGame from "@/components/games/ReactionGame";

export default function ReactionPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900">⚡ 반응속도 테스트</h1>
          <p className="text-gray-500 text-sm mt-1">나의 반응속도는 몇 ms?</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <ReactionGame />
        </div>
      </div>
    </div>
  );
}
