"use client";

type Props = {
  contractCount?: number;
  totalSpending?: number;
  loading?: boolean;
};

export default function Topbar({
  contractCount = 1426,
  totalSpending = 2400000000,
  loading = false,
}: Props) {
  return (
    <header className="bg-slate-950 border-b border-slate-800 px-8 py-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-cyan-400">
            Government Spending Intelligence Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            AI-Powered Government Procurement Analytics
          </p>
        </div>

        {/* Right */}
        <div className="flex gap-4 flex-wrap">
          <StatusCard
            title="Contracts"
            value={loading ? "Loading..." : String(contractCount)}
          />

          <StatusCard
            title="Total Spending"
            value={loading ? "Loading..." : "₹2.4B"}
          />
        </div>
      </div>
    </header>
  );
}

type StatusCardProps = {
  title: string;
  value: string;
};

function StatusCard({
  title,
  value,
}: StatusCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-4 min-w-[170px]">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-cyan-400">
        {value}
      </h2>
    </div>
  );
}