"use client";

import { useEffect, useRef } from "react";
import cytoscape, { Core, ElementDefinition } from "cytoscape";

export type Contract = {
  agency: string;
  vendor: string;
  contract_title: string;
  amount: number;
  year: number;
  state: string;
};

type Props = {
  contracts: Contract[];
};

export default function GraphStage({ contracts }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);

  // Create Cytoscape once
  useEffect(() => {
    if (!containerRef.current || cyRef.current) return;

    cyRef.current = cytoscape({
      container: containerRef.current,

      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            color: "#fff",
            "font-size": "10px",
            "text-wrap": "wrap",
            "text-max-width": 80,
            "background-color": "#0ea5e9",
            "border-width": 2,
            "border-color": "#ffffff",
            width: 45,
            height: 45,
          },
        },
        {
          selector: 'node[type="agency"]',
          style: {
            shape: "roundrectangle",
            "background-color": "#3b82f6",
          },
        },
        {
          selector: 'node[type="vendor"]',
          style: {
            shape: "ellipse",
            "background-color": "#22c55e",
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#94a3b8",
            "target-arrow-color": "#94a3b8",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],

      layout: {
        name: "grid",
      },
    });

    return () => {
      cyRef.current?.destroy();
      cyRef.current = null;
    };
  }, []);

  // Update graph when contracts change
  useEffect(() => {
    if (!cyRef.current) return;

    const cy = cyRef.current;

    const elements: ElementDefinition[] = [];
    const seen = new Set<string>();

    contracts.forEach((contract, index) => {
      const agencyId = `agency-${contract.agency}`;
      const vendorId = `vendor-${contract.vendor}`;

      if (!seen.has(agencyId)) {
        elements.push({
          data: {
            id: agencyId,
            label: contract.agency,
            type: "agency",
          },
        });
        seen.add(agencyId);
      }

      if (!seen.has(vendorId)) {
        elements.push({
          data: {
            id: vendorId,
            label: contract.vendor,
            type: "vendor",
          },
        });
        seen.add(vendorId);
      }

      elements.push({
        data: {
          id: `edge-${index}`,
          source: agencyId,
          target: vendorId,
        },
      });
    });

    cy.elements().remove();
    cy.add(elements);

    cy.layout({
      name: "cose",
      animate: false,
      fit: true,
      padding: 40,
    }).run();
  }, [contracts]);

  return (
    <div
      style={{
        background: "#0f172a",
        padding: 20,
        borderRadius: 12,
        marginTop: 25,
      }}
    >
      <h2
        style={{
          color: "#38bdf8",
          marginBottom: 20,
        }}
      >
        Government Contract Network
      </h2>

      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: 650,
          background: "#020617",
          borderRadius: 12,
        }}
      />

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          marginTop: 20,
          color: "#cbd5e1",
        }}
      >
        <span>
          <strong>Contracts:</strong> {contracts.length}
        </span>

        <span>
          <strong>Agencies:</strong>{" "}
          {new Set(contracts.map((c) => c.agency)).size}
        </span>

        <span>
          <strong>Vendors:</strong>{" "}
          {new Set(contracts.map((c) => c.vendor)).size}
        </span>
      </div>
    </div>
  );
}