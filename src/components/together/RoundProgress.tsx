// RoundProgress - 라운드 진행 표시
interface Props {
  current: number;
  total: number;
  label?: string;
}

export default function RoundProgress({ current, total, label }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-gray-600">
          {label ? label : `라운드 ${current} / ${total}`}
        </span>
        <span className="text-xs text-gray-400">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
