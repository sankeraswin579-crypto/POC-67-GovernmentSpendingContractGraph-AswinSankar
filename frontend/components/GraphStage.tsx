
"use client";

import { useEffect, useState } from "react";
import IntelligencePanel from "@/components/IntelligencePanel";

type GraphNode = {
  id: string;
  label?: string;
  type?: string;
  x?: number;
  y?: number;
};

type GraphEdge = {
  source: string;
  target: string;
};

type GraphResponse = {
  nodes?: GraphNode[];
  edges?: GraphEdge[];
};

type RenderNode = GraphNode & {
  x: number;
  y: number;
};

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

export default function GraphStage() {
  const [nodes, setNodes] = useState<RenderNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [selectedNode, setSelectedNode] =
    useState<RenderNode | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadGraph() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/api/graph`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Graph API returned HTTP ${response.status}`
          );
        }

        const data: GraphResponse = await response.json();

        if (!mounted) {
          return;
        }

        const rawNodes = Array.isArray(data.nodes)
          ? data.nodes
          : [];

        const rawEdges = Array.isArray(data.edges)
          ? data.edges
          : [];

        const renderedNodes: RenderNode[] =
          rawNodes.map((node, index) => ({
            ...node,
            x:
              typeof node.x === "number"
                ? node.x
                : 70 + ((index * 137) % 740),
            y:
              typeof node.y === "number"
                ? node.y
                : 70 + ((index * 83) % 360),
          }));

        setNodes(renderedNodes);
        setEdges(rawEdges);

        if (renderedNodes.length === 0) {
          setError("The graph API returned no nodes.");
        }
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load the contract relationship graph."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadGraph();

    return () => {
      mounted = false;
    };
  }, []);

  const findNode = (id: string) =>
    nodes.find((node) => node.id === id);

  return (
    <div
      data-testid="graph-stage"
      className="relative min-h-[520px] overflow-hidden rounded-2xl border border-slate-800 bg-[#030712]"
    >
      {loading && (
        <div
          data-testid="graph-loading"
          className="flex min-h-[520px] items-center justify-center text-sm text-slate-400"
        >
          Loading government contract relationship graph...
        </div>
      )}

      {!loading && error && (
        <div
          data-testid="graph-error"
          className="flex min-h-[520px] items-center justify-center p-6 text-center"
        >
          <div>
            <p className="font-semibold text-red-400">
              Graph unavailable
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {error}
            </p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          <svg
            viewBox="0 0 900 500"
            className="h-[520px] w-full"
            role="img"
            aria-label="Government contract relationship graph"
          >
            {/* Relationship edges */}
            {edges.map((edge, index) => {
              const source = findNode(String(edge.source));
              const target = findNode(String(edge.target));

              if (!source || !target) {
                return null;
              }

              return (
                <line
                  key={`${edge.source}-${edge.target}-${index}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="currentColor"
                  className="text-slate-700"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Interactive graph nodes */}
            {nodes.map((node) => (
              <g
                key={node.id}
                data-testid={`graph-node-${node.id}`}
                role="button"
                tabIndex={0}
                aria-label={`Select ${node.label || node.id}`}
                className="cursor-pointer outline-none"
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedNode(node)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    setSelectedNode(node);
                  }
                }}
              >
                <circle
                  r="20"
                  className="fill-cyan-500/20 stroke-cyan-400"
                  strokeWidth="2"
                />

                <circle
                  r="7"
                  className="fill-cyan-400"
                />

                <text
                  x="27"
                  y="5"
                  className="fill-slate-300 text-[12px]"
                >
                  {node.label || node.id}
                </text>
              </g>
            ))}
          </svg>

          <IntelligencePanel
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
          />
        </>
      )}
    </div>
  );
}
