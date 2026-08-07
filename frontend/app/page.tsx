"use client";

import { useEffect, useMemo, useState } from "react";

import API from "@/lib/api";

import Topbar from "@/components/Topbar";
import StatsCard from "@/components/StatsCard";
import FilterPanel from "@/components/FilterPanel";
import GraphStage from "@/components/GraphStage";
import SpendingChart from "@/components/SpendingChart";
import MapStage from "@/components/MapStage";
import IntelligencePanel from "@/components/IntelligencePanel";

export type Contract = {
  agency: string;
  vendor: string;
  contract_title: string;
  amount: number;
  year: number;
  state: string;
};

type Summary = {
  total_contracts: number;
  total_spending: number;
  agencies: number;
  vendors: number;
};

type Filters = {
  search: string;
  agency: string;
  vendor: string;
  state: string;
  year: string;
};

export default function HomePage() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const [summary, setSummary] = useState<Summary>({
    total_contracts: 0,
    total_spending: 0,
    agencies: 0,
    vendors: 0,
  });

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    agency: "",
    vendor: "",
    state: "",
    year: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const [summaryRes, contractsRes] = await Promise.all([
          fetch(`${API}/api/summary`),
          fetch(`${API}/api/contracts`),
        ]);

        if (!summaryRes.ok || !contractsRes.ok) {
          throw new Error("Failed to load API data.");
        }

        setSummary(await summaryRes.json());
        setContracts(await contractsRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredContracts = useMemo(() => {
    return contracts.filter((contract) => {
      if (
        filters.search &&
        !(
          contract.contract_title
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          contract.agency
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          contract.vendor
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        )
      )
        return false;

      if (
        filters.agency &&
        contract.agency !== filters.agency
      )
        return false;

      if (
        filters.vendor &&
        contract.vendor !== filters.vendor
      )
        return false;

      if (
        filters.state &&
        contract.state !== filters.state
      )
        return false;

      if (
        filters.year &&
        String(contract.year) !== filters.year
      )
        return false;

      return true;
    });
  }, [contracts, filters]);

  const totalSpending = filteredContracts.reduce(
    (sum, contract) => sum + contract.amount,
    0
  );

  return (
    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
      }}
    >
      <Topbar
        contractCount={filteredContracts.length}
        totalSpending={totalSpending}
        loading={loading}
      />

      <div
        style={{
          maxWidth: "1700px",
          margin: "0 auto",
          padding: "30px",
        }}
      >
        <FilterPanel
          contracts={contracts}
          onFilterChange={setFilters}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
            marginBottom: 30,
          }}
        >
          <StatsCard
            title="Contracts"
            value={filteredContracts.length}
            color="#38bdf8"
          />

          <StatsCard
            title="Total Spending"
            value={`$${totalSpending.toLocaleString()}`}
            color="#22c55e"
          />

          <StatsCard
            title="Agencies"
            value={
              new Set(
                filteredContracts.map(
                  (c) => c.agency
                )
              ).size
            }
            color="#f59e0b"
          />

          <StatsCard
            title="Vendors"
            value={
              new Set(
                filteredContracts.map(
                  (c) => c.vendor
                )
              ).size
            }
            color="#ef4444"
          />
        </div>

        <GraphStage
          contracts={filteredContracts}
        />

        <SpendingChart
          contracts={filteredContracts}
        />

        <MapStage
          contracts={filteredContracts}
        />

        <IntelligencePanel
          contracts={filteredContracts}
        />
      </div>
    </main>
  );
}