export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9가-힣-]+$/.test(slug);
}

// resultId를 URL safe 문자열로 인코딩
export function encodeResultId(resultId: string): string {
  return encodeURIComponent(resultId);
}

export function decodeResultId(encoded: string): string {
  try {
    return decodeURIComponent(encoded);
  } catch {
    return encoded;
  }
}
