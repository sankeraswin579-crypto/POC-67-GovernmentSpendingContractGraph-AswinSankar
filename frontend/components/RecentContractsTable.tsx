"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Search,
  Download,
} from "lucide-react";

const contracts = [
  {
    id: "CT-2026-001",
    agency: "Infrastructure",
    supplier: "ABC Engineering",
    amount: "₹120 M",
    status: "Completed",
  },
  {
    id: "CT-2026-002",
    agency: "Transport",
    supplier: "Metro Builders",
    amount: "₹95 M",
    status: "Active",
  },
  {
    id: "CT-2026-003",
    agency: "Healthcare",
    supplier: "MedTech Solutions",
    amount: "₹81 M",
    status: "Pending",
  },
  {
    id: "CT-2026-004",
    agency: "Education",
    supplier: "Future Learning",
    amount: "₹74 M",
    status: "Completed",
  },
  {
    id: "CT-2026-005",
    agency: "Agriculture",
    supplier: "Green Farms Ltd",
    amount: "₹69 M",
    status: "Active",
  },
  {
    id: "CT-2026-006",
    agency: "Energy",
    supplier: "Power Grid Corp",
    amount: "₹58 M",
    status: "Pending",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
        <CheckCircle2 size={14} />
        Completed
      </span>
    );
  }

  if (status === "Active") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400">
        <Clock3 size={14} />
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
      <AlertTriangle size={14} />
      Pending
    </span>
  );
}

export default function RecentContractsTable() {
  const [search, setSearch] = useState("");

  const filtered = contracts.filter((c) =>
    Object.values(c)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1117] p-6 shadow-lg">

      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Government Contracts
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest procurement activities
          </p>
        </div>

        <div className="flex gap-3">

          <div className="flex items-center rounded-xl border border-slate-700 bg-[#111827] px-4">

            <Search
              size={18}
              className="text-slate-500"
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
            />

          </div>

          <button className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 font-medium text-black transition hover:bg-cyan-400">

            <Download size={18} />

            Export

          </button>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-800">

              <th className="py-4 text-left text-sm text-slate-400">
                Contract ID
              </th>

              <th className="py-4 text-left text-sm text-slate-400">
                Department
              </th>

              <th className="py-4 text-left text-sm text-slate-400">
                Supplier
              </th>

              <th className="py-4 text-left text-sm text-slate-400">
                Budget
              </th>

              <th className="py-4 text-left text-sm text-slate-400">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((contract) => (
              <tr
                key={contract.id}
                className="border-b border-slate-800 transition hover:bg-slate-800/40"
              >
                <td className="py-5 font-medium text-white">
                  {contract.id}
                </td>

                <td className="text-slate-300">
                  {contract.agency}
                </td>

                <td className="text-slate-300">
                  {contract.supplier}
                </td>

                <td className="font-semibold text-cyan-400">
                  {contract.amount}
                </td>

                <td>
                  <StatusBadge
                    status={contract.status}
                  />
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}