"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { getCurrentUser } from "@/lib/user/authService";
import type { UserProfile } from "@/lib/user/types";

interface PointLog {
  amount: number;
  reason: string;
  date: string;
  type: "earn" | "spend";
}

export default function MyPointsPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [logs, setLogs] = useState<PointLog[]>([]);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      const raw = JSON.parse(localStorage.getItem("sslab_point_logs") ?? "[]");
      const myLogs = raw.filter((l: any) => l.userId === user.id).slice(0, 50);
      setLogs(myLogs);
      const userJson = localStorage.getItem("sslab_current_user");
      if (userJson) setUserPoints(JSON.parse(userJson).points ?? 0);
    }
  }, []);

  const earned = logs.filter((l) => l.amount > 0).reduce((s, l) => s + l.amount, 0);
  const spent = logs.filter((l) => l.amount < 0).reduce((s, l) => s + l.amount, 0);

  return (
    <LayoutContainer>
      <div className="pt-4 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-brand-text">💰 포인트 내역</h1>
          <p className="text-sm text-brand-muted mt-1">최근 50건 기준</p>
        </div>

        {!currentUser ? (
          <div className="pt-16 text-center">
            <div className="text-4xl mb-4">💰</div>
            <p className="text-brand-muted text-sm mb-4">로그인 후 포인트 내역을 확인해요</p>
            <a href="/login" className="btn-primary px-6 py-2.5 text-sm">로그인하기</a>
          </div>
        ) : (
          <>
            {/* 현재 잔액 */}
            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5 mb-5">
              <div className="text-xs text-brand-muted mb-1">현재 보유 포인트</div>
              <div className="text-3xl font-black text-violet-700">{userPoints.toLocaleString()}P</div>
              <div className="flex gap-4 mt-3">
                <div>
                  <div className="text-[11px] text-brand-muted">적립</div>
                  <div className="font-bold text-emerald-600 text-sm">+{earned.toLocaleString()}P</div>
                </div>
                <div>
                  <div className="text-[11px] text-brand-muted">사용</div>
                  <div className="font-bold text-red-500 text-sm">{spent.toLocaleString()}P</div>
                </div>
              </div>
            </div>

            {/* 퀵 액션 */}
            <div className="flex gap-2 mb-5">
              <Link href="/missions" className="flex-1 flex flex-col items-center p-3 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                <span className="text-lg mb-1">📋</span>
                <span className="text-xs font-bold text-amber-800">미션 완료</span>
              </Link>
              <Link href="/check-in" className="flex-1 flex flex-col items-center p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                <span className="text-lg mb-1">✅</span>
                <span className="text-xs font-bold text-emerald-800">체크인</span>
              </Link>
              <Link href="/shop" className="flex-1 flex flex-col items-center p-3 bg-violet-50 border border-violet-100 rounded-2xl text-center">
                <span className="text-lg mb-1">🛍️</span>
                <span className="text-xs font-bold text-violet-800">포인트 상점</span>
              </Link>
            </div>

            {/* 내역 목록 */}
            {logs.length === 0 ? (
              <div className="text-center py-12 text-brand-muted text-sm">아직 포인트 내역이 없어요</div>
            ) : (
              <div className="flex flex-col gap-2">
                {logs.map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white border border-brand-border rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${log.amount > 0 ? "bg-emerald-50" : "bg-red-50"}`}>
                        {log.amount > 0 ? "📈" : "📉"}
                      </div>
                      <div>
                        <div className="font-semibold text-brand-text text-sm">{log.reason}</div>
                        <div className="text-xs text-brand-muted">{new Date(log.date).toLocaleDateString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
                      </div>
                    </div>
                    <span className={`font-black text-sm ${log.amount > 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {log.amount > 0 ? "+" : ""}{log.amount.toLocaleString()}P
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </LayoutContainer>
  );
}
