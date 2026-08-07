"use client";

const data = [
  { label: "Infrastructure", value: 40, color: "#06B6D4" },
  { label: "Healthcare", value: 20, color: "#3B82F6" },
  { label: "Education", value: 15, color: "#8B5CF6" },
  { label: "Transport", value: 15, color: "#10B981" },
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

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

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
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07131F] p-6 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Budget Allocation
        </h2>

        <p className="text-sm text-slate-400">
          Government expenditure by category
        </p>
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-8">

        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
        >
          <g transform="translate(130,130)">

            {data.map((item) => {
              const sweep = (item.value / 100) * 360;

              const path = describeArc(
                0,
                0,
                90,
                startAngle,
                startAngle + sweep
              );

              const currentStart = startAngle;
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
              y="-5"
              fill="white"
              fontSize="26"
              fontWeight="bold"
            >
              ₹2.4B
            </text>

            <text
              textAnchor="middle"
              y="20"
              fill="#94A3B8"
              fontSize="13"
            >
              Total Budget
            </text>

          </g>
        </svg>

        <div className="space-y-4">

          {data.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-8 rounded-lg bg-slate-900 px-4 py-3"
            >
              <div className="flex items-center gap-3">

                <div
                  className="h-4 w-4 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                <span className="text-white">
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
    </div>
  );
}