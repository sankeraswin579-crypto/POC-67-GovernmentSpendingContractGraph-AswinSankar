"use client";

const nodes = [
  {
    id: 1,
    x: 120,
    y: 90,
    label: "Infrastructure",
    color: "#06B6D4",
  },
  {
    id: 2,
    x: 120,
    y: 240,
    label: "Transport",
    color: "#3B82F6",
  },
  {
    id: 3,
    x: 120,
    y: 390,
    label: "Healthcare",
    color: "#8B5CF6",
  },
  {
    id: 4,
    x: 520,
    y: 120,
    label: "ABC Engineering",
    color: "#10B981",
  },
  {
    id: 5,
    x: 520,
    y: 260,
    label: "Metro Builders",
    color: "#F59E0B",
  },
  {
    id: 6,
    x: 520,
    y: 390,
    label: "Green Energy",
    color: "#EF4444",
  },
];

const links = [
  [1, 4],
  [1, 5],
  [2, 5],
  [2, 6],
  [3, 4],
  [3, 6],
];

export default function GraphStage() {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07131F] p-6 shadow-xl">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Agency ↔ Supplier Network
        </h2>

        <p className="text-sm text-slate-400">
          Government departments and supplier relationships
        </p>
      </div>

      <svg
        viewBox="0 0 650 470"
        className="w-full rounded-xl bg-slate-900"
      >
        {/* Connections */}

        {links.map(([from, to], index) => {
          const source = nodes.find((n) => n.id === from)!;
          const target = nodes.find((n) => n.id === to)!;

          return (
            <line
              key={index}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="#334155"
              strokeWidth="2"
            />
          );
        })}

        {/* Nodes */}

        {nodes.map((node) => (
          <g key={node.id}>

            <circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill={node.color}
            />

            <circle
              cx={node.x}
              cy={node.y}
              r="34"
              fill="none"
              stroke={node.color}
              strokeOpacity="0.3"
              strokeWidth="8"
            />

            <text
              x={node.x}
              y={node.y + 55}
              textAnchor="middle"
              fill="white"
              fontSize="13"
              fontWeight="600"
            >
              {node.label}
            </text>

          </g>
        ))}
      </svg>

      {/* Statistics */}

      <div className="mt-8 grid grid-cols-3 gap-4">

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Agencies
          </p>

          <h3 className="mt-2 text-2xl font-bold text-cyan-400">
            24
          </h3>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Suppliers
          </p>

          <h3 className="mt-2 text-2xl font-bold text-cyan-400">
            318
          </h3>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Active Connections
          </p>

          <h3 className="mt-2 text-2xl font-bold text-cyan-400">
            842
          </h3>
        </div>

      </div>

      {/* AI Insight */}

      <div className="mt-6 rounded-xl border border-cyan-700 bg-cyan-950/20 p-4">

        <h3 className="mb-2 text-lg font-semibold text-cyan-400">
          AI Network Insight
        </h3>

        <p className="text-sm leading-6 text-slate-300">
          Infrastructure and Transport departments share multiple strategic
          suppliers, indicating strong collaboration but also potential supplier
          concentration risk. Diversifying procurement partners could improve
          resilience and reduce dependency on a few high-value vendors.
        </p>

      </div>

    </div>
  );
}