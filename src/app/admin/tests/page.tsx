import LayoutContainer from "@/components/layout/LayoutContainer";
import { getAllTestMeta } from "@/lib/data/testRepository";
import Link from "next/link";

export default function AdminTestsPage() {
  const tests = getAllTestMeta();

  return (
    <LayoutContainer>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-brand-text">관리자 - 테스트 목록</h1>
        <Link
          href="/admin/import"
          className="px-4 py-2 bg-brand-purple text-white rounded-xl text-sm font-medium"
        >
          엑셀 가져오기
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">제목</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">카테고리</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">상태</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">액션</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, i) => (
              <tr key={test.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-4 py-2 text-gray-400 font-mono text-xs">{test.id}</td>
                <td className="px-4 py-2 font-medium text-brand-text">{test.title}</td>
                <td className="px-4 py-2 text-gray-500">{test.categorySlug}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      test.status === "curated"
                        ? "bg-green-100 text-green-700"
                        : test.status === "generated"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {test.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Link href={`/test/${test.slug}`} className="text-brand-purple text-xs hover:underline">
                    보기
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutContainer>
  );
}
