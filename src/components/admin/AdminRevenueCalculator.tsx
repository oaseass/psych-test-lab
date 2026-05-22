"use client";
import { useState } from "react";
import { getRevenueScenarios } from "@/lib/admin/revenueService";

const PRESETS = [
  { label: "초기 (RPM 300)", value: 300 },
  { label: "성장기 (RPM 1,000)", value: 1000 },
  { label: "안정기 (RPM 2,000)", value: 2000 },
];

export default function AdminRevenueCalculator() {
  const [rpm, setRpm] = useState(1000);
  const [custom, setCustom] = useState("");
  const [activePreset, setActivePreset] = useState(1);

  const activeRpm = custom ? Number(custom) || rpm : rpm;
  const scenarios = getRevenueScenarios(activeRpm);

  function selectPreset(idx: number) {
    setActivePreset(idx);
    setRpm(PRESETS[idx].value);
    setCustom("");
  }

  return (
    <div>
      {/* 프리셋 */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {PRESETS.map((p, i) => (
          <button
            key={p.value}
            onClick={() => selectPreset(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activePreset === i && !custom
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {p.label}
          </button>
        ))}
        <input
          type="number"
          placeholder="직접 입력 RPM"
          value={custom}
          onChange={e => { setCustom(e.target.value); setActivePreset(-1); }}
          className="px-3 py-1.5 rounded-lg text-xs border border-gray-200 w-32 focus:outline-none focus:border-indigo-300"
        />
      </div>

      {/* 시나리오 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-3 py-2 text-xs font-semibold text-gray-500 text-left">DAU</th>
              <th className="px-3 py-2 text-xs font-semibold text-gray-500 text-right">월 PV</th>
              <th className="px-3 py-2 text-xs font-semibold text-gray-500 text-right">광고 수익</th>
              <th className="px-3 py-2 text-xs font-semibold text-gray-500 text-right">협찬 수익</th>
              <th className="px-3 py-2 text-xs font-semibold text-gray-500 text-right">합계</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {scenarios.map(s => (
              <tr key={s.dau} className="hover:bg-gray-50">
                <td className="px-3 py-2">{s.dau.toLocaleString()}명</td>
                <td className="px-3 py-2 text-right text-gray-600">{s.monthlyPV.toLocaleString()}</td>
                <td className="px-3 py-2 text-right text-emerald-600">{s.adRevenue.toLocaleString()}원</td>
                <td className="px-3 py-2 text-right text-blue-600">{s.sponsorRevenue.toLocaleString()}원</td>
                <td className="px-3 py-2 text-right font-bold text-gray-900">{s.total.toLocaleString()}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-gray-400 mt-3">RPM(천회 노출당 수익)을 기준으로 추산한 예상 수익입니다. 실제 수익은 차이가 있을 수 있습니다.</p>
    </div>
  );
}
