"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { TogetherGameType } from "@/lib/together/types";
import { TOGETHER_GAMES } from "@/data/together/togetherGames";
import { createRoom } from "@/lib/together/roomService";
import { getCurrentUser } from "@/lib/user/authService";
import AuthModal from "@/components/user/AuthModal";

const EMOJIS = ["😊", "😎", "🤩", "🥳", "🌟", "🎯", "🔥", "🦄", "👾", "🐼"];

export default function CreateRoomForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedGame, setSelectedGame] = useState<TogetherGameType | null>(null);
  const [nickname, setNickname] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);
  const [totalRounds, setTotalRounds] = useState<number>(5);
  const [allowBots, setAllowBots] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    const member = user?.role === "member";
    setIsMember(member);
    if (!member) setShowAuthModal(true);
  }, []);

  const selectedConfig = TOGETHER_GAMES.find((g) => g.gameType === selectedGame);

  const handleSelectGame = (gameType: TogetherGameType) => {
    setSelectedGame(gameType);
    const config = TOGETHER_GAMES.find((g) => g.gameType === gameType);
    if (config) setTotalRounds(config.totalRounds);
    setStep(2);
  };

  const handleCreate = () => {
    if (!selectedGame) return setError("게임을 선택해주세요");
    if (!nickname.trim()) return setError("닉네임을 입력해주세요");
    if (nickname.trim().length > 10) return setError("닉네임은 10자 이하로 입력해주세요");

    setLoading(true);
    setError("");

    const room = createRoom({
      gameType: selectedGame,
      hostNickname: `${selectedEmoji} ${nickname.trim()}`,
      totalRounds,
      allowBots,
    });

    if (!room) {
      setError("방 생성에 실패했습니다. 다시 시도해주세요.");
      setLoading(false);
      return;
    }

    router.push(`/together/room/${room.roomCode}`);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectPath="/together/create"
        reason="together"
      />
      {!isMember && !showAuthModal && (
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center">
          <p className="text-sm text-violet-700 font-semibold mb-3">같이놀기는 회원 전용입니다.</p>
          <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-bold hover:bg-violet-700 transition-colors">
            가입/로그인하기
          </button>
        </div>
      )}
      {isMember && step === 1 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">어떤 게임을 할까요?</h2>
          <div className="space-y-3">
            {TOGETHER_GAMES.map((game) => (
              <button
                key={game.gameType}
                onClick={() => handleSelectGame(game.gameType)}
                className="w-full text-left"
              >
                <div
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all hover:shadow-md
                    ${selectedGame === game.gameType
                      ? "border-violet-500 shadow-md"
                      : "border-transparent hover:border-gray-200"
                    }`}
                  style={{ background: game.bgColor }}
                >
                  <span className="text-3xl">{game.emoji}</span>
                  <div>
                    <div className="font-bold text-gray-900">{game.title}</div>
                    <div className="text-sm text-gray-600">{game.subtitle}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {game.recommendedPlayers} · {game.estimatedMinutes}분
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isMember && step === 2 && selectedConfig && (
        <div>
          <button
            onClick={() => setStep(1)}
            className="text-sm text-violet-600 hover:underline mb-4 flex items-center gap-1"
          >
            ← 게임 다시 선택
          </button>

          <div
            className="flex items-center gap-3 p-4 rounded-2xl mb-6"
            style={{ background: selectedConfig.bgColor }}
          >
            <span className="text-3xl">{selectedConfig.emoji}</span>
            <div>
              <div className="font-bold text-gray-900">{selectedConfig.title}</div>
              <div className="text-sm text-gray-600">{selectedConfig.subtitle}</div>
            </div>
          </div>

          <div className="space-y-5">
            {/* 닉네임 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">내 닉네임</label>
              <div className="flex gap-2 items-center mb-2 flex-wrap">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`text-xl w-9 h-9 rounded-full border-2 transition-all
                      ${selectedEmoji === emoji ? "border-violet-500 bg-violet-50" : "border-transparent hover:border-gray-200"}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임 입력 (최대 10자)"
                maxLength={10}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-violet-400 text-gray-900"
              />
              {nickname && (
                <p className="text-xs text-gray-400 mt-1">미리보기: {selectedEmoji} {nickname}</p>
              )}
            </div>

            {/* 라운드 수 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">라운드 수</label>
              <div className="flex gap-2">
                {[3, 5, 7, 10].filter((n) => n <= (selectedConfig.totalRounds + 5)).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setTotalRounds(n)}
                    className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-all
                      ${totalRounds === n
                        ? "bg-violet-600 text-white border-violet-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-violet-300"
                      }`}
                  >
                    {n}라운드
                  </button>
                ))}
              </div>
            </div>

            {/* AI 봇 */}
            <div>
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-gray-700">AI 친구 자동 참여</p>
                  <p className="text-xs text-gray-400">혼자 와도 AI 봇이 함께 놀아드려요</p>
                </div>
                <div
                  onClick={() => setAllowBots(!allowBots)}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer
                    ${allowBots ? "bg-violet-500" : "bg-gray-300"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform
                      ${allowBots ? "translate-x-7" : "translate-x-1"}`}
                  />
                </div>
              </label>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              onClick={handleCreate}
              disabled={loading || !nickname.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "방 만드는 중..." : "🎉 방 만들기"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
