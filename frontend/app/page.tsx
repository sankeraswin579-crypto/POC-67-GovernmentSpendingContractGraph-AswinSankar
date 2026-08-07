"use client";

import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import SpendingChart from "@/components/SpendingChart";
import SupplierChart from "@/components/SupplierChart";
import DepartmentBarChart from "@/components/DepartmentBarChart";
import BudgetPieChart from "@/components/BudgetPieChart";
import RecentContractsTable from "@/components/RecentContractsTable";

import {
  DollarSign,
  FileText,
  Building2,
  Landmark,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">

      {/* Top Navigation */}
      <Topbar />

      <div className="flex">

        {/* Dashboard (70%) */}
        <main className="w-full lg:w-[70%] p-6 space-y-6">

          {/* Header */}
          <section>
            <h1 className="text-4xl font-bold">
              Government Spending Intelligence Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              AI-powered procurement analytics and spending intelligence.
            </p>
          </section>

          {/* AI Summary */}
          <div className="rounded-2xl border border-cyan-500/30 bg-[#0B1117] p-5">
            <h2 className="text-lg font-semibold text-cyan-400">
              AI Executive Summary
            </h2>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Government spending increased by 18% compared with last year.</li>
              <li>• Infrastructure receives the largest budget allocation.</li>
              <li>• ABC Engineering is the leading supplier.</li>
              <li>• AI detected 12 procurement anomalies.</li>
              <li>• Estimated optimization opportunity: ₹8.7 Million.</li>
            </ul>
          </div>

          {/* KPI Cards */}
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatsCard
              icon={FileText}
              title="Contracts"
              value="1,426"
              change="+12%"
              color="#38BDF8"
            />

            <StatsCard
              icon={DollarSign}
              title="Total Spending"
              value="₹2.4B"
              change="+8%"
              color="#22C55E"
            />

            <StatsCard
              icon={Landmark}
              title="Departments"
              value="32"
              change="+3"
              color="#F59E0B"
            />

            <StatsCard
              icon={Building2}
              title="Suppliers"
              value="184"
              change="+15"
              color="#EC4899"
            />

          </section>

          {/* Charts */}
          <section className="grid gap-6 lg:grid-cols-2">
            <SpendingChart />
            <SupplierChart />
          </section>

          {/* Analytics */}
          <section className="grid gap-6 lg:grid-cols-2">
            <DepartmentBarChart />
            <BudgetPieChart />
          </section>

          {/* Contracts */}
          <RecentContractsTable />

        </main>

        {/* Intelligence Sidebar (30%) */}
        <aside className="hidden lg:block lg:w-[30%] border-l border-slate-800 bg-[#0B1117]">
          <Sidebar />
        </aside>

      </div>
    </div>
  );
}