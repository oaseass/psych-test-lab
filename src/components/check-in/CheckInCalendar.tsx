"use client";

interface Props {
  /** "YYYY-MM-DD" 형식 출석 날짜 배열 */
  checkedDates: string[];
  /** 오늘 날짜 "YYYY-MM-DD" */
  today: string;
  /** 현재 연속 출석일 */
  streak: number;
}

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

export default function CheckInCalendar({ checkedDates, today, streak }: Props) {
  const [yearStr, monthStr] = today.split("-");
  const year = Number(yearStr);
  const monthIdx = Number(monthStr); // 1-indexed
  const month0 = monthIdx - 1;      // 0-indexed for Date

  const firstDayOfWeek = new Date(year, month0, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month0 + 1, 0).getDate();

  const checkedSet = new Set(checkedDates);
  const thisMonthPrefix = `${yearStr}-${monthStr}`;
  const thisMonthCount = checkedDates.filter((d) => d.startsWith(thisMonthPrefix)).length;

  /** "YYYY-MM-DD" 문자열 생성 */
  function dateStr(day: number): string {
    return `${yearStr}-${monthStr}-${String(day).padStart(2, "0")}`;
  }

  /** 0-based 요일 계산 (0=일, 6=토) */
  function dayOfWeek(day: number): number {
    return (firstDayOfWeek + day - 1) % 7;
  }

  // 달력 셀 배열: null = 앞 빈 칸, number = 해당 일
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDayOfWeek }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 text-sm">이번 달 출석 현황</h3>
        <div className="flex items-center gap-2">
          {streak > 0 && (
            <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
              🔥 {streak}일 연속
            </span>
          )}
          <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
            출석 {thisMonthCount}일
          </span>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-semibold py-1 ${
              i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-gray-400"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 달력 칸 */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e-${idx}`} className="h-9" />;

          const ds = dateStr(day);
          const isToday = ds === today;
          const isChecked = checkedSet.has(ds);
          const isPast = ds < today;
          const isFuture = ds > today;
          const dow = dayOfWeek(day);
          const isSunday = dow === 0;
          const isSaturday = dow === 6;

          // 연속 출석 연결 바 (같은 행 안에서 양옆이 체크된 경우)
          const prevDs = day > 1 ? dateStr(day - 1) : null;
          const nextDs = day < daysInMonth ? dateStr(day + 1) : null;
          const prevChecked = prevDs ? checkedSet.has(prevDs) : false;
          const nextChecked = nextDs ? checkedSet.has(nextDs) : false;
          const connectLeft = isChecked && prevChecked && dow !== 0;
          const connectRight = isChecked && nextChecked && dow !== 6;

          // 숫자 색상
          let numColor = "text-gray-700";
          if (isSunday && !isFuture) numColor = "text-red-400";
          else if (isSaturday && !isFuture) numColor = "text-blue-400";
          if (isPast && !isChecked) numColor = "text-gray-300";
          if (isFuture) numColor = "text-gray-200";

          return (
            <div key={day} className="relative h-9 flex items-center justify-center">
              {/* 연속 연결 바 - 왼쪽 */}
              {connectLeft && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-7 bg-violet-100 z-0" />
              )}
              {/* 연속 연결 바 - 오른쪽 */}
              {connectRight && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-7 bg-violet-100 z-0" />
              )}

              {/* 날짜 원 */}
              <div
                className={[
                  "relative z-10 w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold transition-all",
                  isChecked && isToday
                    ? "bg-violet-600 text-white ring-2 ring-violet-400 ring-offset-1"
                    : isChecked
                    ? "bg-violet-600 text-white"
                    : isToday
                    ? "border-2 border-violet-500 font-extrabold text-violet-700"
                    : "",
                ].join(" ")}
              >
                {isChecked ? (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path
                      d="M2.5 6.5L5.2 9.5L10.5 3.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className={numColor}>{day}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50 justify-center">
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <span className="w-4 h-4 rounded-full bg-violet-600 inline-block" />
          출석
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <span className="w-4 h-4 rounded-full border-2 border-violet-500 inline-block" />
          오늘
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <span className="w-4 h-4 rounded-full bg-gray-100 inline-block" />
          미출석
        </span>
      </div>
    </div>
  );
}
