import { redirect } from "next/navigation";
import { getAllTestMeta } from "@/lib/data/testRepository";

export const dynamic = "force-dynamic";

export default function RandomPage() {
  const tests = getAllTestMeta().filter((t) => t.status !== "needsReview" && t.isPlayable);
  if (tests.length === 0) redirect("/");

  // 서버에서 랜덤 선택
  const randomTest = tests[Math.floor(Math.random() * tests.length)];
  redirect(`/test/${randomTest.slug}`);
}
