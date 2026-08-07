"use client";

const departments = [
  { name: "Infrastructure", budget: 240, color: "#38BDF8" },
  { name: "Transport", budget: 195, color: "#3B82F6" },
  { name: "Healthcare", budget: 170, color: "#818CF8" },
  { name: "Education", budget: 150, color: "#22C55E" },
  { name: "Agriculture", budget: 132, color: "#F59E0B" },
  { name: "Energy", budget: 118, color: "#EF4444" },
  { name: "Housing", budget: 101, color: "#EC4899" },
  { name: "Water", budget: 94, color: "#10B981" },
];

const maxBudget = Math.max(...departments.map((d) => d.budget));

export default function DepartmentBarChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1117] p-6 shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            Department Spending
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Budget allocation by government department
          </p>
        </div>

        <div className="rounded-lg bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-400">
          8 Departments
        </div>

      </div>

      {/* Department Bars */}

      <div className="space-y-5">

        {departments.map((dept) => (
          <div key={dept.name}>

            <div className="mb-2 flex justify-between">

              <span className="text-sm font-medium text-white">
                {dept.name}
              </span>

              <span className="text-sm font-semibold text-cyan-300">
                ₹{dept.budget}M
              </span>

            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-800">

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

        <div className="rounded-xl border border-slate-800 bg-[#111827] p-5">

          <p className="text-sm text-slate-400">
            Highest Budget
          </p>

          <h3 className="mt-2 text-lg font-bold text-cyan-400">
            Infrastructure
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            ₹240 Million
          </p>

        </div>

        <div className="rounded-xl border border-slate-800 bg-[#111827] p-5">

          <p className="text-sm text-slate-400">
            Total Departments
          </p>

          <h3 className="mt-2 text-lg font-bold text-green-400">
            {departments.length}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Government Agencies
          </p>

        </div>

      </div>

    </div>
  );
}