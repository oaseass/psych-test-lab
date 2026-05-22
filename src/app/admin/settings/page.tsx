"use client";
import { useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import { getAdminSettings, saveAdminSettings, resetAdminSettings } from "@/lib/admin/settingsService";
import type { AdminSettings } from "@/lib/admin/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>(() => getAdminSettings());
  const [saved, setSaved] = useState(false);

  function handleChange(key: keyof AdminSettings, value: unknown) {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    saveAdminSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    if (confirm("설정을 초기화하시겠습니까?")) {
      resetAdminSettings();
      setSettings(getAdminSettings());
    }
  }

  return (
    <div>
      <AdminTopbar title="설정" showDemo={false} />
      <div className="space-y-6 mt-6">
        <AdminSection title="사이트 기본 설정">
          <div className="space-y-4">
            {[
              { key: "siteName" as keyof AdminSettings, label: "사이트명", type: "text" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{f.label}</label>
                <input
                  type={f.type}
                  value={String(settings[f.key] ?? "")}
                  onChange={e => handleChange(f.key, e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300"
                />
              </div>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="광고 설정">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-800">광고 활성화</div>
                <div className="text-xs text-gray-500">광고 슬롯 노출 여부</div>
              </div>
              <button
                onClick={() => handleChange("adsEnabled", !settings.adsEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${settings.adsEnabled ? "bg-indigo-600" : "bg-gray-300"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${settings.adsEnabled ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">기준 RPM (원/천뷰)</label>
              <input
                type="number"
                value={settings.defaultRpm ?? 1000}
                onChange={e => handleChange("defaultRpm", Number(e.target.value))}
                className="w-32 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300"
              />
            </div>
          </div>
        </AdminSection>

        <AdminSection title="포인트 설정">
          <div className="space-y-4">
            {[
              { key: "signupBonusPoints" as keyof AdminSettings, label: "회원가입 보너스 포인트", type: "number" },
              { key: "checkInPoints" as keyof AdminSettings, label: "출석 기본 포인트", type: "number" },
              { key: "dailyMissionBonus" as keyof AdminSettings, label: "데일리 미션 보너스", type: "number" },
              { key: "luckyDailyLimit" as keyof AdminSettings, label: "럭키존 일일 한도", type: "number" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{f.label}</label>
                <input
                  type="number"
                  value={Number(settings[f.key] ?? 0)}
                  onChange={e => handleChange(f.key, Number(e.target.value))}
                  className="w-32 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300"
                />
              </div>
            ))}
          </div>
        </AdminSection>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            {saved ? "저장됨 ✓" : "저장하기"}
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}
