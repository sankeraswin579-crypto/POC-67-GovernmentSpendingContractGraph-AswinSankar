"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import IntelligencePanel from "./IntelligencePanel";

type Filters = {
  region: string[] | string;
  operator: string;
};

type Props = {
  onCountChange?: (count: number) => void;
  filters?: Filters;
};

export default function MapStage({ onCountChange, filters }: Props) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isLoadedRef = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<any>(null);

  const API =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

  const fetchStations = async () => {
    const map = mapRef.current;
    if (!map || !isLoadedRef.current) return;

    const bounds = map.getBounds();

    const params = new URLSearchParams({
      min_lat: bounds.getSouth().toString(),
      max_lat: bounds.getNorth().toString(),
      min_lng: bounds.getWest().toString(),
      max_lng: bounds.getEast().toString(),
      zoom: Math.floor(map.getZoom()).toString(),
    });

    if (filters?.region) {
      const arr = Array.isArray(filters.region)
        ? filters.region
        : [filters.region];
      arr.forEach((id) => {
        if (id && id !== "ALL") params.append("country_id", id);
      });
    }

    if (filters?.operator) {
      params.append("operator_id", filters.operator);
    }

    const url = `${API}/api/stations/filtered?${params.toString()}`;
    console.log("API URL:", url);

    try {
      const res = await fetch(url);
      if (!res.ok) return;

      const data = await res.json();

      const geojson = {
        type: "FeatureCollection",
        features: (data.features || []).map((p: any) => ({
          type: "Feature",
          properties: { ...p },
          geometry: {
            type: "Point",
            coordinates: [p.lng, p.lat],
          },
        })),
      };

      const source = map.getSource("stations") as maplibregl.GeoJSONSource;
      source?.setData(geojson as any);

      onCountChange?.(data.total || 0);
    } catch (e) {
      console.error("Fetch failed:", e);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [10, 50],
      zoom: 3.5,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      isLoadedRef.current = true;

      map.addSource("stations", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.addLayer({
        id: "stations-layer",
        type: "circle",
        source: "stations",
        paint: {
          "circle-radius": 4,
          "circle-color": "#22D3EE",
          "circle-opacity": 0.9,
        },
      });

      map.on("click", "stations-layer", (e) => {
        const feature = e.features?.[0];
        if (!feature) return;
        setSelectedStation(feature.properties);
        setPanelOpen(true);
      });

      map.on("mouseenter", "stations-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "stations-layer", () => {
        map.getCanvas().style.cursor = "";
      });

      fetchStations();
    });

    map.on("moveend", () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(fetchStations, 250);
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (isLoadedRef.current) fetchStations();
  }, [JSON.stringify(filters)]);

 return (
  <div className="relative w-full h-full">
    <div ref={containerRef} className="w-full h-full" />

    {/* Cinematic HUD */}
    <div className="pointer-events-none absolute left-6 top-6 z-20 rounded-2xl border border-cyan-500/30 bg-[#071019]/80 px-5 py-4 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,.2)]">
      <p className="text-[10px] uppercase tracking-[4px] text-cyan-300">
        Global EV Command Center
      </p>

      <h2 className="mt-1 text-2xl font-black tracking-[3px] text-white">
        ELECTRIC HORIZON
      </h2>

      <div className="mt-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="text-xs uppercase tracking-[3px] text-emerald-300">
          Live Network
        </span>
      </div>
    </div>

    {/* Vignette */}
    <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,6,23,.35)_100%)]" />

    {/* Intelligence Panel */}
    <IntelligencePanel
      open={panelOpen}
      station={selectedStation}
      onClose={() => {
        setPanelOpen(false);
      }}
    />
  </div>
);}