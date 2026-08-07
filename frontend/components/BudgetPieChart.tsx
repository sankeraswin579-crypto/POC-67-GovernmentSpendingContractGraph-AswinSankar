"use client";

const data = [
  { label: "Infrastructure", value: 40, color: "#38BDF8" },
  { label: "Healthcare", value: 20, color: "#3B82F6" },
  { label: "Education", value: 15, color: "#818CF8" },
  { label: "Transport", value: 15, color: "#22C55E" },
  { label: "Others", value: 10, color: "#F59E0B" },
];

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angle: number
) {
  const rad = ((angle - 90) * Math.PI) / 180;

  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);

  const largeArcFlag =
    endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

export default function BudgetPieChart() {
  let startAngle = 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1117] p-6 shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            Budget Allocation
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Government expenditure by category
          </p>
        </div>

        <div className="rounded-lg bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-400">
          FY 2026
        </div>

      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">

        {/* Pie Chart */}

        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
        >
          <g transform="translate(130,130)">

            {data.map((item) => {

              const sweep =
                (item.value / 100) * 360;

              const path = describeArc(
                0,
                0,
                90,
                startAngle,
                startAngle + sweep
              );

              startAngle += sweep;

              return (
                <path
                  key={item.label}
                  d={path}
                  stroke={item.color}
                  strokeWidth="30"
                  fill="none"
                  strokeLinecap="round"
                />
              );
            })}

            <text
              textAnchor="middle"
              y="-8"
              fill="white"
              fontSize="28"
              fontWeight="bold"
            >
              ₹2.4B
            </text>

            <text
              textAnchor="middle"
              y="18"
              fill="#94A3B8"
              fontSize="13"
            >
              Total Budget
            </text>

          </g>
        </svg>

        {/* Legend */}

        <div className="w-full space-y-3">

          {data.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#111827] px-4 py-3"
            >

              <div className="flex items-center gap-3">

                <div
                  className="h-4 w-4 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                <span className="text-sm font-medium text-white">
                  {item.label}
                </span>

              </div>

              <span className="font-semibold text-cyan-300">
                {item.value}%
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-xl border border-slate-800 bg-[#111827] p-5">

          <p className="text-sm text-slate-400">
            Largest Allocation
          </p>

          <h3 className="mt-2 text-lg font-bold text-cyan-400">
            Infrastructure
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            40% of Total Budget
          </p>

        </div>

        <div className="rounded-xl border border-slate-800 bg-[#111827] p-5">

          <p className="text-sm text-slate-400">
            Categories
          </p>

          <h3 className="mt-2 text-lg font-bold text-green-400">
            {data.length}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Budget Segments
          </p>

        </div>

      </div>

    </div>
  );
}