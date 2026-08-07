"use client";

const suppliers = [
  {
    name: "ABC Engineering",
    contracts: 180,
    value: "₹180M",
    color: "#38BDF8",
  },
  {
    name: "Global Infra",
    contracts: 165,
    value: "₹165M",
    color: "#3B82F6",
  },
  {
    name: "Skyline Builders",
    contracts: 145,
    value: "₹145M",
    color: "#818CF8",
  },
  {
    name: "Green Energy Ltd",
    contracts: 132,
    value: "₹132M",
    color: "#22C55E",
  },
  {
    name: "Metro Construction",
    contracts: 118,
    value: "₹118M",
    color: "#F59E0B",
  },
  {
    name: "Prime Logistics",
    contracts: 102,
    value: "₹102M",
    color: "#EF4444",
  },
  {
    name: "Urban Solutions",
    contracts: 94,
    value: "₹94M",
    color: "#EC4899",
  },
  {
    name: "Future Tech",
    contracts: 88,
    value: "₹88M",
    color: "#10B981",
  },
];

const maxValue = Math.max(...suppliers.map((s) => s.contracts));

export default function SupplierChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1117] p-6 shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            Top Government Suppliers
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Procurement value by supplier
          </p>
        </div>

        <div className="rounded-lg bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-400">
          Top 8
        </div>

      </div>

      {/* Supplier Bars */}

      <div className="space-y-5">

        {suppliers.map((supplier) => (
          <div key={supplier.name}>

            <div className="mb-2 flex justify-between">

              <span className="text-sm font-medium text-white">
                {supplier.name}
              </span>

              <span className="text-sm font-semibold text-cyan-300">
                {supplier.value}
              </span>

            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${
                    (supplier.contracts / maxValue) * 100
                  }%`,
                  background: supplier.color,
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
            Leading Supplier
          </p>

          <h3 className="mt-2 text-lg font-bold text-cyan-400">
            ABC Engineering
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            ₹180 Million Contracts
          </p>

        </div>

        <div className="rounded-xl border border-slate-800 bg-[#111827] p-5">

          <p className="text-sm text-slate-400">
            Active Suppliers
          </p>

          <h3 className="mt-2 text-lg font-bold text-green-400">
            {suppliers.length}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Registered Vendors
          </p>

        </div>

      </div>

    </div>
  );
}