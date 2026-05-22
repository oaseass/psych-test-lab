import { NextRequest, NextResponse } from "next/server";

/**
 * 프로덕션에서 절대 열리면 안 되는 경로 목록.
 * 환경변수·빌드 결과와 무관하게 미들웨어 레벨에서 즉시 404 반환.
 *
 * 추가 방법:
 *   "/category/new-slug" 또는 "/experiments/new-experiment"
 */
const BLOCKED_PATHS = new Set([
  "/experiments/infinite-mix",
  "/category/sseom",
  "/category/jaemi-byeongmat",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BLOCKED_PATHS.has(pathname)) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-blocked-by": "middleware",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/experiments/:path*",
    "/category/:path*",
  ],
};
