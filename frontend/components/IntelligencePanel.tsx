
"use client";

type IntelligencePanelProps = {
  node: {
    id: string;
    label?: string;
    type?: string;
  } | null;
  onClose: () => void;
};

export default function IntelligencePanel({
  node,
  onClose,
}: IntelligencePanelProps) {
  if (!node) {
    return null;
  }

  const nodeLabel = node.label || node.id;
  const nodeType = node.type || "Entity";

  return (
    <section
      data-testid="intelligence-panel"
      aria-label="Intelligence Panel"
      className="absolute right-4 top-4 z-50 w-[360px] max-w-[calc(100%-2rem)] rounded-2xl border border-cyan-500/30 bg-[#0B1117] p-5 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
            AI Intelligence
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            Intelligence Panel
          </h2>
        </div>

        <button
          type="button"
          data-testid="intelligence-panel-close"
          aria-label="Close intelligence panel"
          onClick={onClose}
          className="rounded-lg px-3 py-1 text-xl text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          ×
        </button>
      </div>

      {/* Selected Entity */}
      <div className="mt-5 rounded-xl border border-slate-700 bg-[#030712] p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Selected Entity
        </p>

        <p className="mt-2 break-words text-lg font-semibold text-white">
          {nodeLabel}
        </p>

        <p className="mt-1 text-sm text-cyan-400">
          Type: {nodeType}
        </p>

        <p className="mt-1 break-all text-xs text-slate-500">
          ID: {node.id}
        </p>
      </div>

      {/* Intelligence Insight */}
      <div className="mt-4">
        <p className="text-sm font-semibold text-cyan-400">
          Intelligence Insight
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          This entity is part of the government contract relationship graph.
          Review its connected contracts, departments, suppliers, and spending
          relationships to identify important procurement patterns.
        </p>
      </div>

      {/* Analysis Areas */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-700 bg-[#030712] p-3">
          <p className="text-xs text-slate-500">
            Entity Type
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {nodeType}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-[#030712] p-3">
          <p className="text-xs text-slate-500">
            Graph Status
          </p>
          <p className="mt-1 text-sm font-semibold text-green-400">
            Connected
          </p>
        </div>
      </div>

      {/* Decision Support */}
      <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">
          Decision Support
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Use the relationship graph and contract analytics to investigate
          spending concentration, supplier relationships, and potential
          procurement risks.
        </p>
      </div>
    </section>
  );
}

