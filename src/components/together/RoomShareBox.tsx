"use client";
import { useState } from "react";

interface Props {
  roomCode: string;
}

export default function RoomShareBox({ roomCode }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/together/room/${roomCode}`
      : `/together/room/${roomCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("input");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
      <p className="text-xs text-violet-600 font-semibold mb-2">방 코드 · 링크 공유</p>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-3xl font-black tracking-[0.3em] text-violet-700 font-mono">
          {roomCode}
        </span>
      </div>
      <div className="flex gap-2">
        <input
          readOnly
          value={shareUrl}
          className="flex-1 text-xs bg-white border border-violet-200 rounded-lg px-3 py-2 text-gray-600 truncate"
        />
        <button
          onClick={handleCopy}
          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all
            ${copied
              ? "bg-green-500 text-white"
              : "bg-violet-600 text-white hover:bg-violet-700"
            }`}
        >
          {copied ? "복사됨 ✓" : "링크 복사"}
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        ※ 같은 기기에서만 동기화됩니다 (데모 버전)
      </p>
    </div>
  );
}
