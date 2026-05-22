"use client";
import type { RankTier } from "@/lib/user/types";

const GOLD = "#D4AF37";

/** 가로 막대 (병사) */
function Bars({ count }: { count: number }) {
  const barH = 5;
  const gap = count === 4 ? 3 : 4;
  const total = count * barH + (count - 1) * gap;
  const startY = (40 - total) / 2;
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <rect
          key={i}
          x={3}
          y={startY + i * (barH + gap)}
          width={34}
          height={barH}
          rx={2}
          fill={GOLD}
        />
      ))}
    </>
  );
}

/** V자 갈매기 (부사관) — count=4이면 3갈매기+별(원사) */
function Chevrons({ count }: { count: number }) {
  // 원사: 상사(3갈매기) + 별 1개
  const chevCount = count === 4 ? 3 : count;
  const withStar = count === 4;

  const chevH = 8;
  const gap = 2;
  const starR = 4.5;
  const starGap = 4; // star 하단과 첫 갈매기 사이 간격

  const totalChevrons = chevCount * chevH + (chevCount - 1) * gap;
  const totalHeight = withStar ? starR * 2 + starGap + totalChevrons : totalChevrons;
  const startY = (40 - totalHeight) / 2;

  // 5각별 경로
  const starPath = (cx: number, cy: number, R: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 5; i++) {
      const ao = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const ai = ao + Math.PI / 5;
      const ir = R * 0.4;
      pts.push(`${cx + R * Math.cos(ao)},${cy + R * Math.sin(ao)}`);
      pts.push(`${cx + ir * Math.cos(ai)},${cy + ir * Math.sin(ai)}`);
    }
    return `M${pts.join("L")}Z`;
  };

  const chevStartY = withStar ? startY + starR * 2 + starGap : startY;

  return (
    <>
      {withStar && (
        <path d={starPath(20, startY + starR, starR)} fill={GOLD} />
      )}
      {Array.from({ length: chevCount }, (_, i) => {
        const ty = chevStartY + i * (chevH + gap);
        return (
          <polyline
            key={i}
            points={`3,${ty} 20,${ty + chevH} 37,${ty}`}
            stroke={GOLD}
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        );
      })}
    </>
  );
}

/** 마름모 (준위) */
function Diamond() {
  return (
    <>
      <polygon points="20,3 37,20 20,37 3,20" fill={GOLD} />
      <polygon points="20,11 29,20 20,29 11,20" fill="#0f172a" />
      <circle cx={20} cy={20} r={3.5} fill={GOLD} />
    </>
  );
}

/** 4각 다이아몬드 경로 (위관 - 세로로 긴 금강석) */
function fourPointStar(cx: number, cy: number, R: number): string {
  const rV = R;          // 세로 반지름 (긴 쪽)
  const rH = R * 0.62;   // 가로 반지름 (짧은 쪽)
  const ri = R * 0.26;   // 내부 요입부
  return (
    `M${cx},${cy - rV} L${cx + ri},${cy - ri} L${cx + rH},${cy} ` +
    `L${cx + ri},${cy + ri} L${cx},${cy + rV} L${cx - ri},${cy + ri} ` +
    `L${cx - rH},${cy} L${cx - ri},${cy - ri}Z`
  );
}

/** 8각 꽃별 경로 (영관 - 무궁화) */
function eightPointStar(cx: number, cy: number, R: number): string {
  const r = R * 0.42;
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const ao = (i * Math.PI * 2) / 8 - Math.PI / 2;
    const ai = ao + Math.PI / 8;
    pts.push(`${cx + R * Math.cos(ao)},${cy + R * Math.sin(ao)}`);
    pts.push(`${cx + r * Math.cos(ai)},${cy + r * Math.sin(ai)}`);
  }
  return `M${pts.join("L")}Z`;
}

/** 5각별 경로 (장성) */
function fivePointStar(cx: number, cy: number, R: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const ao = (i * Math.PI * 2) / 5 - Math.PI / 2;
    const ai = ao + Math.PI / 5;
    const ir = R * 0.38;
    pts.push(`${cx + R * Math.cos(ao)},${cy + R * Math.sin(ao)}`);
    pts.push(`${cx + ir * Math.cos(ai)},${cy + ir * Math.sin(ai)}`);
  }
  return `M${pts.join("L")}Z`;
}

/** 원수 전용: 별 5개를 오각형 원형으로 배치 */
function pentagonStarPositions(): Array<[number, number]> {
  const cx = 20, cy = 21, r = 13;
  return Array.from({ length: 5 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [number, number];
  });
}

/** count에 따른 별 반지름 */
function getR(count: number): number {
  return ({ 1: 11, 2: 9, 3: 7, 4: 5, 5: 4 } as Record<number, number>)[count] ?? 8;
}

/** count에 따른 중심 좌표 배열 (viewBox 0 0 40 40 기준) */
function positions(count: number, R: number): Array<[number, number]> {
  if (count === 1) return [[20, 20]];
  const step = (40 - 2 * R) / (count - 1);
  return Array.from({ length: count }, (_, i) => [R + i * step, 20]);
}

export default function RankInsigniaSvg({
  tier,
  count,
  size = 32,
}: {
  tier: RankTier;
  count: number;
  size?: number;
}) {
  const R = getR(count);
  const pos = positions(count, R);

  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle", overflow: "visible" }}
    >
      {tier === "guest" && (
        <line
          x1={8} y1={20} x2={32} y2={20}
          stroke={GOLD} strokeWidth={3} strokeLinecap="round" opacity={0.5}
        />
      )}
      {tier === "soldier" && <Bars count={count} />}
      {tier === "nonCommissionedOfficer" && <Chevrons count={count} />}
      {tier === "warrantOfficer" && <Diamond />}
      {tier === "officer" &&
        pos.map(([cx, cy]) => (
          <path key={cx} d={fourPointStar(cx, cy, R)} fill={GOLD} />
        ))}
      {tier === "fieldOfficer" &&
        pos.map(([cx, cy]) => (
          <path key={cx} d={eightPointStar(cx, cy, R)} fill={GOLD} />
        ))}
      {tier === "general" &&
        pos.map(([cx, cy]) => (
          <path key={cx} d={fivePointStar(cx, cy, R)} fill={GOLD} />
        ))}
      {tier === "legend" &&
        pentagonStarPositions().map(([cx, cy]) => (
          <path key={cx} d={fivePointStar(cx, cy, 5)} fill={GOLD} />
        ))}
    </svg>
  );
}
