"use client";
import React from "react";
import type { SceneType } from "@/data/games/spotDifferenceData";

type SceneProps = {
  o: boolean; // isOriginal
};

// ── Cafe Scene ──────────────────────────────────
function CafeScene({ o }: SceneProps) {
  const flowerColor = o ? "#F9A8D4" : "#C084FC";
  const flowerCenter = o ? "#FDE68A" : "#FBBF24";
  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%">
      <defs>
        <linearGradient id="cafe-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="cafe-table" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>
      {/* Wall */}
      <rect width="360" height="142" fill="url(#cafe-wall)" />
      {/* Wainscoting strips */}
      {[60, 120, 180, 240, 300].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="142" stroke="#FCD34D" strokeWidth="1" opacity="0.5" />
      ))}
      {/* Table */}
      <rect y="142" width="360" height="98" fill="url(#cafe-table)" />
      <rect y="142" width="360" height="5" fill="#F59E0B" opacity="0.6" />
      <rect y="228" width="360" height="12" fill="#78350F" />
      {/* Wall shelf */}
      <rect x="55" y="75" width="250" height="9" rx="4" fill="#92400E" />
      <rect x="54" y="82" width="9" height="42" rx="4" fill="#92400E" />
      <rect x="297" y="82" width="9" height="42" rx="4" fill="#92400E" />
      {/* Window */}
      <rect x="120" y="12" width="120" height="60" rx="8" fill="#BAE6FD" />
      <rect x="120" y="12" width="120" height="60" rx="8" stroke="#7DD3FC" strokeWidth="2.5" fill="none" />
      <line x1="180" y1="12" x2="180" y2="72" stroke="#7DD3FC" strokeWidth="2" />
      <line x1="120" y1="42" x2="240" y2="42" stroke="#7DD3FC" strokeWidth="2" />
      {/* Curtains */}
      <path d="M117 10 Q100 32 110 72" stroke="#FCA5A5" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M243 10 Q260 32 250 72" stroke="#FCA5A5" strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* Flower vase on shelf */}
      <rect x="283" y="84" width="24" height="32" rx="9" fill="#93C5FD" />
      <ellipse cx="295" cy="84" rx="14" ry="6" fill="#60A5FA" />
      <line x1="295" y1="56" x2="295" y2="84" stroke="#4ADE80" strokeWidth="2.5" />
      <ellipse cx="287" cy="70" rx="9" ry="4" fill="#4ADE80" transform="rotate(-25 287 70)" />
      <ellipse cx="303" cy="65" rx="9" ry="4" fill="#4ADE80" transform="rotate(25 303 65)" />
      {[0, 72, 144, 216, 288].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <circle key={angle} cx={295 + Math.cos(rad) * 9} cy={55 + Math.sin(rad) * 9} r="5" fill={flowerColor} />
        );
      })}
      <circle cx="295" cy="55" r="5" fill={flowerCenter} />
      {/* Small picture frame on wall */}
      <rect x="80" y="20" width="40" height="32" rx="4" fill="white" stroke="#D97706" strokeWidth="2" />
      <ellipse cx="100" cy="36" rx="12" ry="10" fill="#FDE68A" opacity="0.8" />
      <ellipse cx="100" cy="42" rx="8" ry="5" fill="#86EFAC" opacity="0.8" />
      {/* Books on shelf */}
      <rect x="68" y="88" width="14" height="32" rx="2" fill="#F87171" />
      <rect x="82" y="90" width="12" height="30" rx="2" fill="#FB923C" />
      <rect x="94" y="86" width="16" height="34" rx="2" fill="#FBBF24" />
      {/* Left coffee cup */}
      {/* Saucer */}
      <ellipse cx="80" cy="200" rx="44" ry="9" fill="#F3F4F6" />
      <ellipse cx="80" cy="199" rx="38" ry="7" fill="white" />
      {/* Cup body */}
      <rect x="50" y="157" width="60" height="48" rx="13" fill="white" />
      <rect x="55" y="162" width="50" height="38" rx="10" fill="#78350F" />
      {/* Coffee foam */}
      <ellipse cx="80" cy="163" rx="23" ry="7" fill="#92400E" />
      <ellipse cx="73" cy="162" rx="8" ry="3" fill="#B45309" opacity="0.6" />
      <ellipse cx="86" cy="164" rx="5" ry="2" fill="#B45309" opacity="0.5" />
      {/* Cup handle: original=right, changed=left */}
      {o ? (
        <path d="M110 165 Q128 165 128 180 Q128 195 110 195" stroke="#E5E7EB" strokeWidth="5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M50 165 Q32 165 32 180 Q32 195 50 195" stroke="#E5E7EB" strokeWidth="5" fill="none" strokeLinecap="round" />
      )}
      {/* Spoon */}
      <ellipse cx="105" cy="207" rx="10" ry="5" fill="#D1D5DB" />
      <rect x="113" y="205" width="28" height="4" rx="2" fill="#D1D5DB" />
      {/* Cake slice */}
      <ellipse cx="180" cy="198" rx="46" ry="9" fill="#F3F4F6" />
      <ellipse cx="180" cy="197" rx="40" ry="7" fill="white" />
      <path d="M152 167 L208 167 L202 195 L158 195 Z" fill="#FBCFE8" />
      <rect x="152" y="177" width="56" height="5" fill="white" opacity="0.7" />
      <rect x="154" y="187" width="54" height="5" fill="white" opacity="0.6" />
      <path d="M150 165 Q180 156 210 165" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Strawberries: original=3, changed=2 */}
      <circle cx="163" cy="161" r="5.5" fill="#EF4444" />
      <ellipse cx="163" cy="157" rx="3" ry="2" fill="#22C55E" />
      <circle cx="180" cy="158" r="5.5" fill="#EF4444" />
      <ellipse cx="180" cy="154" rx="3" ry="2" fill="#22C55E" />
      {o && (
        <>
          <circle cx="197" cy="161" r="5.5" fill="#EF4444" />
          <ellipse cx="197" cy="157" rx="3" ry="2" fill="#22C55E" />
        </>
      )}
      {/* Receipt */}
      <rect x="228" y="148" width="38" height="58" rx="4" fill="white" />
      <path d="M228 152 Q247 146 266 152" stroke="#FDE68A" strokeWidth="2" fill="none" />
      {[156, 164, 172, 180].map((y) => (
        <line key={y} x1="234" y1={y} x2="260" y2={y} stroke="#E5E7EB" strokeWidth="2" />
      ))}
      {o && <line x1="234" y1="188" x2="260" y2="188" stroke="#E5E7EB" strokeWidth="2" />}
      <line x1="232" y1="196" x2="262" y2="196" stroke="#D1D5DB" strokeWidth="1.5" />
      <line x1="235" y1="199" x2="259" y2="199" stroke="#9CA3AF" strokeWidth="2" />
      {/* Smartphone */}
      <rect x="120" y="162" width="40" height="66" rx="8" fill="#111827" />
      <rect x="124" y="167" width="32" height="56" rx="6" fill="#2563EB" />
      <rect x="131" y="167" width="12" height="4" rx="2" fill="#111827" />
      <rect x="132" y="218" width="14" height="3" rx="1.5" fill="white" opacity="0.4" />
      {/* App icons: original=4, changed=3 */}
      <rect x="127" y="175" width="11" height="11" rx="3" fill="white" opacity="0.9" />
      <rect x="142" y="175" width="11" height="11" rx="3" fill="white" opacity="0.9" />
      <rect x="127" y="190" width="11" height="11" rx="3" fill="white" opacity="0.9" />
      {o && <rect x="142" y="190" width="11" height="11" rx="3" fill="white" opacity="0.9" />}
    </svg>
  );
}

// ── Convenience Store Scene ────────────────────
function ConvenienceScene({ o }: SceneProps) {
  const canColor = o ? "#EF4444" : "#3B82F6"; // red vs blue
  const snackColor = o ? "#FCD34D" : "#86EFAC"; // yellow vs green
  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%">
      <defs>
        <linearGradient id="conv-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9FAFB" />
          <stop offset="100%" stopColor="#F3F4F6" />
        </linearGradient>
      </defs>
      {/* Ceiling */}
      <rect width="360" height="20" fill="#E5E7EB" />
      {/* Fluorescent lights */}
      {[60, 180, 300].map((x) => (
        <rect key={x} x={x - 30} y="4" width="60" height="8" rx="4" fill="white" />
      ))}
      {/* Floor */}
      <rect y="200" width="360" height="40" fill="url(#conv-floor)" />
      {/* Floor tiles */}
      {[0, 60, 120, 180, 240, 300].map((x) => (
        <line key={x} x1={x} y1="200" x2={x} y2="240" stroke="#E5E7EB" strokeWidth="1" />
      ))}
      {/* Back wall */}
      <rect y="20" width="360" height="180" fill="#F9FAFB" />
      {/* Left shelf unit */}
      <rect x="10" y="22" width="100" height="178" fill="#E5E7EB" rx="2" />
      <rect x="12" y="24" width="96" height="174" fill="#F3F4F6" rx="2" />
      {/* Shelf boards */}
      {[70, 115, 160].map((y) => (
        <rect key={y} x="10" y={y} width="100" height="5" rx="1" fill="#D1D5DB" />
      ))}
      {/* Snack items on left shelf top */}
      <rect x="18" y="40" width="26" height="28" rx="4" fill={snackColor} />
      <text x="31" y="58" textAnchor="middle" fontSize="14" fill="white">🍪</text>
      <rect x="48" y="42" width="24" height="26" rx="4" fill="#FCA5A5" />
      <text x="60" y="58" textAnchor="middle" fontSize="12" fill="white">🍫</text>
      <rect x="76" y="40" width="26" height="28" rx="4" fill="#86EFAC" />
      <text x="89" y="58" textAnchor="middle" fontSize="14" fill="white">🌿</text>
      {/* Drinks on mid shelf */}
      {[18, 36, 54, 72, 90].map((x, i) => (
        <g key={x}>
          <rect x={x} y="78" width="15" height="32" rx="4" fill={i === 1 && !o ? "#3B82F6" : i === 1 ? "#EF4444" : ["#60A5FA", "#34D399", "#A78BFA", "#F472B6"][i % 4]} />
          <ellipse cx={x + 7} cy="78" rx="7" ry="3" fill="white" opacity="0.3" />
        </g>
      ))}
      {/* Price tag left shelf */}
      <rect x="18" y="120" width="84" height="16" rx="2" fill="white" stroke="#D1D5DB" strokeWidth="1" />
      <text x="60" y="131" textAnchor="middle" fontSize="8" fill="#374151" fontWeight="bold">₩1,500</text>
      {/* Center shelf unit */}
      <rect x="130" y="22" width="100" height="178" fill="#E5E7EB" rx="2" />
      <rect x="132" y="24" width="96" height="174" fill="#F3F4F6" rx="2" />
      {[70, 115, 160].map((y) => (
        <rect key={y} x="130" y={y} width="100" height="5" rx="1" fill="#D1D5DB" />
      ))}
      {/* Can drinks on center shelf */}
      {[138, 158, 178, 198, 218].map((x, i) => (
        <g key={x}>
          <rect x={x} y="28" width="16" height="38" rx="5" fill={i === 2 ? canColor : ["#6EE7B7", "#93C5FD", "#FCA5A5", "#FCD34D"][i % 4]} />
          <ellipse cx={x + 8} cy="28" rx="8" ry="4" fill="white" opacity="0.25" />
          <line x1={x + 2} y1="38" x2={x + 14} y2="38" stroke="white" strokeWidth="1" opacity="0.5" />
        </g>
      ))}
      {/* Price tag center */}
      <rect x="138" y="122" width="84" height="18" rx="2" fill="#FEF9C3" stroke="#FDE68A" strokeWidth="1" />
      <text x="180" y="134" textAnchor="middle" fontSize="9" fill="#92400E" fontWeight="bold">
        {o ? "₩ 2,990" : "₩ 3,990"}
      </text>
      {/* Snacks on center bottom */}
      <rect x="140" y="122" width="18" height="34" rx="3" fill="#FCA5A5" />
      <rect x="162" y="125" width="18" height="31" rx="3" fill="#93C5FD" />
      <rect x="184" y="120" width="20" height="35" rx="3" fill="#FCD34D" />
      <rect x="208" y="123" width="16" height="32" rx="3" fill="#86EFAC" />
      {/* Right shelf — refrigerator */}
      <rect x="250" y="22" width="100" height="178" fill="#DBEAFE" rx="2" />
      <rect x="252" y="24" width="96" height="174" fill="#EFF6FF" rx="2" />
      {[70, 115, 160].map((y) => (
        <rect key={y} x="250" y={y} width="100" height="4" rx="1" fill="#BFDBFE" />
      ))}
      {/* Fridge door handle */}
      <rect x="343" y="80" width="5" height="60" rx="2" fill="#93C5FD" />
      {/* Fridge sticker: original=heart, changed=none */}
      {o && (
        <text x="305" y="52" textAnchor="middle" fontSize="18" fill="#F472B6">♥</text>
      )}
      {/* Fridge items */}
      {[258, 278, 298, 318].map((x) => (
        <rect key={x} x={x} y="30" width="15" height="36" rx="4" fill="#BFDBFE" />
      ))}
      {[258, 278, 298, 318].map((x) => (
        <rect key={x} x={x} y="77" width="15" height="34" rx="4" fill="#DDD6FE" />
      ))}
      {/* Counter */}
      <rect x="0" y="200" width="360" height="10" fill="#D1D5DB" />
    </svg>
  );
}

// ── Cat Room Scene ──────────────────────────────
function CatRoomScene({ o }: SceneProps) {
  const eyeColor = o ? "#60A5FA" : "#4ADE80";
  const cushionColor = o ? "#FBCFE8" : "#FDE68A";
  const hasEarNotch = o;
  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%">
      <defs>
        <linearGradient id="cat-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>
        <linearGradient id="cat-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EDE9FE" />
          <stop offset="100%" stopColor="#DDD6FE" />
        </linearGradient>
      </defs>
      {/* Wall */}
      <rect width="360" height="165" fill="url(#cat-wall)" />
      {/* Wallpaper pattern */}
      {[30, 90, 150, 210, 270, 330].map((x) =>
        [20, 60, 100, 140].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#C4B5FD" opacity="0.4" />
        ))
      )}
      {/* Floor */}
      <rect y="165" width="360" height="75" fill="url(#cat-floor)" />
      {/* Floorboard lines */}
      {[165, 180, 195, 210].map((y) => (
        <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#FDE68A" strokeWidth="1" />
      ))}
      {/* Baseboard */}
      <rect y="162" width="360" height="6" fill="#C4B5FD" />
      {/* Window */}
      <rect x="60" y="15" width="100" height="80" rx="8" fill="#BAE6FD" />
      <rect x="60" y="15" width="100" height="80" rx="8" stroke="#7DD3FC" strokeWidth="3" fill="none" />
      <line x1="110" y1="15" x2="110" y2="95" stroke="#7DD3FC" strokeWidth="2" />
      <line x1="60" y1="55" x2="160" y2="55" stroke="#7DD3FC" strokeWidth="2" />
      {/* Window bird outside */}
      <text x="85" y="42" fontSize="16" textAnchor="middle">🐦</text>
      {/* Curtain */}
      <rect x="52" y="12" width="15" height="90" rx="4" fill="#F9A8D4" opacity="0.7" />
      <rect x="153" y="12" width="15" height="90" rx="4" fill="#F9A8D4" opacity="0.7" />
      {/* Cat tree / scratcher */}
      <rect x="290" y="90" width="18" height="75" rx="9" fill="#D97706" />
      <rect x="278" y="80" width="42" height="20" rx="10" fill="#F59E0B" />
      <rect x="280" y="140" width="42" height="16" rx="8" fill="#F59E0B" />
      {/* Shelf for cat tree */}
      <rect x="268" y="156" width="62" height="8" rx="4" fill="#92400E" />
      {/* Cat on cushion */}
      {/* Cushion */}
      <ellipse cx="180" cy="190" rx="70" ry="28" fill={cushionColor} />
      <ellipse cx="180" cy="186" rx="66" ry="22" fill={cushionColor} />
      {/* Cushion button */}
      <circle cx="180" cy="183" r="4" fill="white" opacity="0.6" />
      {/* Cat body */}
      <ellipse cx="180" cy="175" rx="38" ry="32" fill="#E5E7EB" />
      {/* Cat stripes */}
      <path d="M160 165 Q180 158 200 165" stroke="#9CA3AF" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M158 175 Q180 168 202 175" stroke="#9CA3AF" strokeWidth="2" fill="none" opacity="0.4" />
      {/* Cat head */}
      <circle cx="180" cy="138" r="32" fill="#E5E7EB" />
      {/* Cat ears */}
      <path d="M154 118 L144 96 L170 110 Z" fill="#E5E7EB" />
      <path d="M154 118 L148 100 L168 112 Z" fill="#FCA5A5" />
      {/* Right ear: original=notch, changed=full */}
      {hasEarNotch ? (
        <>
          <path d="M206 118 L216 96 L190 110 Z" fill="#E5E7EB" />
          <path d="M204 117 L212 100 L192 112 Z" fill="#FCA5A5" />
          <circle cx="213" cy="97" r="5" fill="url(#cat-wall)" /> {/* notch */}
        </>
      ) : (
        <>
          <path d="M206 118 L216 96 L190 110 Z" fill="#E5E7EB" />
          <path d="M204 117 L212 100 L192 112 Z" fill="#FCA5A5" />
        </>
      )}
      {/* Eyes */}
      <ellipse cx="167" cy="138" rx="9" ry="8" fill="white" />
      <ellipse cx="193" cy="138" rx="9" ry="8" fill="white" />
      <circle cx="167" cy="138" r="6" fill={eyeColor} />
      <circle cx="193" cy="138" r="6" fill={eyeColor} />
      <circle cx="169" cy="136" r="2" fill="black" />
      <circle cx="195" cy="136" r="2" fill="black" />
      <circle cx="170" cy="135" r="1" fill="white" />
      <circle cx="196" cy="135" r="1" fill="white" />
      {/* Nose */}
      <ellipse cx="180" cy="148" rx="5" ry="3.5" fill="#FCA5A5" />
      {/* Whiskers */}
      <line x1="140" y1="148" x2="174" y2="150" stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1="140" y1="153" x2="174" y2="153" stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1="186" y1="150" x2="220" y2="148" stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1="186" y1="153" x2="220" y2="153" stroke="#9CA3AF" strokeWidth="1.5" />
      {/* Mouth */}
      <path d="M176 152 Q180 157 184 152" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
      {/* Cat toy - fish: original=present, changed=absent */}
      {o && (
        <>
          <ellipse cx="256" cy="175" rx="20" ry="10" fill="#F97316" />
          <path d="M276 175 L290 165 L290 185 Z" fill="#F97316" />
          <circle cx="248" cy="172" r="2.5" fill="black" />
          <line x1="248" y1="164" x2="244" y2="158" stroke="#9CA3AF" strokeWidth="1.5" />
          <line x1="252" y1="164" x2="252" y2="157" stroke="#9CA3AF" strokeWidth="1.5" />
          <line x1="256" y1="165" x2="258" y2="158" stroke="#9CA3AF" strokeWidth="1.5" />
        </>
      )}
      {/* Yarn ball */}
      <circle cx="100" cy="195" r="18" fill="#FCA5A5" />
      <path d="M86 185 Q100 177 114 185" stroke="#F9A8D4" strokeWidth="2" fill="none" />
      <path d="M84 195 Q100 187 116 195" stroke="#F9A8D4" strokeWidth="2" fill="none" />
      <path d="M86 205 Q100 197 114 205" stroke="#F9A8D4" strokeWidth="2" fill="none" />
      <circle cx="100" cy="195" r="18" fill="none" stroke="#F9A8D4" strokeWidth="1.5" />
      {/* Food bowl */}
      <ellipse cx="35" cy="212" rx="26" ry="12" fill="#D1D5DB" />
      <ellipse cx="35" cy="208" rx="22" ry="9" fill="white" />
      <text x="35" y="213" textAnchor="middle" fontSize="14">🐾</text>
    </svg>
  );
}

// ── Dog Walk Scene ──────────────────────────────
function DogWalkScene({ o }: SceneProps) {
  const balloonColor = o ? "#EF4444" : "#F97316";
  const benchColor = o ? "#92400E" : "#6B7280";
  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%">
      <defs>
        <linearGradient id="dog-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>
        <linearGradient id="dog-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="360" height="170" fill="url(#dog-sky)" />
      {/* Clouds */}
      <ellipse cx="80" cy="40" rx="35" ry="18" fill="white" opacity="0.9" />
      <ellipse cx="105" cy="32" rx="28" ry="18" fill="white" opacity="0.9" />
      <ellipse cx="60" cy="38" rx="22" ry="14" fill="white" opacity="0.85" />
      <ellipse cx="250" cy="55" rx="30" ry="16" fill="white" opacity="0.85" />
      <ellipse cx="275" cy="48" rx="24" ry="15" fill="white" opacity="0.85" />
      {/* Birds: original=2, changed=1 */}
      <path d="M248 42 Q253 38 258 42" stroke="#1D4ED8" strokeWidth="2" fill="none" />
      <path d="M252 40 Q257 36 262 40" stroke="#1D4ED8" strokeWidth="2" fill="none" />
      {o && <path d="M265 55 Q270 51 275 55" stroke="#1D4ED8" strokeWidth="2" fill="none" />}
      {/* Ground */}
      <rect y="170" width="360" height="70" fill="#86EFAC" />
      <rect y="170" width="360" height="8" fill="url(#dog-grass)" />
      {/* Path */}
      <path d="M0 200 Q90 190 180 195 Q270 200 360 190" stroke="#FDE68A" strokeWidth="18" fill="none" opacity="0.6" strokeLinecap="round" />
      {/* Tree left */}
      <rect x="18" y="95" width="16" height="80" rx="8" fill="#92400E" />
      <circle cx="26" cy="82" r="38" fill="#4ADE80" />
      <circle cx="12" cy="100" r="24" fill="#22C55E" />
      <circle cx="40" cy="100" r="24" fill="#22C55E" />
      {/* Bench */}
      <rect x={o ? 275 : 270} y="175" width="70" height="8" rx="4" fill={benchColor} />
      <rect x={o ? 278 : 273} y="160" width="64" height="6" rx="3" fill={benchColor} />
      <rect x={o ? 280 : 275} y="160" width="6" height="22" rx="3" fill={benchColor} />
      <rect x={o ? 334 : 329} y="160" width="6" height="22" rx="3" fill={benchColor} />
      {/* Balloon */}
      <circle cx="97" cy={o ? 59 : 57} r="22" fill={balloonColor} />
      <path d="M97 81 Q100 95 97 105" stroke={balloonColor} strokeWidth="2" fill="none" />
      <ellipse cx="90" cy="70" rx="6" ry="4" fill="white" opacity="0.3" />
      {/* Person with balloon (stick figure) */}
      <circle cx="97" cy="122" r="12" fill="#FBBF24" />
      <rect x="90" y="134" width="14" height="30" rx="7" fill="#7C3AED" />
      <line x1="97" y1="140" x2="97" y2="107" stroke="#6B7280" strokeWidth="2" />
      {/* Dog */}
      {/* Dog body */}
      <ellipse cx="175" cy="190" rx="35" ry="22" fill="#F5F5DC" />
      {/* Dog spots: original=3, changed=2 */}
      <circle cx="168" cy="185" r="7" fill="#8B4513" />
      <circle cx="185" cy="192" r="8" fill="#8B4513" />
      {o && <circle cx="175" cy="177" r="6" fill="#8B4513" />}
      {/* Dog head */}
      <circle cx="205" cy="175" r="22" fill="#F5F5DC" />
      {/* Dog ear */}
      <ellipse cx="192" cy="163" rx="9" ry="14" fill="#D2691E" />
      <ellipse cx="218" cy="163" rx="9" ry="14" fill="#D2691E" />
      {/* Dog eyes */}
      <circle cx="200" cy="172" r="4" fill="#4B3621" />
      <circle cx="212" cy="172" r="4" fill="#4B3621" />
      <circle cx="201" cy="171" r="1.5" fill="white" />
      <circle cx="213" cy="171" r="1.5" fill="white" />
      {/* Dog nose */}
      <ellipse cx="206" cy="180" rx="5" ry="3.5" fill="#4B3621" />
      {/* Dog tongue */}
      <path d="M203 183 Q206 189 209 183" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
      {/* Dog legs */}
      <rect x="152" y="207" width="12" height="22" rx="6" fill="#F5F5DC" />
      <rect x="168" y="210" width="12" height="19" rx="6" fill="#F5F5DC" />
      <rect x="190" y="210" width="12" height="19" rx="6" fill="#F5F5DC" />
      <rect x="206" y="207" width="12" height="22" rx="6" fill="#F5F5DC" />
      {/* Dog tail */}
      <path d="M140 192 Q128 178 136 168" stroke="#F5F5DC" strokeWidth="9" fill="none" strokeLinecap="round" />
      {/* Leash */}
      <path d="M205 183 Q150 178 97 165" stroke="#6B7280" strokeWidth="2" fill="none" strokeDasharray="4,2" />
      {/* Flowers */}
      {[48, 80, 318, 345].map((x) => (
        <g key={x}>
          <circle cx={x} cy="180" r="5" fill="#FDE68A" />
          {[0, 72, 144, 216, 288].map((a) => {
            const r2 = (a * Math.PI) / 180;
            return <circle key={a} cx={x + Math.cos(r2) * 7} cy={180 + Math.sin(r2) * 7} r="4" fill="#F9A8D4" />;
          })}
        </g>
      ))}
    </svg>
  );
}

// ── School Desk Scene ───────────────────────────
function SchoolDeskScene({ o }: SceneProps) {
  const bookColor = o ? "#3B82F6" : "#22C55E";
  const clockHour = o ? 3 : 4;
  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%">
      <defs>
        <linearGradient id="school-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="100%" stopColor="#FEF08A" />
        </linearGradient>
      </defs>
      <rect width="360" height="150" fill="url(#school-wall)" />
      <rect y="150" width="360" height="90" fill="#F5F0EB" />
      <rect y="148" width="360" height="5" fill="#E5E7EB" />
      {/* Blackboard */}
      <rect x="80" y="12" width="200" height="90" rx="4" fill="#166534" />
      <rect x="84" y="16" width="192" height="82" rx="2" fill="#15803D" />
      <text x="180" y="47" textAnchor="middle" fontSize="11" fill="#86EFAC" fontFamily="monospace">y = ax² + bx + c</text>
      <text x="180" y="63" textAnchor="middle" fontSize="11" fill="#86EFAC" fontFamily="monospace">∫f(x)dx = F(x)+C</text>
      <rect x="84" y="94" width="192" height="6" rx="3" fill="#166534" />
      {[100, 160, 220].map((x) => (
        <rect key={x} x={x} y="97" width="24" height="4" rx="2" fill="#D1FAE5" opacity="0.8" />
      ))}
      {/* Clock */}
      <circle cx="310" cy="35" r="26" fill="white" stroke="#D1D5DB" strokeWidth="3" />
      <circle cx="310" cy="35" r="22" fill="#F9FAFB" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const rad = ((angle - 90) * Math.PI) / 180;
        const isMain = angle % 90 === 0;
        return (
          <line
            key={angle}
            x1={310 + Math.cos(rad) * 17}
            y1={35 + Math.sin(rad) * 17}
            x2={310 + Math.cos(rad) * 20}
            y2={35 + Math.sin(rad) * 20}
            stroke={isMain ? "#374151" : "#9CA3AF"}
            strokeWidth={isMain ? 2 : 1}
          />
        );
      })}
      {/* Hour hand */}
      {(() => {
        const rad = (((clockHour * 30) - 90) * Math.PI) / 180;
        return <line x1="310" y1="35" x2={310 + Math.cos(rad) * 12} y2={35 + Math.sin(rad) * 12} stroke="#111827" strokeWidth="3" strokeLinecap="round" />;
      })()}
      {/* Minute hand (always at 12) */}
      <line x1="310" y1="35" x2="310" y2="17" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      <circle cx="310" cy="35" r="2.5" fill="#374151" />
      {/* Desk */}
      <rect x="20" y="170" width="320" height="14" rx="6" fill="#D97706" />
      <rect x="30" y="184" width="140" height="8" rx="4" fill="#B45309" />
      <rect x="190" y="184" width="140" height="8" rx="4" fill="#B45309" />
      {/* Desk legs */}
      <rect x="30" y="182" width="12" height="55" rx="5" fill="#92400E" />
      <rect x="318" y="182" width="12" height="55" rx="5" fill="#92400E" />
      {/* Books */}
      <rect x="30" y="140" width="18" height="32" rx="3" fill={bookColor} />
      <rect x="48" y="143" width="16" height="29" rx="3" fill="#A78BFA" />
      <rect x="64" y="138" width="20" height="34" rx="3" fill="#F472B6" />
      <line x1="48" y1="138" x2="48" y2="172" stroke="#2563EB" strokeWidth="1" opacity="0.4" />
      {/* Text lines on book */}
      {[145, 151, 157, 163].map((y) => (
        <line key={y} x1="34" y1={y} x2="46" y2={y} stroke="white" strokeWidth="1.5" opacity="0.7" />
      ))}
      {/* Notebook */}
      <rect x="100" y="154" width="130" height="18" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
      {[108, 118, 128, 138, 148, 158, 168, 178, 188, 198, 208, 218].map((x) => (
        <line key={x} x1={x} y1="157" x2={x} y2="169" stroke="#E5E7EB" strokeWidth="1" />
      ))}
      <line x1="107" y1="157" x2="228" y2="157" stroke="#BFDBFE" strokeWidth="2" />
      <line x1="107" y1="163" x2="228" y2="163" stroke="#BFDBFE" strokeWidth="1" />
      {/* Pencils: original=3, changed=2 */}
      <rect x="245" y="148" width="8" height="30" rx="3" fill="#FCD34D" />
      <path d="M245 178 L249 186 L253 178 Z" fill="#F87171" />
      <rect x="257" y="150" width="8" height="28" rx="3" fill="#86EFAC" />
      <path d="M257 178 L261 186 L265 178 Z" fill="#F87171" />
      {o && (
        <>
          <rect x="269" y="146" width="8" height="32" rx="3" fill="#FCA5A5" />
          <path d="M269 178 L273 186 L277 178 Z" fill="#F87171" />
        </>
      )}
      {/* Eraser */}
      <rect x="290" y="158" width="28" height="14" rx="4" fill="#FCA5A5" />
      {/* Ruler */}
      <rect x="100" y="174" width="130" height="6" rx="3" fill="#FDE68A" />
      {[110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220].map((x) => (
        <line key={x} x1={x} y1="174" x2={x} y2="177" stroke="#D97706" strokeWidth="1" />
      ))}
      {/* Backpack */}
      <rect x="308" y="152" width="45" height="38" rx="10" fill="#7C3AED" />
      <rect x="313" y="157" width="35" height="24" rx="6" fill="#6D28D9" />
      <circle cx="330" cy="175" r="4" fill="#A78BFA" />
    </svg>
  );
}

// ── Office Desk Scene ───────────────────────────
function OfficeDeskScene({ o }: SceneProps) {
  const mugColor = o ? "#3B82F6" : "#EF4444";
  const monitorText = o ? "REPORT.xlsx" : "GAME.exe";
  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%">
      <defs>
        <linearGradient id="office-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      <rect width="360" height="155" fill="url(#office-wall)" />
      <rect y="155" width="360" height="85" fill="#E2E8F0" />
      <rect y="153" width="360" height="5" fill="#CBD5E1" />
      {/* Wall art */}
      <rect x="260" y="18" width="80" height="55" rx="6" fill="white" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M275 50 L285 35 L297 48 L305 42 L318 55 L332 40 L335 55 L268 55 Z" fill="#86EFAC" />
      <circle cx="290" cy="38" r="8" fill="#FCD34D" />
      {/* Window */}
      <rect x="10" y="10" width="90" height="70" rx="6" fill="#BAE6FD" />
      <rect x="10" y="10" width="90" height="70" rx="6" stroke="#7DD3FC" strokeWidth="2" fill="none" />
      <line x1="55" y1="10" x2="55" y2="80" stroke="#7DD3FC" strokeWidth="1.5" />
      <line x1="10" y1="45" x2="100" y2="45" stroke="#7DD3FC" strokeWidth="1.5" />
      <ellipse cx="42" cy="30" rx="10" ry="8" fill="#FEF9C3" opacity="0.6" />
      <path d="M20 40 Q30 35 42 40 Q52 45 68 40" stroke="#93C5FD" strokeWidth="3" fill="none" opacity="0.5" />
      {/* Plant */}
      <rect x="15" y="110" width="28" height="32" rx="6" fill="#86EFAC" />
      <ellipse cx="29" cy="110" rx="16" ry="6" fill="#4ADE80" />
      {/* Plant leaves: original=4, changed=3 */}
      <ellipse cx="29" cy="82" rx="8" ry="20" fill="#22C55E" transform="rotate(-15 29 82)" />
      <ellipse cx="29" cy="82" rx="8" ry="20" fill="#4ADE80" transform="rotate(15 29 82)" />
      <ellipse cx="15" cy="88" rx="7" ry="18" fill="#22C55E" transform="rotate(-40 15 88)" />
      {o && (
        <ellipse cx="43" cy="88" rx="7" ry="18" fill="#4ADE80" transform="rotate(40 43 88)" />
      )}
      <line x1="29" y1="68" x2="29" y2="110" stroke="#15803D" strokeWidth="2" />
      {/* Desk */}
      <rect x="0" y="162" width="360" height="16" rx="6" fill="#94A3B8" />
      <rect x="0" y="158" width="360" height="6" fill="#CBD5E1" />
      {/* Desk legs */}
      <rect x="15" y="176" width="16" height="60" rx="6" fill="#7F8EA0" />
      <rect x="329" y="176" width="16" height="60" rx="6" fill="#7F8EA0" />
      {/* Monitor */}
      <rect x="100" y="88" width="160" height="4" rx="2" fill="#64748B" />
      <rect x="172" y="90" width="16" height="22" rx="4" fill="#64748B" />
      <rect x="150" y="110" width="60" height="8" rx="4" fill="#64748B" />
      <rect x="108" y="30" width="144" height="62" rx="8" fill="#1E293B" />
      <rect x="112" y="34" width="136" height="54" rx="6" fill="#0F172A" />
      {/* Monitor content */}
      <rect x="115" y="37" width="130" height="47" rx="4" fill="#0EA5E9" opacity="0.15" />
      <text x="180" y="58" textAnchor="middle" fontSize="9" fill="#38BDF8" fontFamily="monospace">{monitorText}</text>
      <rect x="118" y="64" width="80" height="4" rx="2" fill="#38BDF8" opacity="0.4" />
      <rect x="118" y="72" width="60" height="4" rx="2" fill="#38BDF8" opacity="0.3" />
      {/* Keyboard */}
      <rect x="110" y="168" width="140" height="18" rx="6" fill="#94A3B8" />
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={114 + col * 11}
            y={170 + row * 3}
            width="9"
            height="2"
            rx="0.5"
            fill="#CBD5E1"
          />
        ))
      )}
      {/* Mug */}
      <rect x="272" y="143" width="36" height="32" rx="8" fill={mugColor} />
      <rect x="276" y="147" width="28" height="24" rx="6" fill={mugColor} />
      <ellipse cx="290" cy="147" rx="17" ry="5" fill="white" opacity="0.25" />
      <path d="M308 152 Q320 152 320 162 Q320 172 308 172" stroke={mugColor} strokeWidth="4" fill="none" />
      <text x="290" y="163" textAnchor="middle" fontSize="12">☕</text>
      {/* Paper stack */}
      <rect x="20" y="156" width="60" height="8" rx="2" fill="white" />
      <rect x="18" y="152" width="60" height="8" rx="2" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="16" y="148" width="60" height="8" rx="2" fill="white" stroke="#E2E8F0" strokeWidth="1" />
      <line x1="20" y1="151" x2="72" y2="151" stroke="#E2E8F0" strokeWidth="1" />
      <line x1="20" y1="155" x2="72" y2="155" stroke="#E2E8F0" strokeWidth="1" />
      {/* Mouse */}
      <rect x="288" y="174" width="28" height="20" rx="12" fill="#64748B" />
      <line x1="302" y1="174" x2="302" y2="184" stroke="#475569" strokeWidth="1.5" />
      <ellipse cx="302" cy="180" rx="2" ry="3" fill="#94A3B8" />
      {/* Sticky note */}
      <rect x="250" y="120" width="35" height="30" rx="3" fill="#FDE68A" transform="rotate(-5 250 120)" />
      <line x1="254" y1="132" x2="282" y2="128" stroke="#D97706" strokeWidth="1.5" opacity="0.7" />
      <line x1="254" y1="138" x2="282" y2="134" stroke="#D97706" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

// ── Beach Picnic Scene ──────────────────────────
function BeachPicnicScene({ o }: SceneProps) {
  const hasStripes = o;
  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%">
      <defs>
        <linearGradient id="beach-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </linearGradient>
        <linearGradient id="beach-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="beach-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#FCD34D" />
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="360" height="130" fill="url(#beach-sky)" />
      {/* Sun */}
      <circle cx="300" cy="38" r="28" fill="#FDE68A" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={300 + Math.cos(rad) * 32}
            y1={38 + Math.sin(rad) * 32}
            x2={300 + Math.cos(rad) * 42}
            y2={38 + Math.sin(rad) * 42}
            stroke="#FCD34D"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
      {/* Clouds */}
      <ellipse cx="80" cy="35" rx="35" ry="16" fill="white" opacity="0.9" />
      <ellipse cx="108" cy="27" rx="28" ry="16" fill="white" opacity="0.9" />
      <ellipse cx="60" cy="34" rx="20" ry="13" fill="white" opacity="0.85" />
      {/* Sea */}
      <rect y="130" width="360" height="50" fill="url(#beach-sea)" />
      {/* Waves: original=3, changed=2 */}
      <path d="M0 145 Q30 138 60 145 Q90 152 120 145 Q150 138 180 145" stroke="white" strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M0 158 Q40 151 80 158 Q120 165 160 158 Q200 151 240 158 Q280 165 320 158 Q340 151 360 158" stroke="white" strokeWidth="2.5" fill="none" opacity="0.5" />
      {o && (
        <path d="M180 145 Q210 138 240 145 Q270 152 300 145 Q330 138 360 145" stroke="white" strokeWidth="2.5" fill="none" opacity="0.5" />
      )}
      {/* Sand */}
      <rect y="178" width="360" height="62" fill="url(#beach-sand)" />
      {/* Sand texture dots */}
      {[30, 80, 130, 220, 290, 330].map((x) =>
        [188, 198, 210].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#F59E0B" opacity="0.4" />
        ))
      )}
      {/* Picnic mat */}
      <ellipse cx="180" cy="210" rx="100" ry="20" fill="#FCA5A5" opacity="0.7" />
      <ellipse cx="180" cy="207" rx="94" ry="17" fill="#F9A8D4" opacity="0.8" />
      {/* Picnic basket */}
      <rect x="85" y="186" width="50" height="32" rx="8" fill="#D97706" />
      <rect x="83" y="183" width="54" height="8" rx="4" fill="#B45309" />
      <path d="M100 183 Q110 170 120 183" stroke="#B45309" strokeWidth="3" fill="none" />
      {/* Basket weave */}
      {[90, 100, 110, 120].map((x) => (
        <line key={x} x1={x} y1="191" x2={x} y2="218" stroke="#B45309" strokeWidth="1.5" opacity="0.5" />
      ))}
      {[191, 199, 207, 215].map((y) => (
        <line key={y} x1="85" y1={y} x2="135" y2={y} stroke="#B45309" strokeWidth="1" opacity="0.5" />
      ))}
      {/* Umbrella pole */}
      <line x1="180" y1="185" x2="180" y2="65" stroke="#64748B" strokeWidth="3" />
      {/* Umbrella canopy: original=striped, changed=solid */}
      <path d="M100 90 Q180 42 260 90 Z" fill="#F87171" />
      {hasStripes ? (
        <>
          <path d="M100 90 Q120 55 140 90 Z" fill="white" opacity="0.7" />
          <path d="M140 90 Q160 45 180 90 Z" fill="white" opacity="0" />
          <path d="M180 90 Q200 48 220 90 Z" fill="white" opacity="0.7" />
          <path d="M220 90 Q240 55 260 90 Z" fill="white" opacity="0" />
        </>
      ) : null}
      <path d="M100 90 Q180 42 260 90 Z" fill="none" stroke="#EF4444" strokeWidth="2" />
      <circle cx="180" cy="90" r="8" fill="#B91C1C" />
      {/* Food items */}
      <text x="200" y="208" fontSize="20" textAnchor="middle">🍉</text>
      <text x="228" y="205" fontSize="18" textAnchor="middle">🧃</text>
      <text x="155" y="210" fontSize="18" textAnchor="middle">🥪</text>
      {/* Crab: original=present, changed=absent */}
      {o && <text x="282" y="230" fontSize="22" textAnchor="middle">🦀</text>}
      {/* Seagull */}
      <path d="M50 100 Q57 95 64 100" stroke="#64748B" strokeWidth="2" fill="none" />
      <path d="M55 98 Q62 93 69 98" stroke="#64748B" strokeWidth="2" fill="none" />
    </svg>
  );
}

// ── Camping Scene ───────────────────────────────
function CampingScene({ o }: SceneProps) {
  const tentColor = o ? "#3B82F6" : "#22C55E";
  const tentDark = o ? "#1D4ED8" : "#15803D";
  const starCount = o ? 5 : 4;
  const logCount = o ? 3 : 2;
  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%">
      <defs>
        <linearGradient id="camp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E3A5F" />
        </linearGradient>
        <linearGradient id="camp-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14532D" />
          <stop offset="100%" stopColor="#052E16" />
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="360" height="175" fill="url(#camp-sky)" />
      {/* Moon */}
      <circle cx="50" cy="38" r="22" fill="#FEF9C3" />
      <circle cx="60" cy="30" r="18" fill="#1E3A5F" />
      {/* Stars */}
      {[
        [120, 22], [165, 15], [210, 28], [265, 18], [310, 30],
        [88, 48], [145, 55], [290, 48], [335, 22], [70, 70],
      ].map(([x, y], i) => (
        i < starCount + 5 ? (
          <g key={i}>
            <circle cx={x} cy={y} r="2" fill="white" opacity={0.7 + (i % 3) * 0.1} />
            <circle cx={x} cy={y} r="1" fill="white" />
          </g>
        ) : null
      ))}
      {/* Extra star only in original */}
      {[
        [180, 12], [240, 42], [320, 58], [95, 62], [340, 40],
      ].slice(0, starCount - 4).map(([x, y], i) => (
        <g key={i + 100}>
          <circle cx={x} cy={y} r="2" fill="#FEF9C3" opacity="0.8" />
        </g>
      ))}
      {/* Trees */}
      <path d="M15 175 L45 90 L75 175 Z" fill="#166534" />
      <path d="M22 175 L45 110 L68 175 Z" fill="#15803D" />
      <rect x="37" y="175" width="16" height="25" rx="3" fill="#92400E" />
      <path d="M290 175 L320 95 L350 175 Z" fill="#166534" />
      <path d="M297 175 L320 115 L343 175 Z" fill="#15803D" />
      <rect x="312" y="175" width="16" height="25" rx="3" fill="#92400E" />
      <path d="M258 175 L278 120 L298 175 Z" fill="#14532D" />
      {/* Ground */}
      <rect y="175" width="360" height="65" fill="url(#camp-ground)" />
      {/* Grass bumps */}
      <path d="M0 178 Q30 172 60 178 Q90 184 120 178 Q150 172 180 178 Q210 184 240 178 Q270 172 300 178 Q330 184 360 178" stroke="#16A34A" strokeWidth="3" fill="none" />
      {/* Tent */}
      <path d="M108 200 L180 118 L252 200 Z" fill={tentColor} />
      <path d="M108 200 L180 118 L158 200 Z" fill={tentDark} opacity="0.5" />
      <rect x="152" y="182" width="56" height="18" rx="4" fill="#F5F3FF" opacity="0.9" />
      <line x1="180" y1="182" x2="180" y2="200" stroke="#E5E7EB" strokeWidth="2" />
      {/* Tent pegs */}
      <line x1="108" y1="200" x2="96" y2="214" stroke="#64748B" strokeWidth="2" />
      <line x1="252" y1="200" x2="264" y2="214" stroke="#64748B" strokeWidth="2" />
      <circle cx="96" cy="214" r="3" fill="#94A3B8" />
      <circle cx="264" cy="214" r="3" fill="#94A3B8" />
      {/* Campfire */}
      <ellipse cx="310" cy="206" rx="24" ry="8" fill="#92400E" opacity="0.8" />
      {/* Logs: original=3, changed=2 */}
      <rect x="292" y="200" width="36" height="8" rx="4" fill="#78350F" transform="rotate(-15 292 200)" />
      <rect x="296" y="200" width="36" height="8" rx="4" fill="#92400E" transform="rotate(15 296 200)" />
      {logCount === 3 && (
        <rect x="294" y="198" width="32" height="8" rx="4" fill="#7C2D12" transform="rotate(0 294 198)" />
      )}
      {/* Fire flames */}
      <ellipse cx="310" cy="188" rx="14" ry="20" fill="#F97316" opacity="0.9" />
      <ellipse cx="310" cy="185" rx="9" ry="15" fill="#FCD34D" opacity="0.9" />
      <ellipse cx="305" cy="192" rx="6" ry="12" fill="#EF4444" opacity="0.7" />
      <ellipse cx="315" cy="190" rx="5" ry="10" fill="#EF4444" opacity="0.7" />
      {/* Firelight glow on ground */}
      <ellipse cx="310" cy="210" rx="40" ry="12" fill="#F97316" opacity="0.15" />
      {/* Camping chair */}
      <rect x="50" y="192" width="40" height="5" rx="2" fill="#64748B" />
      <rect x="53" y="178" width="34" height="16" rx="4" fill="#7C3AED" />
      <line x1="50" y1="197" x2="45" y2="220" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      <line x1="90" y1="197" x2="95" y2="220" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="178" x2="45" y2="210" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      <line x1="87" y1="178" x2="95" y2="210" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ── Subway Scene ─────────────────────────────────
function SubwayScene({ o }: SceneProps) {
  const seatColor1 = o ? "#F97316" : "#7C3AED";
  const adText = o ? "봄 여행 특가" : "여름 상품권";
  const windowOpen = o;
  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%">
      <defs>
        <linearGradient id="subway-ceiling" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      {/* Car interior ceiling */}
      <rect width="360" height="35" fill="url(#subway-ceiling)" />
      <rect y="33" width="360" height="5" fill="#CBD5E1" />
      {/* Handrail bar */}
      <rect x="0" y="62" width="360" height="8" rx="4" fill="#94A3B8" />
      {/* Handrail rings */}
      {[40, 100, 160, 220, 280, 330].map((x) => (
        <rect key={x} x={x - 6} y="38" width="12" height="28" rx="6" fill="#64748B" />
      ))}
      {/* Overhead panel */}
      <rect y="0" width="360" height="38" fill="#F8FAFC" />
      {/* Route display */}
      <rect x="110" y="6" width="140" height="20" rx="4" fill="#0F172A" />
      <text x="180" y="20" textAnchor="middle" fontSize="9" fill="#22D3EE" fontFamily="monospace">● 강남역 → 역삼역</text>
      {/* Windows */}
      <rect x="8" y="38" width="70" height="62" rx="6" fill={windowOpen ? "#BAE6FD" : "#7DD3FC"} />
      <rect x="8" y="38" width="70" height="62" rx="6" stroke="#7DD3FC" strokeWidth="2" fill="none" />
      {windowOpen ? (
        <rect x="8" y="38" width="70" height="28" rx="6" fill="#93C5FD" />
      ) : (
        <rect x="8" y="100" width="70" height="2" fill="#7DD3FC" />
      )}
      <rect x="88" y="38" width="70" height="62" rx="6" fill="#BAE6FD" />
      <rect x="88" y="38" width="70" height="62" rx="6" stroke="#7DD3FC" strokeWidth="2" fill="none" />
      {/* Middle window (the one with advert area) */}
      <rect x="168" y="8" width="85" height="25" rx="4" fill="white" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="170" y="10" width="81" height="21" rx="3" fill="#DBEAFE" />
      <text x="210" y="24" textAnchor="middle" fontSize="8" fill="#1E40AF" fontWeight="bold">{adText}</text>
      <rect x="263" y="8" width="85" height="25" rx="4" fill="white" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="265" y="10" width="81" height="21" rx="3" fill="#FCE7F3" />
      <text x="305" y="24" textAnchor="middle" fontSize="8" fill="#9D174D" fontWeight="bold">광고문의 1234</text>
      {/* Floor */}
      <rect y="185" width="360" height="55" fill="#F1F5F9" />
      <rect y="183" width="360" height="5" fill="#CBD5E1" />
      {/* Floor pattern */}
      {[0, 60, 120, 180, 240, 300].map((x) => (
        <rect key={x} x={x} y="185" width="58" height="55" fill={x % 120 === 0 ? "#E2E8F0" : "#F1F5F9"} />
      ))}
      {/* Seats - row */}
      {/* Seat 1 */}
      <rect x="5" y="155" width="58" height="30" rx="8" fill={seatColor1} />
      <rect x="5" y="138" width="58" height="20" rx="6" fill={seatColor1} />
      {/* Seat 2 */}
      <rect x="68" y="155" width="58" height="30" rx="8" fill="#F97316" />
      <rect x="68" y="138" width="58" height="20" rx="6" fill="#F97316" />
      {/* Seat 3 */}
      <rect x="131" y="155" width="58" height="30" rx="8" fill="#F97316" />
      <rect x="131" y="138" width="58" height="20" rx="6" fill="#F97316" />
      {/* Seat 4 */}
      <rect x="194" y="155" width="58" height="30" rx="8" fill="#F97316" />
      <rect x="194" y="138" width="58" height="20" rx="6" fill="#F97316" />
      {/* Seat 5 */}
      <rect x="257" y="155" width="58" height="30" rx="8" fill="#F97316" />
      <rect x="257" y="138" width="58" height="20" rx="6" fill="#F97316" />
      {/* Seat 6 */}
      <rect x="297" y="155" width="58" height="30" rx="8" fill="#F97316" />
      <rect x="297" y="138" width="58" height="20" rx="6" fill="#F97316" />
      {/* Passengers */}
      <circle cx="97" cy="130" r="11" fill="#FBBF24" />
      <rect x="85" y="140" width="24" height="18" rx="8" fill="#3B82F6" />
      <circle cx="160" cy="130" r="11" fill="#FCA5A5" />
      <rect x="148" y="140" width="24" height="18" rx="8" fill="#EC4899" />
      <circle cx="223" cy="128" r="11" fill="#A78BFA" />
      <rect x="211" y="138" width="24" height="18" rx="8" fill="#7C3AED" />
      {/* Bag on seat */}
      <rect x="270" y="148" width="28" height="20" rx="6" fill="#D97706" />
      <rect x="274" y="142" width="20" height="8" rx="4" fill="#B45309" />
    </svg>
  );
}

// ── Birthday Scene ───────────────────────────────
function BirthdayScene({ o }: SceneProps) {
  const candleCount = o ? 5 : 4;
  const balloonColor = o ? "#EF4444" : "#3B82F6";
  const ribbonColor = o ? "#EF4444" : "#22C55E";
  const cakeLayers = o ? 3 : 2;
  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%">
      <defs>
        <linearGradient id="bday-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDF4FF" />
          <stop offset="100%" stopColor="#FAE8FF" />
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width="360" height="240" fill="url(#bday-bg)" />
      {/* Banner */}
      <path d="M40 30 L320 30" stroke="#FBBF24" strokeWidth="2" strokeDasharray="8,6" />
      {["🎉", "🎊", "🎈", "⭐", "🎊", "🎉"].map((em, i) => (
        <text key={i} x={56 + i * 46} y="28" fontSize="16" textAnchor="middle">{em}</text>
      ))}
      {/* Table */}
      <rect x="40" y="185" width="280" height="14" rx="7" fill="#D97706" />
      <rect x="40" y="197" width="12" height="40" rx="5" fill="#B45309" />
      <rect x="308" y="197" width="12" height="40" rx="5" fill="#B45309" />
      {/* Tablecloth */}
      <rect x="42" y="182" width="276" height="6" rx="3" fill="#FBCFE8" />
      {/* Balloons left */}
      <circle cx="70" cy="80" r="28" fill={balloonColor} />
      <path d="M70 108 Q73 125 70 140" stroke={balloonColor} strokeWidth="2" fill="none" />
      <ellipse cx="60" cy="90" rx="8" ry="5" fill="white" opacity="0.25" />
      <circle cx="130" cy="65" r="24" fill="#A78BFA" />
      <path d="M130 89 Q133 105 130 120" stroke="#A78BFA" strokeWidth="2" fill="none" />
      <ellipse cx="121" cy="74" rx="7" ry="4" fill="white" opacity="0.25" />
      {/* Balloons right */}
      <circle cx="290" cy="72" r="26" fill="#FBBF24" />
      <path d="M290 98 Q293 115 290 130" stroke="#FBBF24" strokeWidth="2" fill="none" />
      <ellipse cx="280" cy="80" rx="7" ry="5" fill="white" opacity="0.25" />
      <circle cx="338" cy="88" r="22" fill="#4ADE80" />
      <path d="M338 110 Q341 125 338 138" stroke="#4ADE80" strokeWidth="2" fill="none" />
      {/* Streamers */}
      <path d="M40 40 Q80 65 60 100" stroke="#F472B6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M320 40 Q280 65 300 100" stroke="#34D399" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* === Cake === */}
      {/* Bottom layer */}
      <rect x="125" y={cakeLayers === 3 ? 162 : 155} width="110" height="24" rx="6" fill="#FCA5A5" />
      <rect x="125" y={cakeLayers === 3 ? 162 : 155} width="110" height="8" rx="6" fill="white" opacity="0.5" />
      {/* Middle layer (only in original=3 layers) */}
      {cakeLayers === 3 && (
        <>
          <rect x="135" y="142" width="90" height="22" rx="5" fill="#FDE68A" />
          <rect x="135" y="142" width="90" height="7" rx="5" fill="white" opacity="0.5" />
        </>
      )}
      {/* Top layer */}
      <rect x={cakeLayers === 3 ? 148 : 140} y={cakeLayers === 3 ? 125 : 132} width={cakeLayers === 3 ? 64 : 80} height={cakeLayers === 3 ? 19 : 24} rx="5" fill="#C4B5FD" />
      <rect x={cakeLayers === 3 ? 148 : 140} y={cakeLayers === 3 ? 125 : 132} width={cakeLayers === 3 ? 64 : 80} height="6" rx="5" fill="white" opacity="0.5" />
      {/* Frosting drips */}
      {[135, 148, 162, 176, 190, 205, 218].map((x) => (
        <path key={x} d={`M${x} ${cakeLayers === 3 ? 162 : 155} Q${x + 3} ${cakeLayers === 3 ? 170 : 163} ${x + 6} ${cakeLayers === 3 ? 162 : 155}`} fill="white" opacity="0.6" />
      ))}
      {/* Candles */}
      {Array.from({ length: candleCount }, (_, i) => {
        const totalWidth = cakeLayers === 3 ? 54 : 68;
        const startX = cakeLayers === 3 ? 155 : 148;
        const x = startX + (i * totalWidth) / (candleCount - 1 || 1);
        const topY = cakeLayers === 3 ? 125 : 132;
        return (
          <g key={i}>
            <rect x={x - 3} y={topY - 16} width="6" height="16" rx="3" fill={["#F472B6", "#FCD34D", "#34D399", "#60A5FA", "#F87171"][i % 5]} />
            {/* Flame */}
            <ellipse cx={x} cy={topY - 19} rx="3" ry="5" fill="#FCD34D" />
            <ellipse cx={x} cy={topY - 21} rx="2" ry="3" fill="#F97316" />
          </g>
        );
      })}
      {/* Present box left */}
      <rect x="42" y="158" width="55" height="28" rx="6" fill="#60A5FA" />
      <rect x="42" y="153" width="55" height="8" rx="4" fill="#3B82F6" />
      {/* Ribbon */}
      <rect x="66" y="153" width="7" height="36" rx="3" fill={ribbonColor} />
      <rect x="42" y="162" width="55" height="7" rx="3" fill={ribbonColor} />
      {/* Bow */}
      <path d="M65 153 Q58 144 50 148 Q58 152 65 153" fill={ribbonColor} />
      <path d="M72 153 Q79 144 87 148 Q79 152 72 153" fill={ribbonColor} />
      {/* Present box right */}
      <rect x="263" y="162" width="55" height="24" rx="6" fill="#4ADE80" />
      <rect x="263" y="157" width="55" height="8" rx="4" fill="#22C55E" />
      <rect x="287" y="157" width="7" height="32" rx="3" fill="#FCD34D" />
      <rect x="263" y="166" width="55" height="7" rx="3" fill="#FCD34D" />
      {/* Plates and cups */}
      <ellipse cx="175" cy="190" rx="40" ry="9" fill="#F3F4F6" />
      <ellipse cx="175" cy="188" rx="36" ry="7" fill="white" />
      <text x="175" y="194" textAnchor="middle" fontSize="18">🍰</text>
    </svg>
  );
}

// ── Main Export ─────────────────────────────────
type Props = {
  sceneType: SceneType;
  variant: "original" | "changed";
  className?: string;
};

export default function SpotScene({ sceneType, variant, className }: Props) {
  const o = variant === "original";

  const sceneMap: Record<SceneType, React.ReactElement> = {
    cafe: <CafeScene o={o} />,
    convenience: <ConvenienceScene o={o} />,
    "cat-room": <CatRoomScene o={o} />,
    "dog-walk": <DogWalkScene o={o} />,
    "school-desk": <SchoolDeskScene o={o} />,
    "office-desk": <OfficeDeskScene o={o} />,
    "beach-picnic": <BeachPicnicScene o={o} />,
    camping: <CampingScene o={o} />,
    subway: <SubwayScene o={o} />,
    birthday: <BirthdayScene o={o} />,
  };

  return (
    <div className={className} style={{ lineHeight: 0, width: "100%", height: "100%" }}>
      {sceneMap[sceneType] ?? sceneMap.cafe}
    </div>
  );
}
