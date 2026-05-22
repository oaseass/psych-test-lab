"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_GROUPS = [
  {
    label: "핵심",
    items: [
      { href: "/admin", label: "대시보드", icon: "📊", exact: true },
      { href: "/admin/analytics", label: "성과분석", icon: "📈" },
      { href: "/admin/revenue", label: "수익분석", icon: "💰" },
      { href: "/admin/reports", label: "운영리포트", icon: "📋" },
    ],
  },
  {
    label: "운영",
    items: [
      { href: "/admin/content", label: "콘텐츠", icon: "📝" },
      { href: "/admin/users", label: "회원", icon: "👥" },
      { href: "/admin/retention", label: "리텐션", icon: "🔄" },
    ],
  },
  {
    label: "포인트/계급",
    items: [
      { href: "/admin/points", label: "포인트", icon: "🪙" },
      { href: "/admin/ranks", label: "계급", icon: "⭐" },
      { href: "/admin/missions", label: "미션", icon: "✅" },
    ],
  },
  {
    label: "게임",
    items: [
      { href: "/admin/lucky", label: "럭키존", icon: "🍀" },
      { href: "/admin/together", label: "같이놀기", icon: "🎮" },
      { href: "/admin/rankings", label: "랭킹 관리", icon: "🏆" },
    ],
  },
  {
    label: "수익화",
    items: [
      { href: "/admin/ads", label: "광고 관리", icon: "📢" },
      { href: "/admin/sponsors", label: "협찬 문의", icon: "🤝" },
      { href: "/admin/affiliate", label: "제휴", icon: "🔗" },
      { href: "/admin/events", label: "이벤트", icon: "🎉" },
    ],
  },
  {
    label: "상점",
    items: [
      { href: "/admin/badges", label: "뱃지/칭호", icon: "🏅" },
      { href: "/admin/shop", label: "포인트 상점", icon: "🛍️" },
      { href: "/admin/experiments", label: "A/B 테스트", icon: "🧪" },
    ],
  },
  {
    label: "시스템",
    items: [
      { href: "/admin/settings", label: "설정", icon: "⚙️" },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && href !== "/admin";
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-gray-900 text-white flex flex-col z-40 overflow-y-auto">
      {/* 로고 */}
      <div className="px-4 py-4 border-b border-gray-700">
        <Link href="/" className="block">
          <div className="text-xs text-gray-400 mb-0.5">심심풀이 연구소</div>
          <div className="font-black text-white text-sm">운영 콘솔</div>
        </Link>
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 px-2 py-3 space-y-4">
        {MENU_GROUPS.map(group => (
          <div key={group.label}>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 mb-1">{group.label}</div>
            {group.items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-all mb-0.5 ${
                  isActive(item.href, item.exact)
                    ? "bg-indigo-600 text-white font-semibold"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-base leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* 하단 */}
      <div className="px-4 py-3 border-t border-gray-700">
        <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors block mb-1">← 사이트로 돌아가기</Link>
        <Link href="/admin/login" className="text-xs text-gray-500 hover:text-red-400 transition-colors">로그아웃</Link>
      </div>
    </aside>
  );
}
