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

type FilterValues = {
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
    () => [...new Set(contracts.map((c) => c.agency))].sort(),
    [contracts]
  );

  const vendors = useMemo(
    () => [...new Set(contracts.map((c) => c.vendor))].sort(),
    [contracts]
  );

  const states = useMemo(
    () => [...new Set(contracts.map((c) => c.state))].sort(),
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
    <div className="space-y-4">

      {/* Search */}

      <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#030712] px-4 py-3">

        <Search
          size={18}
          className="text-slate-500"
        />

        <input
          placeholder="Search contracts..."
          value={filters.search}
          onChange={(e) =>
            update("search", e.target.value)
          }
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
        />

      </div>

      {/* Agency */}

      <select
        value={filters.agency}
        onChange={(e) =>
          update("agency", e.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-[#030712] p-3 text-sm text-white"
      >
        <option value="">All Agencies</option>

        {agencies.map((agency) => (
          <option key={agency}>
            {agency}
          </option>
        ))}

      </select>

      {/* Vendor */}

      <select
        value={filters.vendor}
        onChange={(e) =>
          update("vendor", e.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-[#030712] p-3 text-sm text-white"
      >
        <option value="">All Vendors</option>

        {vendors.map((vendor) => (
          <option key={vendor}>
            {vendor}
          </option>
        ))}

      </select>

      {/* State */}

      <select
        value={filters.state}
        onChange={(e) =>
          update("state", e.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-[#030712] p-3 text-sm text-white"
      >
        <option value="">All States</option>

        {states.map((state) => (
          <option key={state}>
            {state}
          </option>
        ))}

      </select>

      {/* Year */}

      <select
        value={filters.year}
        onChange={(e) =>
          update("year", e.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-[#030712] p-3 text-sm text-white"
      >
        <option value="">All Years</option>

        {years.map((year) => (
          <option key={year}>
            {year}
          </option>
        ))}

      </select>

    </div>
  );
}