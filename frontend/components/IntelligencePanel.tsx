"use client";

import { Brain } from "lucide-react";

export default function IntelligencePanel() {
  const questions = [
    "Which department has the highest spending?",
    "Which supplier received the most contracts?",
    "Which state has the highest expenditure?",
    "Which contracts should be audited?",
    "Which agencies exceeded budget?",
    "Where are procurement risks concentrated?",
    "Which projects show unusual spending?",
    "How can spending efficiency be improved?",
  ];

  return (
    <div className="rounded-xl border border-cyan-700 bg-slate-900 p-6">

      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-cyan-400" size={28} />

        <h2 className="text-2xl font-bold text-white">
          AI Intelligence Layer
        </h2>
      </div>

      <div className="rounded-lg bg-slate-800 p-5 mb-6">
        <h3 className="text-cyan-400 font-semibold mb-3">
          Executive Summary
        </h3>

        <p className="text-slate-300">
          Government spending is primarily concentrated in
          infrastructure and transportation. AI analysis suggests
          monitoring high-value procurement contracts and departments
          approaching budget limits.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <div className="rounded-lg bg-slate-800 p-4">
          <h4 className="text-cyan-400 font-semibold">
            Top Department
          </h4>

          <p className="text-white mt-2">
            Infrastructure
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-4">
          <h4 className="text-cyan-400 font-semibold">
            Top Supplier
          </h4>

          <p className="text-white mt-2">
            ABC Engineering Ltd.
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-4">
          <h4 className="text-cyan-400 font-semibold">
            Audit Candidates
          </h4>

          <p className="text-white mt-2">
            12 Contracts
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-4">
          <h4 className="text-cyan-400 font-semibold">
            Budget Alerts
          </h4>

          <p className="text-white mt-2">
            3 Departments
          </p>
        </div>

      </div>

      <h3 className="text-cyan-400 text-lg font-semibold mb-4">
        Business Intelligence Questions
      </h3>

      <div className="grid gap-3">
        {questions.map((q, i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-700 bg-slate-800 p-4"
          >
            <span className="text-cyan-400 font-bold">
              Q{i + 1}.
            </span>{" "}
            <span className="text-slate-300">
              {q}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-green-600 bg-green-950/20 p-5">
        <h3 className="text-green-400 font-semibold mb-3">
          AI Recommendation
        </h3>

        <p className="text-slate-300">
          Prioritize audits of high-value contracts, monitor
          departments nearing budget limits, and distribute future
          investments more evenly across regions.
        </p>
      </div>

    </div>
  );
}