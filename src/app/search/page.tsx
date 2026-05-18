"use client";

import { Suspense, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import { searchTests } from "@/lib/data/testRepository";
import type { TestMeta } from "@/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<TestMeta[]>(() =>
    initialQuery ? searchTests(initialQuery) : []
  );
  const [, startTransition] = useTransition();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      const r = searchTests(query.trim());
      setResults(r);
    });
  }

  return (
    <>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="테스트 이름, 키워드로 검색..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-brand-purple text-white rounded-xl text-xs font-medium"
          >
            검색
          </button>
        </div>
      </form>

      {results.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 mb-4">&apos;{query}&apos; 검색결과 {results.length}개</p>
          <TestGrid tests={results} columns={3} />
        </>
      ) : query ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">😅</div>
          <p>검색 결과가 없어요</p>
          <p className="text-sm mt-1">다른 키워드로 검색해보세요</p>
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p>검색어를 입력해주세요</p>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <LayoutContainer>
      <SectionTitle title="🔍 테스트 검색" />
      <Suspense fallback={<div className="py-8 text-center text-gray-400">로딩 중...</div>}>
        <SearchContent />
      </Suspense>
    </LayoutContainer>
  );
}
