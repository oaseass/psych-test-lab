import type { TestQuestion } from "@/types";
import { cn } from "@/lib/utils/cn";

interface QuestionCardProps {
  question: TestQuestion;
  questionNumber: number;
  onAnswer: (optionId: string) => void;
  selectedOptionId?: string;
}

export default function QuestionCard({ question, questionNumber, onAnswer, selectedOptionId }: QuestionCardProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <span className="text-sm text-brand-purple font-semibold">Q{questionNumber}</span>
        <h2 className="mt-2 text-lg font-bold text-brand-text leading-snug">
          {question.text}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            className={cn(
              "w-full text-left px-5 py-4 rounded-2xl border-2 text-sm font-medium transition-all duration-150",
              selectedOptionId === option.id
                ? "border-brand-purple bg-purple-50 text-brand-purple"
                : "border-gray-200 bg-white text-gray-700 hover:border-brand-purple hover:bg-purple-50/50"
            )}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
