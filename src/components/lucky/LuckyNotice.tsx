// ─────────────────────────────────────────────
// LuckyNotice — 모든 럭키존 페이지 하단 안전 고지
// ─────────────────────────────────────────────
export default function LuckyNotice({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="mt-6 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-400 text-center leading-relaxed">
        럭키존은 내부 포인트 전용입니다. 현금·상품·경품 교환 불가.
      </div>
    );
  }
  return (
    <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-xs text-amber-800 leading-relaxed">
      <div className="font-bold mb-1">⚠️ 럭키존 안내</div>
      <p>
        럭키존은 심심풀이 연구소 내부 포인트로 즐기는 운빨 게임입니다.
        포인트는 계급과 랭킹에만 사용되며{" "}
        <strong>현금, 상품, 경품으로 교환되지 않습니다.</strong>
        포인트 구매, 환전, 양도, 거래는 지원하지 않습니다.
      </p>
    </div>
  );
}
