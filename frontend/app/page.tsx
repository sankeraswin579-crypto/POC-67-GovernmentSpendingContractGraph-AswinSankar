"use client";

import Topbar from "@/components/Topbar";
import FilterPanel from "@/components/FilterPanel";

import StatsCard from "@/components/StatsCard";

import SpendingChart from "@/components/SpendingChart";
import BudgetPieChart from "@/components/BudgetPieChart";
import DepartmentBarChart from "@/components/DepartmentBarChart";
import SupplierChart from "@/components/SupplierChart";

import MapStage from "@/components/MapStage";
import GraphStage from "@/components/GraphStage";

import RecentContractsTable from "@/components/RecentContractsTable";

import IntelligencePanel from "@/components/IntelligencePanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617]">

      {/* Top Navigation */}
      <Topbar />

      <div className="mx-auto max-w-7xl space-y-6 p-6">

        {/* Filters */}
        <FilterPanel />

        {/* KPI Cards */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          <StatsCard
            title="Total Budget"
            value="₹2.4B"
            change="+12%"
          />

          <StatsCard
            title="Departments"
            value="24"
            change="+2"
          />

          <StatsCard
            title="Suppliers"
            value="318"
            change="+18"
          />

          <StatsCard
            title="Contracts"
            value="1,426"
            change="+8%"
          />

          <StatsCard
            title="Projects"
            value="87"
            change="+4"
          />

          <StatsCard
            title="Risk Alerts"
            value="12"
            change="-2"
          />

        </section>

        {/* Row 1 */}

        <section className="grid gap-6 lg:grid-cols-2">

          <SpendingChart />

          <BudgetPieChart />

        </section>

        {/* Row 2 */}

        <section className="grid gap-6 lg:grid-cols-2">

          <DepartmentBarChart />

          <SupplierChart />

        </section>

        {/* Row 3 */}

        <section className="grid gap-6 lg:grid-cols-2">

          <MapStage />

          <GraphStage />

        </section>

        {/* Contracts */}

        <RecentContractsTable />


        {/* AI */}

        <IntelligencePanel />

      </div>

    </main>
  );
}