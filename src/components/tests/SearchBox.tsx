"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface SearchBoxProps {
  defaultValue?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBox({ defaultValue = "", placeholder = "테스트 검색...", onSearch }: SearchBoxProps) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const [, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    if (onSearch) {
      onSearch(q);
    } else {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(q)}`);
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        🔍
      </span>
      <button type="submit" className="sr-only">검색</button>
    </form>
  );
}
