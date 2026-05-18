import RoomPageClient from "@/components/together/RoomPageClient";

interface Props {
  params: Promise<{ roomCode: string }>;
}

export default async function RoomPage({ params }: Props) {
  const { roomCode } = await params;
  return <RoomPageClient roomCode={roomCode} />;
}
