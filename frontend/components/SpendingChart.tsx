"use client";

const data = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 180 },
  { month: "Mar", value: 220 },
  { month: "Apr", value: 260 },
  { month: "May", value: 320 },
  { month: "Jun", value: 380 },
];

export default function SpendingChart() {
  const width = 700;
  const height = 300;
  const padding = 40;

  const max = Math.max(...data.map((d) => d.value));

  const points = data
    .map((d, i) => {
      const x =
        padding +
        (i * (width - padding * 2)) /
          (data.length - 1);

      const y =
        height -
        padding -
        (d.value / max) *
          (height - padding * 2);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07131F] p-6 shadow-xl">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Monthly Spending Trend
        </h2>

        <p className="text-sm text-slate-400">
          Government expenditure over the last six months
        </p>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
      >
        {/* Grid */}

        {[0, 1, 2, 3, 4].map((i) => {
          const y =
            padding +
            (i * (height - padding * 2)) / 4;

          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#334155"
              strokeDasharray="5 5"
            />
          );
        })}

        {/* Line */}

        <polyline
          fill="none"
          stroke="#06B6D4"
          strokeWidth="4"
          points={points}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}

        {data.map((d, i) => {
          const x =
            padding +
            (i * (width - padding * 2)) /
              (data.length - 1);

          const y =
            height -
            padding -
            (d.value / max) *
              (height - padding * 2);

          return (
            <g key={d.month}>
              <circle
                cx={x}
                cy={y}
                r="6"
                fill="#06B6D4"
              />

              <text
                x={x}
                y={height - 10}
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="12"
              >
                {d.month}
              </text>

              <text
                x={x}
                y={y - 12}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="12"
              >
                ₹{d.value}M
              </text>
            </g>
          );
        })}
      </svg>

    </div>
  );
}