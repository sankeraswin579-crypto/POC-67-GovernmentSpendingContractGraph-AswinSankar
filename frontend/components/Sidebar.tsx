"use client";

import FilterPanel from "./FilterPanel";
import {
  Brain,
  Download,
  Landmark,
  TrendingUp,
  AlertTriangle,
  DollarSign,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto bg-[#0B1117] border-l border-slate-800 p-6 space-y-6">

      {/* Header */}
      <div>
        <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
          Intelligence Center
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Government Spending
        </h2>

        <p className="text-slate-400 text-sm">
          AI Powered Procurement Analytics
        </p>
      </div>

      {/* Budget */}
      <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
        <p className="text-slate-400 text-sm">
          Total Budget
        </p>

        <h2 className="mt-2 text-4xl font-bold text-white">
          ₹2.4B
        </h2>

        <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
          <TrendingUp size={16} />
          +12% compared to last year
        </div>
      </div>

      {/* Why This Matters */}
      <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">

        <h3 className="text-cyan-400 font-semibold">
          Why This Matters
        </h3>

        <p className="mt-3 text-sm text-slate-300 leading-6">
          Government procurement represents one of the largest public
          expenditures. Monitoring spending improves transparency,
          detects procurement risks and helps optimize budget allocation.
        </p>

      </div>

      {/* Who Controls */}
      <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">

        <div className="flex items-center gap-2">

          <Landmark
            size={18}
            className="text-cyan-400"
          />

          <h3 className="font-semibold text-cyan-400">
            Who Controls This Rail
          </h3>

        </div>

        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          <li>• Ministry of Finance</li>
          <li>• State Governments</li>
          <li>• Procurement Authorities</li>
          <li>• Government Suppliers</li>
        </ul>

      </div>

      {/* AI Insights */}
      <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">

        <div className="flex items-center gap-2 mb-4">

          <Brain
            className="text-cyan-400"
            size={18}
          />

          <h3 className="font-semibold text-cyan-400">
            AI Intelligence
          </h3>

        </div>

        <div className="space-y-4">

          <div className="flex gap-3">
            <TrendingUp className="text-green-400" size={18} />
            <p className="text-sm text-slate-300">
              Infrastructure spending increased by 18%.
            </p>
          </div>

          <div className="flex gap-3">
            <AlertTriangle className="text-red-400" size={18} />
            <p className="text-sm text-slate-300">
              Procurement anomalies detected in 12 contracts.
            </p>
          </div>

          <div className="flex gap-3">
            <DollarSign className="text-yellow-400" size={18} />
            <p className="text-sm text-slate-300">
              Estimated savings opportunity of ₹8.7M.
            </p>
          </div>

        </div>

      </div>

      {/* Business Questions */}
      <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">

        <h3 className="font-semibold text-cyan-400 mb-4">
          AI Questions
        </h3>

        <div className="space-y-3 text-sm">

          <div className="rounded-lg bg-[#030712] p-3">
            Which department has the highest spending?
          </div>

          <div className="rounded-lg bg-[#030712] p-3">
            Which supplier dominates procurement?
          </div>

          <div className="rounded-lg bg-[#030712] p-3">
            Which state received the highest budget?
          </div>

          <div className="rounded-lg bg-[#030712] p-3">
            Which contracts show unusual spending?
          </div>

          <div className="rounded-lg bg-[#030712] p-3">
            Where are procurement risks highest?
          </div>

        </div>

      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">

        <h3 className="font-semibold text-cyan-400 mb-4">
          Filters
        </h3>

        <FilterPanel />

      </div>

      {/* Download */}

      <button className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400 transition flex items-center justify-center gap-2">

        <Download size={18} />

        Download Sample Data

      </button>

    </aside>
  );
}