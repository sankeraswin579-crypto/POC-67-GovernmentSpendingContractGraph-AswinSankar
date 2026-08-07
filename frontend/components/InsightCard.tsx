"use client";

import { LucideIcon } from "lucide-react";

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  color: string;
}

export default function InsightCard({
  icon: Icon,
  title,
  value,
  description,
  color,
}: InsightCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-md transition hover:border-cyan-500">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300">
          {title}
        </h3>

        <Icon className={`h-6 w-6 ${color}`} />
      </div>

      <h2 className="mt-3 text-3xl font-bold text-white">
        {value}
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}