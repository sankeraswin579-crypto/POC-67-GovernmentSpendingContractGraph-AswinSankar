"use client";

import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
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
  switch (status) {
    case "Completed":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
          <CheckCircle2 size={14} />
          Completed
        </span>
      );

    case "Active":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400">
          <Clock3 size={14} />
          Active
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
          <AlertTriangle size={14} />
          Pending
        </span>
      );
  }
}

export default function RecentContractsTable() {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07131F]/80 p-6 backdrop-blur-xl shadow-xl">

      <div className="mb-5">
        <h2 className="text-xl font-bold text-white">
          Recent Government Contracts
        </h2>

        <p className="text-sm text-slate-400">
          Latest procurement and contract activities
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead>
            <tr className="border-b border-slate-700">

              <th className="py-3 text-left text-sm font-semibold text-cyan-300">
                Contract ID
              </th>

              <th className="py-3 text-left text-sm font-semibold text-cyan-300">
                Agency
              </th>

              <th className="py-3 text-left text-sm font-semibold text-cyan-300">
                Supplier
              </th>

              <th className="py-3 text-left text-sm font-semibold text-cyan-300">
                Amount
              </th>

              <th className="py-3 text-left text-sm font-semibold text-cyan-300">
                Status
              </th>

            </tr>
          </thead>

          <tbody>

            {contracts.map((contract) => (
              <tr
                key={contract.id}
                className="border-b border-slate-800 transition hover:bg-slate-800/40"
              >
                <td className="py-4 text-sm text-white">
                  {contract.id}
                </td>

                <td className="py-4 text-sm text-slate-300">
                  {contract.agency}
                </td>

                <td className="py-4 text-sm text-slate-300">
                  {contract.supplier}
                </td>

                <td className="py-4 font-semibold text-cyan-400">
                  {contract.amount}
                </td>

                <td className="py-4">
                  <StatusBadge status={contract.status} />
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}