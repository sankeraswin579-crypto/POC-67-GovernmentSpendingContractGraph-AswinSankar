"use client";

import { useMemo, useState } from "react";

export type Contract = {
  agency: string;
  vendor: string;
  contract_title: string;
  amount: number;
  year: number;
  state: string;
};

type FilterValues = {
  search: string;
  agency: string;
  vendor: string;
  state: string;
  year: string;
};

type Props = {
  contracts: Contract[];
  onFilterChange: (filters: FilterValues) => void;
};

export default function FilterPanel({
  contracts,
  onFilterChange,
}: Props) {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    agency: "",
    vendor: "",
    state: "",
    year: "",
  });

  const agencies = useMemo(
    () =>
      [...new Set(contracts.map((c) => c.agency))].sort(),
    [contracts]
  );

  const vendors = useMemo(
    () =>
      [...new Set(contracts.map((c) => c.vendor))].sort(),
    [contracts]
  );

  const states = useMemo(
    () =>
      [...new Set(contracts.map((c) => c.state))].sort(),
    [contracts]
  );

  const years = useMemo(
    () =>
      [...new Set(contracts.map((c) => c.year))]
        .sort((a, b) => b - a)
        .map(String),
    [contracts]
  );

  function update(name: keyof FilterValues, value: string) {
    const next = {
      ...filters,
      [name]: value,
    };

    setFilters(next);
    onFilterChange(next);
  }

  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: 12,
        padding: 20,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          color: "#38bdf8",
          marginBottom: 20,
        }}
      >
        Filter Contracts
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 15,
        }}
      >
        <input
          placeholder="Search..."
          value={filters.search}
          onChange={(e) =>
            update("search", e.target.value)
          }
          style={style}
        />

        <select
          value={filters.agency}
          onChange={(e) =>
            update("agency", e.target.value)
          }
          style={style}
        >
          <option value="">All Agencies</option>

          {agencies.map((agency) => (
            <option key={agency}>{agency}</option>
          ))}
        </select>

        <select
          value={filters.vendor}
          onChange={(e) =>
            update("vendor", e.target.value)
          }
          style={style}
        >
          <option value="">All Vendors</option>

          {vendors.map((vendor) => (
            <option key={vendor}>{vendor}</option>
          ))}
        </select>

        <select
          value={filters.state}
          onChange={(e) =>
            update("state", e.target.value)
          }
          style={style}
        >
          <option value="">All States</option>

          {states.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </select>

        <select
          value={filters.year}
          onChange={(e) =>
            update("year", e.target.value)
          }
          style={style}
        >
          <option value="">All Years</option>

          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

const style: React.CSSProperties = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid #334155",
  background: "#1e293b",
  color: "white",
  fontSize: 14,
};