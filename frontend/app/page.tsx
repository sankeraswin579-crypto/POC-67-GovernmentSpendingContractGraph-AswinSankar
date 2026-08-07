import Topbar from "@/components/Topbar";
import StatsCard from "@/components/StatsCard";
import FilterPanel from "@/components/FilterPanel";
import SpendingChart from "@/components/SpendingChart";
import SupplierChart from "@/components/SupplierChart";
import DepartmentBarChart from "@/components/DepartmentBarChart";
import BudgetPieChart from "@/components/BudgetPieChart";

import GraphStage from "@/components/GraphStage";
import RecentContractsTable from "@/components/RecentContractsTable";
import IntelligencePanel from "@/components/IntelligencePanel";
import QuestionCard from "@/components/QuestionCard";
import InsightCard from "@/components/InsightCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Top Navigation */}
      <Topbar />

      <div className="space-y-6 p-6">

        {/* Dashboard Heading */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Government Spending Intelligence Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Analyze contracts, suppliers, agencies and procurement spending with AI-powered intelligence.
          </p>
        </div>

        {/* Filters */}
        <FilterPanel />

        {/* Statistics */}
        <StatsCard />

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SpendingChart />
          <SupplierChart />
        </div>

        {/* More Analytics */}
        <div className="grid gap-6 lg:grid-cols-2">
          <DepartmentBarChart />
          <BudgetPieChart />
        </div>

        {/* Geographic + Network */}
        <div className="grid gap-6 lg:grid-cols-2">
          <MapView />
          <GraphStage />
        </div>

        {/* AI Intelligence */}
        <div className="space-y-6">

          <h2 className="text-2xl font-bold">
            🤖 AI Intelligence
          </h2>

          <IntelligencePanel />

          <div className="grid gap-6 lg:grid-cols-2">
            <InsightCard />
            <QuestionCard />
          </div>

        </div>

        {/* Contracts */}
        <RecentContractsTable />

      </div>
    </div>
  );
}