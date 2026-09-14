
"use client";

import { useEffect, useState } from "react";
import IntelligencePanel from "@/components/IntelligencePanel";

type GraphNode = {
  id: string;
  label?: string;
  type?: string;
  x: number;
  y: number;
};

type GraphLink = {
  source: string;
  target: string;
};

type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

export default function GraphStage() {
  const [graph, setGraph] = useState<GraphData>({
    nodes: [],
    links: [],
  });

  const [selectedNode, setSelectedNode] =
    useState<GraphNode | null>(null);

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
            `Graph request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        if (!mounted) {
          return;
        }

        const rawNodes = Array.isArray(data?.nodes)
          ? data.nodes
          : [];

        const rawLinks = Array.isArray(data?.links)
          ? data.links
          : [];

        const width = 900;
        const height = 500;

        const nodes: GraphNode[] = rawNodes.map(
          (node: GraphNode, index: number) => ({
            ...node,
            x:
              typeof node.x === "number"
                ? node.x
                : 80 + ((index * 137) % 740),
            y:
              typeof node.y === "number"
                ? node.y
                : 80 + ((index * 83) % 340),
          })
        );

        setGraph({
          nodes,
          links: rawLinks,
        });
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load contract relationship graph."
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
    graph.nodes.find((node) => node.id === id);

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-2xl border border-slate-800 bg-[#030712]">
      {/* Loading */}
      {loading && (
        <div
          data-testid="graph-loading"
          className="flex min-h-[520px] items-center justify-center text-sm text-slate-400"
        >
          Loading government contract relationship graph...
        </div>
      )}

      {/* Error */}
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

      {/* Graph */}
      {!loading && !error && (
        <>
          <svg
            viewBox="0 0 900 500"
            className="h-[520px] w-full"
            role="img"
            aria-label="Government contract relationship graph"
          >
            {/* Links */}
            {graph.links.map((link, index) => {
              const source = findNode(
                String(link.source)
              );

              const target = findNode(
                String(link.target)
              );

              if (!source || !target) {
                return null;
              }

              return (
                <line
                  key={`${String(link.source)}-${String(
                    link.target
                  )}-${index}`}
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

            {/* Nodes */}
            {graph.nodes.map((node) => (
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
                  r="18"
                  className="fill-cyan-500/20 stroke-cyan-400"
                  strokeWidth="2"
                />

                <circle
                  r="6"
                  className="fill-cyan-400"
                />

                <text
                  x="24"
                  y="5"
                  className="fill-slate-300 text-[12px]"
                >
                  {node.label || node.id}
                </text>
              </g>
            ))}

            {/* Empty-state marker */}
            {graph.nodes.length === 0 && (
              <text
                x="450"
                y="250"
                textAnchor="middle"
                className="fill-slate-400 text-[16px]"
              >
                No graph nodes returned by the backend.
              </text>
            )}
          </svg>

          {/* Intelligence Panel */}
          <IntelligencePanel
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
          />
        </>
      )}
    </div>
  );
}

