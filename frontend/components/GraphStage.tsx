
"use client";

import { useEffect, useMemo, useState } from "react";

type GraphNode = {
  id: string;
  label: string;
  type?: string;
};

type GraphLink = {
  source: string;
  target: string;
  label?: string;
};

type GraphData = {
  nodes?: GraphNode[];
  links?: GraphLink[];
  edges?: GraphLink[];
};

type GraphStageProps = {
  data?: GraphData;
  apiUrl?: string;
};

export default function GraphStage({
  data,
  apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
}: GraphStageProps) {
  const [graph, setGraph] = useState<GraphData>(data || {});
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    if (data) {
      setGraph(data);
      setLoading(false);
      return;
    }

    async function loadGraph() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${apiUrl}/api/graph`);

        if (!response.ok) {
          throw new Error(`Graph API returned ${response.status}`);
        }

        const result = await response.json();
        setGraph(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load graph data."
        );
      } finally {
        setLoading(false);
      }
    }

    loadGraph();
  }, [data, apiUrl]);

  const nodes = graph.nodes || [];
  const links = graph.links || graph.edges || [];

  const nodePositions = useMemo(() => {
    const centerX = 300;
    const centerY = 220;
    const radius = Math.min(170, Math.max(80, nodes.length * 18));

    return nodes.map((node, index) => {
      const angle =
        nodes.length > 0
          ? (index / nodes.length) * Math.PI * 2
          : 0;

      return {
        ...node,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });
  }, [nodes]);

  const nodeMap = useMemo(() => {
    return new Map(nodePositions.map((node) => [node.id, node]));
  }, [nodePositions]);

  if (loading) {
    return (
      <div className="flex min-h-[440px] items-center justify-center rounded-2xl border border-slate-700 bg-[#030712]">
        <div className="text-sm text-slate-400">
          Loading contract graph...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[440px] flex-col items-center justify-center rounded-2xl border border-red-900/50 bg-[#030712] p-6 text-center">
        <div className="mb-2 text-sm font-medium text-red-400">
          Unable to load contract graph
        </div>

        <div className="text-xs text-slate-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-700 bg-[#030712]">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Contract Network
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Government agencies, vendors, and contracts
          </p>
        </div>

        <div className="flex gap-4 text-xs text-slate-400">
          <span>
            Nodes:{" "}
            <strong className="text-white">
              {nodes.length}
            </strong>
          </span>

          <span>
            Links:{" "}
            <strong className="text-white">
              {links.length}
            </strong>
          </span>
        </div>
      </div>

      <div className="relative overflow-auto">
        <svg
          viewBox="0 0 600 440"
          className="h-[440px] min-w-[600px] w-full"
          role="img"
          aria-label="Government contract relationship graph"
        >
          {/* Links */}
          {links.map((link, index) => {
            const source = nodeMap.get(String(link.source));
            const target = nodeMap.get(String(link.target));

            if (!source || !target) {
              return null;
            }

            return (
              <g
                key={`${String(link.source)}-${String(link.target)}-${index}`}
              >
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="currentColor"
                  className="text-slate-700"
                  strokeWidth="1.5"
                />

                {link.label && (
                  <text
                    x={(source.x + target.x) / 2}
                    y={(source.y + target.y) / 2}
                    className="fill-slate-500"
                    fontSize="9"
                    textAnchor="middle"
                  >
                    {link.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Clickable Nodes */}
          {nodePositions.map((node) => (
            <g
              key={node.id}
              data-testid={`graph-node-${node.id}`}
              role="button"
              tabIndex={0}
              aria-label={`Select ${node.label || node.id}`}
              className="cursor-pointer"
              transform={`translate(${node.x}, ${node.y})`}
              onClick={() => setSelectedNode(node)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedNode(node);
                }
              }}
            >
              <circle
                r="24"
                className={`fill-slate-950 ${
                  selectedNode?.id === node.id
                    ? "stroke-cyan-400"
                    : "stroke-slate-500"
                }`}
                strokeWidth="2"
              />

              <circle
                r="17"
                className="fill-slate-800"
              />

              <text
                y="4"
                textAnchor="middle"
                className="fill-white pointer-events-none"
                fontSize="10"
                fontWeight="600"
              >
                {node.label?.slice(0, 12) || node.id.slice(0, 12)}
              </text>

              {node.type && (
                <text
                  y="42"
                  textAnchor="middle"
                  className="fill-slate-500 pointer-events-none"
                  fontSize="9"
                >
                  {node.type}
                </text>
              )}
            </g>
          ))}
        </svg>

        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-slate-500">
              No graph data available.
            </p>
          </div>
        )}

        {/* Intelligence Panel */}
        {selectedNode && (
          <div
            data-testid="intelligence-panel"
            className="absolute right-4 top-4 w-80 rounded-2xl border border-cyan-500/30 bg-[#0B1117] p-5 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                  AI Intelligence
                </p>

                <h3 className="mt-2 text-lg font-bold text-white">
                  {selectedNode.label || selectedNode.id}
                </h3>
              </div>

              <button
                type="button"
                data-testid="intelligence-panel-close"
                aria-label="Close intelligence panel"
                className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                onClick={() => setSelectedNode(null)}
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl bg-[#111827] p-3">
                <p className="text-xs text-slate-500">
                  Entity ID
                </p>

                <p className="mt-1 break-all text-sm text-slate-200">
                  {selectedNode.id}
                </p>
              </div>

              <div className="rounded-xl bg-[#111827] p-3">
                <p className="text-xs text-slate-500">
                  Entity Type
                </p>

                <p className="mt-1 text-sm font-medium text-cyan-300">
                  {selectedNode.type || "Government Contract Entity"}
                </p>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3">
                <p className="text-xs font-semibold text-cyan-400">
                  Intelligence Insight
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-300">
                  This entity is part of the government procurement
                  relationship network. Use the connected entities and
                  contract relationships to investigate spending patterns,
                  suppliers, and procurement risks.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


