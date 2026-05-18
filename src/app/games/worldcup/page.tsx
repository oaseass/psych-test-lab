import Link from "next/link";
import { worldcupList } from "@/data/games/worldcupData";

export default function WorldcupListPage() {
  const featured = worldcupList.filter((w) => w.isFeatured);
  const rest = worldcupList.filter((w) => !w.isFeatured);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900">🏆 이상형 월드컵</h1>
          <p className="text-gray-500 text-sm mt-1">토너먼트로 나의 진짜 이상형 찾기</p>
        </div>

        {featured.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-500 mb-3">🔥 인기 월드컵</h2>
            <div className="flex flex-col gap-3">
              {featured.map((w) => (
                <WorldcupCard key={w.id} data={w} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-sm font-bold text-gray-500 mb-3">전체 목록</h2>
          <div className="flex flex-col gap-3">
            {rest.map((w) => (
              <WorldcupCard key={w.id} data={w} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function WorldcupCard({ data }: { data: (typeof worldcupList)[0] }) {
  return (
    <Link href={`/games/worldcup/${data.slug}`}>
      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: data.bgColor }}
        >
          {data.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-sm">{data.title}</span>
            {data.isNew && (
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold">NEW</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{data.description}</p>
          {data.playCount && (
            <p className="text-xs text-gray-400 mt-1">👥 {data.playCount.toLocaleString()}명 참여</p>
          )}
        </div>
        <span className="text-gray-300">›</span>
      </div>
    </Link>
  );
}
