import { getMockContentPerformance } from "./mockAdminData";
import type { AdminAlert } from "./types";

// ── 품질 감사 항목 타입 ──────────────────────────────────────────────
export type QualityAuditItem = {
  id: string;
  label: string;
  count: number;
  status: "ok" | "warning" | "danger";
  hint: string;
  actionHref?: string;
};

// 프로토타입 콘텐츠가 메인에 노출 중인지 등을 체크
// 실제 데이터 연동 전 규칙 기반 정적 체크
export function getQualityAudit(): QualityAuditItem[] {
  return [
    {
      id: "play_not_working",
      label: "플레이 불가 테스트 목록 노출",
      count: 100,
      status: "danger",
      hint: "전수검수 결과 100개 테스트가 플레이 불가 또는 미완성 상태입니다. hidden 처리 후 /tests에서 제외됩니다.",
      actionHref: "/admin/content",
    },
    {
      id: "hidden_tests_count",
      label: "hidden 처리된 테스트 수",
      count: 100,
      status: "warning",
      hint: "120개 중 100개가 전수검수 미통과로 비노출(hidden) 상태입니다. 검수 완료 후 순차 공개 필요.",
      actionHref: "/admin/content",
    },
    {
      id: "polished_tests_count",
      label: "플레이 가능 (polished) 테스트 수",
      count: 20,
      status: "ok",
      hint: "현재 전수검수를 통과한 20개 테스트만 /tests와 메인에서 노출됩니다.",
    },
    {
      id: "main_exposed_count",
      label: "메인 상단 노출 콘텐츠 수",
      count: 7,
      status: "ok",
      hint: "메인 페이지 상단: 심심버튼, 오늘의 놀이, 월드컵, 초성퀴즈, 돈쓰기 시뮬레이터, 비밀번호 지옥, 같이놀기 방 만들기 7개만 노출 중.",
    },
    {
      id: "prototype_on_main",
      label: "prototype인데 메인 노출 중인 콘텐츠",
      count: 0,
      status: "ok",
      hint: "메인 상단에 prototype/hidden 콘텐츠가 노출되지 않습니다.",
    },
    {
      id: "ad_placeholder_visible",
      label: "광고 placeholder 사용자 노출",
      count: 0,
      status: "ok",
      hint: "AdSlot 컴포넌트가 프로덕션에서 null을 반환합니다. 개발 모드에서만 placeholder 표시.",
    },
    {
      id: "together_policy_conflict",
      label: "같이놀기 정책 문구 충돌",
      count: 0,
      status: "ok",
      hint: "같이놀기 페이지 문구가 '회원 전용 · 링크 공유 · 친구랑 같이하기'로 통일됐습니다.",
    },
    {
      id: "ai_room_main_cta",
      label: "AI 연습방 전면 노출",
      count: 0,
      status: "ok",
      hint: "AI 연습방은 하단 보조 섹션으로만 노출되며 메인 CTA에서 제외됐습니다.",
    },
    {
      id: "fake_numbers",
      label: "가짜 참여자 수/통계 노출",
      count: 0,
      status: "ok",
      hint: "viralScore 기반 가짜 숫자 표시가 제거됐습니다.",
    },
    {
      id: "brand_mismatch",
      label: "구 브랜드명('심리테스트 연구소') 잔존",
      count: 0,
      status: "ok",
      hint: "브랜드명이 '심심풀이 연구소'로 통일되었습니다.",
    },
    {
      id: "no_ranking",
      label: "랭킹/통계 없는 게임 콘텐츠",
      count: 4,
      status: "warning",
      hint: "반응속도, 관찰력, 기억력, 틀린그림찾기가 아직 랭킹 미연동 상태입니다.",
      actionHref: "/admin/rankings",
    },
    {
      id: "mobile_quality",
      label: "모바일 품질 낮은 콘텐츠",
      count: 2,
      status: "warning",
      hint: "틀린그림찾기, 관찰력 테스트가 소형 모바일에서 UX가 열악합니다.",
      actionHref: "/admin/content",
    },
  ];
}


export function getDailyReport() {
  const content = getMockContentPerformance();
  const top10 = [...content].sort((a, b) => b.impressions - a.impressions).slice(0, 10);
  const topCompletion = [...content].sort((a, b) => b.completionRate - a.completionRate).slice(0, 10);
  const topShare = [...content].sort((a, b) => b.shareRate - a.shareRate).slice(0, 10);
  const topSignup = [...content].sort((a, b) => b.signupRate - a.signupRate).slice(0, 10);
  const problems = content.filter(c => c.completionRate < 35 || c.shareRate < 1);

  return { top10, topCompletion, topShare, topSignup, problems };
}

export function getWeeklyReport() {
  return getDailyReport();
}

export function getActionItems(): AdminAlert[] {
  const content = getMockContentPerformance();
  const lowCompletion = content.filter(c => c.completionRate < 40);
  const highShare = content.filter(c => c.shareRate >= 3);
  const alerts: AdminAlert[] = [];

  if (lowCompletion.length > 0) {
    alerts.push({ id: "low-comp", level: "warning", title: `완료율 낮은 콘텐츠 ${lowCompletion.length}개`, message: "완료율 40% 미만 콘텐츠를 개선하거나 숨김 처리하세요.", actionLabel: "콘텐츠 관리", actionHref: "/admin/content" });
  }
  if (highShare.length > 0) {
    alerts.push({ id: "high-share", level: "success", title: `공유율 높은 콘텐츠 ${highShare.length}개 발견`, message: "공유율 3% 이상 콘텐츠를 메인에 올려보세요.", actionLabel: "콘텐츠 관리", actionHref: "/admin/content" });
  }
  alerts.push({ id: "sponsor-new", level: "info", title: "협찬 신규 문의 확인", message: "새로운 협찬 문의가 있습니다. 확인하고 제안서를 보내세요.", actionLabel: "협찬 관리", actionHref: "/admin/sponsors" });
  alerts.push({ id: "point-econ", level: "warning", title: "포인트 공급/소모 비율 점검", message: "럭키존 포인트 지급량이 소모량보다 2.5배 높습니다. 소모 채널 강화를 검토하세요.", actionLabel: "포인트 관리", actionHref: "/admin/points" });

  return alerts;
}

export function getKpiAlerts() {
  const kpis = [
    { id: "completion", label: "콘텐츠 완료율", current: 52.3, target: 55, unit: "%" },
    { id: "share", label: "결과 공유율", current: 1.8, target: 3, unit: "%" },
    { id: "signup", label: "회원가입 전환율", current: 1.5, target: 2, unit: "%" },
    { id: "retention7", label: "7일 재방문율", current: 14.8, target: 15, unit: "%" },
    { id: "pps", label: "세션당 페이지뷰", current: 4.2, target: 5, unit: "" },
    { id: "together_rate", label: "같이놀기 방 생성률", current: 0.8, target: 1, unit: "%" },
    { id: "checkin", label: "출석체크율", current: 24.1, target: 20, unit: "%" },
    { id: "shop", label: "포인트 상점 구매율", current: 6.2, target: 5, unit: "%" },
  ];

  return kpis.map(k => ({
    ...k,
    achieved: k.current >= k.target,
    gap: k.current - k.target,
  }));
}
