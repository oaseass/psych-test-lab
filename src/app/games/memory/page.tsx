import MemoryGame from "@/components/games/MemoryGame";

export default function MemoryPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900">🧠 기억력 테스트</h1>
          <p className="text-gray-500 text-sm mt-1">색깔 순서를 기억하고 따라해 보세요</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <MemoryGame />
        </div>
      </div>
    </div>
  );
}
