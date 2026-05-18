"use client";

import { useState, useRef } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

export default function AdminImportPage() {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setLoading(true);
    setStatus("파일을 읽는 중...");

    try {
      const { read, utils } = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const wb = read(buffer);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = utils.sheet_to_json(sheet);
      setStatus(`✅ ${rows.length}개 행을 읽었습니다. (실제 저장 기능은 서버 구현 후 활성화됩니다)`);
    } catch (err) {
      setStatus(`❌ 오류: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LayoutContainer narrow>
      <h1 className="text-2xl font-extrabold text-brand-text mb-6">엑셀 데이터 가져오기</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <p className="text-sm text-gray-500 mb-4">
          .xlsx 파일을 업로드하면 테스트 데이터를 가져올 수 있습니다.
          컬럼: id, slug, title, categorySlug, hook, description, ...
        </p>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-purple-50 file:text-brand-purple file:font-medium"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-brand-purple text-white rounded-xl text-sm font-medium disabled:opacity-50"
          >
            {loading ? "처리 중..." : "가져오기"}
          </button>
        </form>
        {status && (
          <div className="mt-4 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
            {status}
          </div>
        )}
      </div>
    </LayoutContainer>
  );
}
