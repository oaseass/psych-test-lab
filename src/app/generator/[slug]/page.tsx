"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import { getGeneratorBySlug, generateResult } from "@/data/generatorData";
import type { GeneratorData } from "@/data/generatorData";
import Link from "next/link";
import { use } from "react";

export default function GeneratorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = getGeneratorBySlug(slug);
  if (!data) notFound();

  return <GeneratorClient data={data} />;
}

function GeneratorClient({ data }: { data: GeneratorData }) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  function handleGenerate() {
    const missing = data.fields.filter((f) => f.required && !inputs[f.id]);
    if (missing.length > 0) return;
    const r = generateResult(data, inputs);
    setResult(r);
  }

  function handleReset() {
    setResult(null);
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/generator" className="text-gray-400 hover:text-gray-600 text-xl">‹</Link>
          <div>
            <h1 className="font-bold text-gray-900">{data.title}</h1>
            <p className="text-xs text-gray-500">{data.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-5">
          {/* 입력 폼 */}
          {!result && (
            <>
              {data.fields.map((field) => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={inputs[field.id] || ""}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, [field.id]: e.target.value }))
                      }
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-purple-400"
                    />
                  )}
                  {field.type === "birthdate" && (
                    <input
                      type="date"
                      value={inputs[field.id] || ""}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, [field.id]: e.target.value }))
                      }
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-purple-400"
                    />
                  )}
                  {field.type === "select" && field.options && (
                    <div className="flex flex-wrap gap-2">
                      {field.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() =>
                            setInputs((prev) => ({ ...prev, [field.id]: opt }))
                          }
                          className={`px-3 py-2 rounded-xl text-sm border-2 font-medium transition-colors ${
                            inputs[field.id] === opt
                              ? "border-purple-500 bg-purple-50 text-purple-700"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={handleGenerate}
                disabled={data.fields.filter((f) => f.required && !inputs[f.id]).length > 0}
                className="w-full py-4 rounded-2xl text-white font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                style={{ background: data.color }}
              >
                {data.emoji} 생성하기
              </button>
            </>
          )}

          {/* 결과 표시 */}
          {result && (
            <div className="flex flex-col items-center gap-5 py-4">
              <div className="text-4xl">{data.emoji}</div>
              <div
                className="w-full rounded-2xl p-5 text-white text-center"
                style={{ background: data.color }}
              >
                <p className="text-base font-bold leading-relaxed">{result}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-2 rounded-full border-2 text-sm font-semibold text-gray-600 border-gray-200 hover:border-gray-300"
                >
                  다시 입력
                </button>
                <button
                  onClick={() => {
                    setInputs({});
                    setResult(null);
                  }}
                  className="px-5 py-2 rounded-full text-sm font-semibold text-white"
                  style={{ background: data.color }}
                >
                  새로 생성
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
