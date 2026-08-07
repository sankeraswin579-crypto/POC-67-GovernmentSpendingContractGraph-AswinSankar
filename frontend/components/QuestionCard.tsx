"use client";

import { BrainCircuit } from "lucide-react";

interface QuestionCardProps {
  number: number;
  question: string;
}

export default function QuestionCard({
  number,
  question,
}: QuestionCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-cyan-700/30 bg-slate-900/70 p-4 hover:border-cyan-500 transition-all duration-300">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-900/40">
        <BrainCircuit
          className="text-cyan-400"
          size={18}
        />
      </div>

      <div>
        <p className="text-cyan-400 font-semibold">
          Question {number}
        </p>

        <p className="text-gray-300 mt-1">
          {question}
        </p>
      </div>
    </div>
  );
}