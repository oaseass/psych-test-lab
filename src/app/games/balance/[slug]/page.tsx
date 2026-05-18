"use client";
import { notFound } from "next/navigation";
import { getBalanceGameBySlug } from "@/data/games/balanceData";
import BalanceGame from "@/components/games/BalanceGame";
import Link from "next/link";
import { use } from "react";

export default function BalancePlayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = getBalanceGameBySlug(slug);
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/games/balance" className="text-gray-400 hover:text-gray-600 text-xl">‹</Link>
          <div>
            <h1 className="font-bold text-gray-900">{data.title}</h1>
            <p className="text-xs text-gray-500">{data.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <BalanceGame data={data} />
        </div>
      </div>
    </div>
  );
}
