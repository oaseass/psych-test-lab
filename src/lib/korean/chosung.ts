/**
 * Korean initial consonant (초성) extraction utility.
 *
 * Korean syllable Unicode structure:
 *   code = 0xAC00 + (choIdx × 21 × 28) + (jungIdx × 28) + jongIdx
 *
 * Initial consonant index = Math.floor((code − 0xAC00) / (21 × 28))
 *
 * @example
 *   getChosung("떡볶이")   // "ㄸㅂㅇ"
 *   getChosung("호떡")     // "ㅎㄸ"
 *   getChosung("된장국")   // "ㄷㅈㄱ"
 *   getChosung("김치찌개") // "ㄱㅊㅉㄱ"
 *   getChosung("불고기")   // "ㅂㄱㄱ"
 *   getChosung("비빔밥")   // "ㅂㅂㅂ"
 *   getChosung("삼겹살")   // "ㅅㄱㅅ"
 */

export const CHOSUNG_LIST = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ",
  "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ",
  "ㅋ", "ㅌ", "ㅍ", "ㅎ",
] as const;

const SYLLABLE_START = 0xac00;
const SYLLABLE_END   = 0xd7a3;
const SYLLABLE_UNIT  = 21 * 28; // jungseong(21) × jongseong(28) = 588

/**
 * Returns the initial consonant of a single Korean syllable character.
 * Returns `null` for non-syllable characters.
 */
export function getSyllableChosung(ch: string): string | null {
  const code = ch.charCodeAt(0);
  if (code < SYLLABLE_START || code > SYLLABLE_END) return null;
  return CHOSUNG_LIST[Math.floor((code - SYLLABLE_START) / SYLLABLE_UNIT)];
}

/**
 * Extracts initial consonants (초성) from a Korean string.
 *
 * - Korean syllable → initial consonant (쌍자음 ㄲ/ㄸ/ㅃ/ㅆ/ㅉ 유지)
 * - Space           → preserved (word boundary visibility)
 * - Other chars     → dropped (numbers, Latin, punctuation)
 */
export function getChosung(text: string): string {
  return text
    .split("")
    .map((ch) => {
      if (ch === " ") return " ";
      return getSyllableChosung(ch) ?? "";
    })
    .join("")
    .trim()
    .replace(/\s{2,}/g, " ");
}
