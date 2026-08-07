"use client";

const suppliers = [
  {
    name: "ABC Engineering",
    contracts: 180,
    value: "₹180M",
    color: "#06B6D4",
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
    color: "#8B5CF6",
  },
  {
    name: "Green Energy Ltd",
    contracts: 132,
    value: "₹132M",
    color: "#10B981",
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
    color: "#22C55E",
  },
];

const maxValue = Math.max(...suppliers.map((s) => s.contracts));

export default function SupplierChart() {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07131F] p-6 shadow-xl">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Top Suppliers
        </h2>

        <p className="text-sm text-slate-400">
          Government contracts awarded to major suppliers
        </p>
      </div>

      {/* Supplier Bars */}
      <div className="space-y-5">

        {suppliers.map((supplier) => (
          <div key={supplier.name}>

            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-200">
                {supplier.name}
              </span>

              <span className="text-sm font-semibold text-cyan-300">
                {supplier.value}
              </span>
            </div>

            <div className="h-4 w-full rounded-full bg-slate-800 overflow-hidden">

              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${(supplier.contracts / maxValue) * 100}%`,
                  background: supplier.color,
                }}
              />

            </div>

          </div>
        ))}

      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Leading Supplier
          </p>

          <h3 className="mt-2 text-lg font-bold text-cyan-400">
            ABC Engineering
          </h3>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Total Suppliers
          </p>

          <h3 className="mt-2 text-lg font-bold text-cyan-400">
            {suppliers.length}
          </h3>
        </div>

      </div>

    </div>
  );
}