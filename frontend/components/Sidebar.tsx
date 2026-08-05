"use client";

import { useEffect, useState } from "react";

type Props = {
  metrics: {
    total_stations: number;
    dc_fast: number;
    operators: number;
    countries: number;
  };
  onRefresh?: () => void;
  topOperators?: {
    operator_name?: string;
    operator_id?: string | number;
    count: number;
  }[];
};

export function Sidebar({ metrics, onRefresh, topOperators = [] }: Props) {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [localOperators, setLocalOperators] = useState<
    { operator_name?: string; operator_id?: string | number; count: number }[]
  >([]);

  useEffect(() => {
    if (topOperators.length > 0) return;
    (async () => {
      try {
        const res = await fetch(`${API}/api/top-operators`);
        if (!res.ok) return;
        const data = await res.json();
        setLocalOperators(Array.isArray(data) ? data : []);
      } catch {}
    })();
  }, [API, topOperators]);

  const list = topOperators.length ? topOperators : localOperators;

  return (
    <aside className="w-[380px] h-full bg-[#071019]/95 backdrop-blur-xl border-l border-cyan-500/20 flex flex-col shadow-2xl">
      <div className="flex-1 overflow-y-auto p-5">
        <p className="text-[11px] uppercase tracking-widest text-slate-500">SECTION A — EV INTELLIGENCE</p>
        <h1 className="mt-2 text-2xl font-black text-cyan-300">Electric Horizon</h1>
        <p className="mb-6 text-sm uppercase tracking-[3px] text-slate-400">Global EV Intelligence Dashboard</p>

        <div className="grid grid-cols-2 gap-3">
          <MetricCard label="Total Stations" value={metrics.total_stations} accent />
          <MetricCard label="Public Nodes" value={metrics.dc_fast} />
          <MetricCard label="Operators" value={metrics.operators} />
          <MetricCard label="Network Density" value={metrics.countries} />
        </div>

        <div className="mt-8 border-t border-cyan-500/20 pt-6">
          <p className="mb-3 text-[11px] uppercase tracking-widest text-slate-500">TOP OPERATORS</p>
          <div className="space-y-3">
            {list.map((op, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-[#09131f] to-[#0d1b2a] px-4 py-3 transition-all duration-300 hover:translate-x-1 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,.25)]">
                <span className="text-white">{op.operator_name || "Unknown"}</span>
                <span className="font-bold text-cyan-300">{(op.count ?? 0).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-cyan-500/20 pt-6 flex gap-3">
          <button onClick={onRefresh} className="flex-1 rounded-2xl bg-cyan-600 py-3 font-semibold text-white transition hover:scale-105 hover:bg-cyan-500">
            REFRESH
          </button>
          <a href={`${API}/api/stations/csv`} target="_blank" className="flex-1 rounded-2xl border border-cyan-500 py-3 text-center font-semibold text-cyan-300 transition hover:scale-105 hover:bg-cyan-500 hover:text-white">
            DOWNLOAD
          </a>
        </div>
      </div>

      <div className="border-t border-cyan-500/20 px-6 py-5 text-center">
        <p className="text-xs uppercase tracking-[4px] text-slate-500">Designed &amp; Transformed By</p>
        <p className="mt-2 text-lg font-bold text-cyan-300">Aswin Sankar P.S.</p>
        <p className="mt-1 text-xs text-slate-400">Real Rails Internship • Batch 7</p>
        <p className="mt-2 text-[11px] uppercase tracking-[3px] text-cyan-400">Electric Horizon • Version 2.5</p>
      </div>
    </aside>
  );
}

function MetricCard({label,value,accent}:{label:string;value:number;accent?:boolean}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#08121d] to-[#0b1722] p-5 transition-all duration-300 hover:scale-[1.03] hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,.35)]">
      <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle_at_top,#22d3ee22,transparent_70%)]"/>
      <div className="relative z-10">
        <p className={`text-3xl font-black ${accent?"text-cyan-300":"text-white"}`}>{value.toLocaleString()}</p>
        <div className="mt-3 h-[2px] w-full rounded bg-cyan-500/20"><div className="h-full w-3/4 rounded bg-cyan-400"/></div>
        <p className="mt-3 text-[11px] uppercase tracking-[3px] text-slate-400">{label}</p>
      </div>
    </div>
  );
}