"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { gaugeList } from "@/data/gaugeData";

type Props = { params: Promise<{ slug: string }> };

export default function GaugeDetailPage({ params }: Props) {
  const { slug } = use(params);
  const gaugeItem = gaugeList.find((g) => g.slug === slug);
  if (!gaugeItem) notFound();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const gauge = gaugeItem!;

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  function select(qIdx: number, score: number) {
    setAnswers((prev) => ({ ...prev, [qIdx]: score }));
  }

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const allAnswered = Object.keys(answers).length === gauge.questions.length;

  function getGrade() {
    return gauge.grades.find((g) => totalScore >= g.minScore && totalScore <= g.maxScore) ?? gauge.grades[gauge.grades.length - 1];
  }

  if (showResult) {
    const grade = getGrade();
    return (
      <LayoutContainer>
        <div className="py-8 max-w-sm mx-auto text-center">
          <div className="text-5xl mb-3">{gauge.emoji}</div>
          <h2 className="text-xl font-black text-gray-900 mb-1">{gauge.title} 결과</h2>

          {/* 게이지 바 */}
          <div className="my-6">
            <div className="h-5 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-5 rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(totalScore, 100)}%`,
                  background: `linear-gradient(90deg, ${gauge.color}, ${gauge.bgColor})`,
                }}
              />
            </div>
            <div className="text-3xl font-black" style={{ color: gauge.color }}>{totalScore}점</div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left">
            <div className="text-lg font-black text-gray-900 mb-2">{grade.emoji} {grade.title}</div>
            <p className="text-sm text-gray-600 leading-relaxed">{grade.description}</p>
          </div>

          <button
            onClick={() => { setAnswers({}); setShowResult(false); }}
            className="w-full py-3 rounded-2xl font-bold text-white"
            style={{ background: gauge.color }}
          >
            다시 측정하기
          </button>
        </div>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      <div className="py-4 max-w-md mx-auto">
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">{gauge.emoji}</div>
          <h1 className="text-xl font-black text-gray-900">{gauge.title}</h1>
          <p className="text-sm text-gray-400 mt-1">{gauge.subtitle}</p>
        </div>

        <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${(Object.keys(answers).length / gauge.questions.length) * 100}%`,
              background: gauge.color,
            }}
          />
        </div>

        <div className="space-y-5">
          {gauge.questions.map((q, qIdx) => (
            <div key={qIdx} className="bg-gray-50 rounded-2xl p-4">
              <p className="font-bold text-gray-900 text-sm mb-3">
                <span className="text-gray-400 mr-1">Q{qIdx + 1}.</span>
                {q.text}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => select(qIdx, opt.value)}
                    className={`w-full py-2 px-3 rounded-xl text-sm text-left transition-all border-2 ${
                      answers[qIdx] === opt.value
                        ? "border-current text-white font-bold"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                    style={answers[qIdx] === opt.value ? { borderColor: gauge.color, background: gauge.color } : {}}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowResult(true)}
          disabled={!allAnswered}
          className="w-full py-4 rounded-2xl font-black text-white mt-6 disabled:opacity-40 transition-all"
          style={{ background: gauge.color }}
        >
          {allAnswered ? "결과 보기 →" : `${Object.keys(answers).length}/${gauge.questions.length} 답변 완료`}
        </button>
      </div>
    </LayoutContainer>
  );
}
