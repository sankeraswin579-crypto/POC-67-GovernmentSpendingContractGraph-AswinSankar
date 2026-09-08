"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export type Contract = {
  agency: string;
  vendor: string;
  contract_title: string;
  amount: number;
  year: number;
  state: string;
};

export type FilterValues = {
  search: string;
  agency: string;
  vendor: string;
  state: string;
  year: string;
};

type Props = {
  contracts?: Contract[];
  onFilterChange?: (filters: FilterValues) => void;
};

export default function FilterPanel({
  contracts = [],
  onFilterChange = () => {},
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
      [...new Set(contracts.map((contract) => contract.agency))]
        .filter(Boolean)
        .sort(),
    [contracts]
  );

  const vendors = useMemo(
    () =>
      [...new Set(contracts.map((contract) => contract.vendor))]
        .filter(Boolean)
        .sort(),
    [contracts]
  );

  const states = useMemo(
    () =>
      [...new Set(contracts.map((contract) => contract.state))]
        .filter(Boolean)
        .sort(),
    [contracts]
  );

  const years = useMemo(
    () =>
      [...new Set(contracts.map((contract) => contract.year))]
        .filter(Boolean)
        .sort((a, b) => b - a)
        .map(String),
    [contracts]
  );

  function updateFilter(
    name: keyof FilterValues,
    value: string
  ) {
    const updatedFilters: FilterValues = {
      ...filters,
      [name]: value,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  }

  return (
    <div className="space-y-4">

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#030712] px-4 py-3">
        <Search
          size={18}
          className="shrink-0 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search contracts..."
          value={filters.search}
          onChange={(event) =>
            updateFilter("search", event.target.value)
          }
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      {/* Agency */}
      <select
        value={filters.agency}
        onChange={(event) =>
          updateFilter("agency", event.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-[#030712] p-3 text-sm text-white outline-none"
      >
        <option value="">All Agencies</option>

        {agencies.map((agency) => (
          <option key={agency} value={agency}>
            {agency}
          </option>
        ))}
      </select>

      {/* Vendor */}
      <select
        value={filters.vendor}
        onChange={(event) =>
          updateFilter("vendor", event.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-[#030712] p-3 text-sm text-white outline-none"
      >
        <option value="">All Vendors</option>

        {vendors.map((vendor) => (
          <option key={vendor} value={vendor}>
            {vendor}
          </option>
        ))}
      </select>

      {/* State */}
      <select
        value={filters.state}
        onChange={(event) =>
          updateFilter("state", event.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-[#030712] p-3 text-sm text-white outline-none"
      >
        <option value="">All States</option>

        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* Year */}
      <select
        value={filters.year}
        onChange={(event) =>
          updateFilter("year", event.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-[#030712] p-3 text-sm text-white outline-none"
      >
        <option value="">All Years</option>

        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

    </div>
  );
}