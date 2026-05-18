// 소요 시간 포맷
export function formatMinutes(minutes: number): string {
  if (minutes < 1) return "1분 미만";
  return `약 ${minutes}분`;
}

// 날짜 포맷 (YYYY.MM.DD)
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

// 숫자에 천단위 쉼표 추가
export function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

// 문자열 길이 제한 + 말줄임표
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1) + "…";
}

// 퍼센트 포맷
export function formatPercent(value: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}
