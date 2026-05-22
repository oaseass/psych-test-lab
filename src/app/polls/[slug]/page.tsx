"use client";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { getPollBySlug, POLL_VOTES_KEY, POLL_VOTED_KEY } from "@/data/pollsData";
import type { PollData, PollVoteData, PollVotedData } from "@/data/pollsData";
import Link from "next/link";
import { use } from "react";

function PollContent({ poll }: { poll: PollData }) {
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [extraVotes, setExtraVotes] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const votedData: PollVotedData = JSON.parse(localStorage.getItem(POLL_VOTED_KEY) || "{}");
      if (votedData[poll.id]) {
        setVotedOption(votedData[poll.id]);
      }
      const voteData: PollVoteData = JSON.parse(localStorage.getItem(POLL_VOTES_KEY) || "{}");
      if (voteData[poll.id]) {
        setExtraVotes(voteData[poll.id]);
      }
    } catch {
      // ignore
    }
  }, [poll.id]);

  function handleVote(optionId: string) {
    if (votedOption) return;

    try {
      const votedData: PollVotedData = JSON.parse(localStorage.getItem(POLL_VOTED_KEY) || "{}");
      votedData[poll.id] = optionId;
      localStorage.setItem(POLL_VOTED_KEY, JSON.stringify(votedData));

      const voteData: PollVoteData = JSON.parse(localStorage.getItem(POLL_VOTES_KEY) || "{}");
      if (!voteData[poll.id]) voteData[poll.id] = {};
      voteData[poll.id][optionId] = (voteData[poll.id][optionId] || 0) + 1;
      localStorage.setItem(POLL_VOTES_KEY, JSON.stringify(voteData));

      setVotedOption(optionId);
      setExtraVotes(voteData[poll.id]);
    } catch {
      // ignore
    }
  }

  function getVotes(optionId: string, seedVotes: number): number {
    return seedVotes + (extraVotes[optionId] || 0);
  }

  const totalVotes = poll.options.reduce(
    (s, o) => s + getVotes(o.id, o.seedVotes),
    0
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/polls" className="text-gray-400 hover:text-gray-600 text-xl">‹</Link>
          <span className="text-sm text-gray-500">투표</span>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">{poll.emoji}</div>
            <h1 className="text-xl font-bold text-gray-900">{poll.question}</h1>
            {poll.description && (
              <p className="text-sm text-gray-500 mt-2">{poll.description}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {poll.options.map((opt) => {
              const votes = getVotes(opt.id, opt.seedVotes);
              const percent = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
              const isVoted = votedOption === opt.id;
              const hasVoted = !!votedOption;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleVote(opt.id)}
                  disabled={hasVoted}
                  className={`w-full rounded-2xl p-4 text-left transition-all relative overflow-hidden border-2 ${
                    isVoted
                      ? "border-purple-500"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  {hasVoted && (
                    <div
                      className="absolute inset-y-0 left-0 transition-all duration-700 rounded-xl"
                      style={{
                        width: `${percent}%`,
                        background: isVoted ? "#EDE9FE" : "#F3F4F6",
                      }}
                    />
                  )}
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
                      <span
                        className={`font-semibold text-sm ${isVoted ? "text-purple-700" : "text-gray-800"}`}
                      >
                        {opt.text}
                      </span>
                    </div>
                    {hasVoted && (
                      <span
                        className={`text-sm font-bold ${isVoted ? "text-purple-600" : "text-gray-400"}`}
                      >
                        {percent}%
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {votedOption && (
            <p className="text-center text-xs text-gray-400 mt-4">
              결과를 보고 있어요
            </p>
          )}

          {!votedOption && (
            <p className="text-center text-xs text-gray-400 mt-4">
              투표하면 결과를 볼 수 있어요
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PollDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const poll = getPollBySlug(slug);
  if (!poll) return notFound();
  return <PollContent poll={poll} />;
}
