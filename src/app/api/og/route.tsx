import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "심심풀이 연구소";
  const result = searchParams.get("result") || "나의 테스트 결과";
  const subtitle = searchParams.get("subtitle") || "";
  const category = searchParams.get("category") || "심리테스트";

  try {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #EC4899 100%)",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 데코 원 */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 80,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            display: "flex",
          }}
        />

        {/* 콘텐츠 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 100px",
            textAlign: "center",
            color: "white",
            gap: "0px",
          }}
        >
          {/* 카테고리 배지 */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              opacity: 0.8,
              marginBottom: 20,
              letterSpacing: "0.05em",
              background: "rgba(255,255,255,0.15)",
              borderRadius: 50,
              padding: "8px 24px",
              display: "flex",
            }}
          >
            🧠 {category}
          </div>

          {/* 테스트 제목 */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              opacity: 0.85,
              marginBottom: 20,
              display: "flex",
            }}
          >
            {title}
          </div>

          {/* 결과 제목 (메인) */}
          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 16,
              display: "flex",
              textShadow: "0 4px 24px rgba(0,0,0,0.25)",
              textAlign: "center",
            }}
          >
            {result}
          </div>

          {/* 서브타이틀 */}
          {subtitle && (
            <div
              style={{
                fontSize: 28,
                fontWeight: 500,
                opacity: 0.9,
                marginBottom: 32,
                display: "flex",
              }}
            >
              {subtitle}
            </div>
          )}

          {/* 사이트 배지 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 50,
              padding: "12px 32px",
              fontSize: 22,
              fontWeight: 700,
              marginTop: subtitle ? 0 : 24,
            }}
          >
            💜 심심풀이 연구소 · psychlab.kr
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
  } catch {
    // 이미지 생성 실패 시 (예: 폰트 로드 오류) 빈 응답 반환
    return new Response("OG image unavailable", { status: 500 });
  }
}
