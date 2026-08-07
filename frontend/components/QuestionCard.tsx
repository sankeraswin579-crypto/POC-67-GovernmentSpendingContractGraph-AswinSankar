"use client";

const questions = [
  "Which department has the highest spending?",
  "Which supplier dominates procurement?",
  "Which state received the largest budget?",
  "Which agency increased spending the most?",
  "Which contracts appear unusual?",
  "Which supplier shows procurement risk?",
  "How has spending changed this year?",
  "Which category receives maximum funding?",
  "Where are procurement bottlenecks?",
  "What are the AI recommendations?"
];

export default function QuestionCard() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-4 text-lg font-bold text-cyan-400">
        AI Intelligence Questions
      </h2>

      <div className="space-y-3">
        {questions.map((question, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-800 bg-[#030712] p-3 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-white"
          >
            {index + 1}. {question}
          </div>
        ))}
      </div>
    </div>
  );
}