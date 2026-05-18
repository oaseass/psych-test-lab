import type { Rank } from "@/lib/user/types";

export const GUEST_RANK: Rank = {
  id: "guest",
  name: "훈련병",
  icon: "ㅡ",
  minPoints: 0,
  description: "아직 이름도 없는 신병. 회원가입하면 이등병부터 시작해요.",
};

export const MEMBER_RANKS: Rank[] = [
  { id: "private2", name: "이등병", icon: "★", minPoints: 500, description: "갓 입대한 신병. 포인트를 모아 진급하세요." },
  { id: "private1", name: "일병", icon: "★★", minPoints: 1500, description: "기본기를 익히고 있는 병사." },
  { id: "corporal", name: "상병", icon: "★★★", minPoints: 3000, description: "어느 정도 경험이 쌓인 병사." },
  { id: "sergeant", name: "병장", icon: "◆", minPoints: 5000, description: "말년 병장의 여유를 가진 베테랑." },
  { id: "staff_sgt", name: "하사", icon: "◆★", minPoints: 8000, description: "부사관으로 진급! 이제 진짜 시작." },
  { id: "sergeant2", name: "중사", icon: "◆★★", minPoints: 12000, description: "중견 부사관. 팀을 이끄는 리더." },
  { id: "master_sgt", name: "상사", icon: "◆★★★", minPoints: 18000, description: "베테랑 부사관. 경험에서 우러나오는 실력." },
  { id: "warrant", name: "원사", icon: "♛", minPoints: 25000, description: "최고참 부사관. 존경받는 실력자." },
  { id: "2nd_lt", name: "소위", icon: "♛★", minPoints: 35000, description: "장교 임관! 이제 지휘관 반열에." },
  { id: "1st_lt", name: "중위", icon: "♛★★", minPoints: 50000, description: "중견 장교. 팀을 이끄는 지휘관." },
  { id: "captain", name: "대위", icon: "♛★★★", minPoints: 70000, description: "중대장급 지휘관. 넓은 시야를 가진 리더." },
  { id: "major", name: "소령", icon: "👑", minPoints: 100000, description: "영관급 장교. 전략적 사고를 갖춘 지휘관." },
  { id: "lt_col", name: "중령", icon: "👑★", minPoints: 150000, description: "대대장급 지휘관. 조직을 움직이는 힘." },
  { id: "colonel", name: "대령", icon: "👑★★", minPoints: 220000, description: "연대장급 지휘관. 극소수만 오른 자리." },
  { id: "general", name: "장군", icon: "👑★★★", minPoints: 300000, description: "최고 계급. 심심풀이 연구소 레전드." },
];

export const ALL_RANKS: Rank[] = [GUEST_RANK, ...MEMBER_RANKS];
