"use client";

const states = [
  {
    state: "Maharashtra",
    spending: "₹420M",
    progress: 100,
    color: "#06B6D4",
  },
  {
    state: "Karnataka",
    spending: "₹365M",
    progress: 87,
    color: "#3B82F6",
  },
  {
    state: "Tamil Nadu",
    spending: "₹310M",
    progress: 74,
    color: "#8B5CF6",
  },
  {
    state: "Kerala",
    spending: "₹240M",
    progress: 58,
    color: "#10B981",
  },
  {
    state: "Delhi",
    spending: "₹205M",
    progress: 49,
    color: "#F59E0B",
  },
  {
    state: "Gujarat",
    spending: "₹180M",
    progress: 43,
    color: "#EF4444",
  },
];

export default function MapStage() {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07131F] p-6 shadow-xl">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Regional Government Spending
        </h2>

        <p className="text-sm text-slate-400">
          Government expenditure across major Indian states
        </p>
      </div>

      {/* Summary */}

      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="rounded-xl bg-slate-900 p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">States Covered</p>
          <h3 className="text-2xl font-bold text-cyan-400 mt-2">
            28
          </h3>
        </div>

        <div className="rounded-xl bg-slate-900 p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Highest Spending</p>
          <h3 className="text-lg font-bold text-cyan-400 mt-2">
            Maharashtra
          </h3>
        </div>

        <div className="rounded-xl bg-slate-900 p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Budget</p>
          <h3 className="text-2xl font-bold text-cyan-400 mt-2">
            ₹2.4B
          </h3>
        </div>

      </div>

      {/* State List */}

      <div className="space-y-5">

        {states.map((item) => (

          <div key={item.state}>

            <div className="flex justify-between mb-2">

              <span className="text-white font-medium">
                {item.state}
              </span>

              <span className="text-cyan-300 font-semibold">
                {item.spending}
              </span>

            </div>

            <div className="h-4 rounded-full bg-slate-800 overflow-hidden">

              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${item.progress}%`,
                  background: item.color,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-xl bg-cyan-950/20 border border-cyan-700 p-4">

        <h3 className="text-cyan-400 font-semibold mb-2">
          AI Regional Insight
        </h3>

        <p className="text-slate-300 text-sm leading-6">
          Infrastructure investments remain concentrated in western and
          southern India. AI recommends prioritizing additional funding
          for lower-spending regions to improve nationwide development
          balance and procurement efficiency.
        </p>

      </div>

    </div>
  );
}