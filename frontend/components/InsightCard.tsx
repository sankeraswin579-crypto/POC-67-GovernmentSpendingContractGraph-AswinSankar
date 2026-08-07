"use client";

import { LucideIcon } from "lucide-react";

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  color?: string;
}

export default function InsightCard({
  icon: Icon,
  title,
  value,
  description,
  color = "text-cyan-400",
}: InsightCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="rounded-lg bg-slate-800 p-2">
          <Icon className={color} size={22} />
        </div>

        <h3 className="text-white font-semibold">
          {title}
        </h3>
      </div>

      <h2 className={`text-2xl font-bold ${color}`}>
        {value}
      </h2>

      <p className="mt-2 text-sm text-gray-400 leading-6">
        {description}
      </p>
    </div>
  );
}