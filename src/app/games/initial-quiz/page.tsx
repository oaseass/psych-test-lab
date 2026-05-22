import Link from "next/link";
import { initialQuizList } from "@/data/games/initialQuizData";

export default function InitialQuizListPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900">🔤 초성 퀴즈</h1>
          <p className="text-gray-500 text-sm mt-1">초성만 보고 단어 맞히기</p>
        </div>

        <div className="flex flex-col gap-3">
          {initialQuizList.map((q) => (
            <Link key={q.id} href={`/games/initial-quiz/${q.slug}`}>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: q.bgColor }}
                >
                  {q.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{q.title}</span>
                    {q.isNew && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">NEW</span>
                    )}
                    {q.isFeatured && !q.isNew && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">인기</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{q.description}</p>
                </div>
                <span className="text-gray-300">›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
