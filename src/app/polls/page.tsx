"use client";
import Link from "next/link";
import { pollList } from "@/data/pollsData";

export default function PollsPage() {
  const hot = pollList.filter((p) => p.isHot);
  const rest = pollList.filter((p) => !p.isHot);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900">🗳️ 투표 & 설문</h1>
          <p className="text-gray-500 text-sm mt-1">다른 사람들은 어떻게 생각할까?</p>
        </div>

        {hot.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-500 mb-3">🔥 HOT 투표</h2>
            <div className="flex flex-col gap-3">
              {hot.map((p) => <PollCard key={p.id} data={p} />)}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-sm font-bold text-gray-500 mb-3">전체 투표</h2>
          <div className="flex flex-col gap-3">
            {rest.map((p) => <PollCard key={p.id} data={p} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

function PollCard({ data }: { data: (typeof pollList)[0] }) {
  return (
    <Link href={`/polls/${data.slug}`}>
      <div
        className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
        style={{ borderLeftColor: data.color, borderLeftWidth: 4 }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 mt-0.5"
          style={{ background: data.bgColor }}
        >
          {data.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-900 text-sm">{data.question}</span>
            {data.isHot && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">HOT</span>
            )}
            {data.isNew && (
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold">NEW</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400">{data.options.length}개 선택지</span>
          </div>
        </div>
        <span className="text-gray-300">›</span>
      </div>
    </Link>
  );
}
