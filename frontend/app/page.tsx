"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { Topbar } from "@/components/Topbar";
import FilterPanel from "@/components/Filterpanel";
import AboutModal from "@/components/AboutModal";

const MapStage = dynamic(() => import("@/components/MapStage"), {
  ssr: false,
});

type CountryOption = {
  country_id: number;
  country_name: string;
};

export default function Page() {
  const API =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const [aboutOpen, setAboutOpen] = useState(false);
  const [stationCount, setStationCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const [filters, setFilters] = useState({
    level: "ALL",
    region: [] as string[],
    operator: "",
  });

  const [operatorId, setOperatorId] = useState<number | null>(null);
  const [backendMetrics, setBackendMetrics] = useState<any>(null);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [topOperators, setTopOperators] = useState<any[]>([]);
  const [filteredTotal, setFilteredTotal] = useState<number | null>(null);

  const triggerRefresh = () => setRefreshKey((v) => v + 1);

  useEffect(() => {
    fetch(`${API}/api/metrics`)
      .then((r) => r.json())
      .then(setBackendMetrics)
      .catch(() => setBackendMetrics(null));
  }, [API, refreshKey]);

  useEffect(() => {
    fetch(`${API}/api/filters/countries`)
      .then((r) => r.json())
      .then(setCountries)
      .catch(() => {});
  }, [API]);

  useEffect(() => {
    const q = filters.operator.trim();
    if (!q) {
      setOperatorId(null);
      return;
    }

    fetch(`${API}/api/filters/operators?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          setOperatorId(null);
          return;
        }
        setOperatorId(data[0].operator_id);
      })
      .catch(() => setOperatorId(null));
  }, [API, filters.operator]);

  useEffect(() => {
    const params = new URLSearchParams();

    filters.region.forEach((id) => params.append("country_id", id));

    if (operatorId) params.append("operator_id", String(operatorId));

    fetch(`${API}/api/top-operators?${params.toString()}`)
      .then((r) => r.json())
      .then(setTopOperators)
      .catch(() => setTopOperators([]));

    fetch(`${API}/api/stations/count?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => setFilteredTotal(d.total ?? 0))
      .catch(() => setFilteredTotal(null));
  }, [API, filters.region, operatorId]);

  const isFiltered =
    filters.region.length > 0 || operatorId !== null;

  const metrics = {
    total_stations: isFiltered
      ? filteredTotal ?? 0
      : backendMetrics?.total_stations ?? 0,
    dc_fast: backendMetrics?.dc_fast ?? 0,
    operators: isFiltered
      ? topOperators.length
      : backendMetrics?.operators ?? 0,
    countries: backendMetrics?.countries ?? 0,
  };

 return (
  <div className="relative h-screen w-screen overflow-hidden bg-[#020617] text-white">

    <Topbar
      stationCount={stationCount}
      dataSource="OpenChargeMap"
      isLoading={!backendMetrics}
    />

    {/* Full Screen Map */}
    <div className="relative h-[calc(100vh-80px)] w-full">

      <MapStage
        key={refreshKey}
        onCountChange={setStationCount}
        filters={{
          ...filters,
          operator: operatorId ? String(operatorId) : "",
        }}
      />

      {/* Floating Filters */}
      <div className="absolute left-6 top-6 z-40">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          countryOptions={countries}
        />
      </div>

      {/* About Button */}
      <div className="absolute right-6 top-6 z-40">
        <button
          onClick={() => setAboutOpen(true)}
          className="rounded-xl border border-cyan-500/30 bg-[#071019]/90 px-5 py-3 text-cyan-300 backdrop-blur-xl transition hover:bg-cyan-500 hover:text-white"
        >
          About
        </button>
      </div>

      {/* Floating HUD */}
      <div className="absolute left-6 bottom-6 z-40 flex gap-4">

        <div className="rounded-2xl border border-cyan-500/20 bg-[#071019]/90 px-5 py-4 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[3px] text-slate-400">
            Stations
          </p>
          <p className="text-2xl font-bold text-cyan-300">
            {metrics.total_stations.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-[#071019]/90 px-5 py-4 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[3px] text-slate-400">
            Operators
          </p>
          <p className="text-2xl font-bold text-cyan-300">
            {metrics.operators}
          </p>
        </div>

      </div>

      {/* Developer Signature */}
      <div className="absolute bottom-6 right-6 z-40 rounded-2xl border border-cyan-500/20 bg-[#071019]/90 px-5 py-4 backdrop-blur-xl text-right">
        <p className="text-[10px] uppercase tracking-[3px] text-slate-500">
          Designed &amp; Transformed By
        </p>

        <p className="mt-2 text-lg font-bold text-cyan-300">
          Aswin Sankar P.S.
        </p>

        <p className="text-xs text-slate-400">
          Real Rails Internship • Batch 7
        </p>

        <p className="mt-1 text-[11px] uppercase tracking-[3px] text-cyan-400">
          Electric Horizon • Version 2.5
        </p>
      </div>

    </div>

    <AboutModal
      open={aboutOpen}
      onClose={() => setAboutOpen(false)}
    />

  </div>
);} 