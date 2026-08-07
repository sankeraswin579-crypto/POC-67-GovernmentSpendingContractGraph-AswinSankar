"use client";

import { LucideIcon, TrendingUp } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change: string;
  color: string;
}

export default function StatsCard({
  icon: Icon,
  title,
  value,
  change,
  color,
}: StatsCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-[#0B1117] p-6 transition-all duration-300 hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${color}20`,
          }}
        >
          <Icon
            size={28}
            style={{
              color,
            }}
          />
        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1">

          <TrendingUp
            size={14}
            className="text-emerald-400"
          />

          <span className="text-sm font-semibold text-emerald-400">
            {change}
          </span>

        </div>

        <span className="text-xs text-slate-500">
          vs last year
        </span>

      </div>

    </div>
  );
}