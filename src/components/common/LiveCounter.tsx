"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { upsertOnlineVisitor, getOnlineCount } from "@/lib/supabase/dbService";

interface LiveCounterProps {
  testSlug: string;
  className?: string;
}

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  const key = "sslab_visitor_id";
  let id = localStorage.getItem(key);
  if (!id) {
    // 방문자 식별용 임시 ID — 서버 전송 없음, 브라우저에만 저장
    id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    localStorage.setItem(key, id);
  }
  return id;
}

export default function LiveCounter({ testSlug, className }: LiveCounterProps) {
  // null = 미설정/로딩, 0 = 집계 없음, n = 실제 접속자
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Supabase 미설정이면 완전히 숨김 — mock 표시 금지
    if (!isSupabaseConfigured || !supabase) return;

    const visitorId = getVisitorId();

    upsertOnlineVisitor(visitorId, testSlug).then(() =>
      getOnlineCount(testSlug).then((c) => setCount(c))
    );

    const interval = setInterval(() => {
      upsertOnlineVisitor(visitorId, testSlug);
      getOnlineCount(testSlug).then((c) => setCount(c));
    }, 30_000);

    const channel = supabase!
      .channel(`live:${testSlug}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "online_visitors",
          filter: `test_slug=eq.${testSlug}`,
        },
        () => getOnlineCount(testSlug).then((c) => setCount(c))
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase!.removeChannel(channel);
    };
  }, [testSlug]);

  // Supabase 미설정이거나 실제 접속자가 2명 미만이면 렌더링 안 함
  if (!isSupabaseConfigured || count === null || count < 2) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs text-gray-500 ${className ?? ""}`}
    >
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      지금 <strong className="text-gray-700 font-bold">{count.toLocaleString()}명</strong> 참여 중
    </span>
  );
}
