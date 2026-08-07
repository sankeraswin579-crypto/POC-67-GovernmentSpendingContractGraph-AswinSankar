"use client";

const departments = [
  { name: "Infrastructure", budget: 240, color: "#06B6D4" },
  { name: "Transport", budget: 195, color: "#3B82F6" },
  { name: "Healthcare", budget: 170, color: "#8B5CF6" },
  { name: "Education", budget: 150, color: "#10B981" },
  { name: "Agriculture", budget: 132, color: "#F59E0B" },
  { name: "Energy", budget: 118, color: "#EF4444" },
  { name: "Housing", budget: 101, color: "#EC4899" },
  { name: "Water", budget: 94, color: "#22C55E" },
];

const maxBudget = Math.max(...departments.map((d) => d.budget));

export default function DepartmentBarChart() {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07131F] p-6 shadow-xl">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Department Spending
        </h2>

        <p className="text-sm text-slate-400">
          Budget allocation by government department
        </p>
      </div>

      {/* Bars */}
      <div className="space-y-5">
        {departments.map((dept) => (
          <div key={dept.name}>

            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-200">
                {dept.name}
              </span>

              <span className="text-sm font-semibold text-cyan-300">
                ₹{dept.budget}M
              </span>
            </div>

            <div className="h-4 w-full overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${(dept.budget / maxBudget) * 100}%`,
                  background: dept.color,
                }}
              />

            </div>

          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Highest Spending
          </p>

          <h3 className="mt-2 text-lg font-bold text-cyan-400">
            Infrastructure
          </h3>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Departments
          </p>

          <h3 className="mt-2 text-lg font-bold text-cyan-400">
            {departments.length}
          </h3>
        </div>

      </div>

    </div>
  );
}