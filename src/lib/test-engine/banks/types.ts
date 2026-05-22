// banks/types.ts
// QA 뱅크 / 결과 뱅크에서 공용으로 쓰는 타입 정의

/** 선택지 – 구버전(string)과 신버전(resultKey 포함 객체) 모두 허용 */
export type QAOption = string | { text: string; resultKey: string };

export type QAPair = {
  text: string;
  options: QAOption[];
};

export type ResultTemplate = {
  /** 신버전 뱅크에서 resultKey와 매칭되는 고유 식별자 */
  key?: string;
  title: string;
  subtitle: string;
  summary: string;
  keywords: string[];
  strengths: string[];
  weaknesses: string[];
  relationship: string;
  money: string;
  work: string;
  social: string;
  caution: string;
  matchingTypes: string[];
  oppositeTypes: string[];
  shareText: string;
};
