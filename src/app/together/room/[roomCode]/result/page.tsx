import ResultPageClient from "@/components/together/ResultPageClient";

interface Props {
  params: Promise<{ roomCode: string }>;
}

export default async function ResultPage({ params }: Props) {
  const { roomCode } = await params;
  return <ResultPageClient roomCode={roomCode} />;
}
