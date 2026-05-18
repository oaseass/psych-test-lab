import ObservationGame from "@/components/games/ObservationGame";

export default function ObservationPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900">👁️ 관찰력 테스트</h1>
          <p className="text-gray-500 text-sm mt-1">숨어있는 다른 것을 찾아라!</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <ObservationGame />
        </div>
      </div>
    </div>
  );
}
