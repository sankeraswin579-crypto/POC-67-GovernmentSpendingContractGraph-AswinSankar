"use client";

import dynamic from "next/dynamic";

export type Contract = {
  agency: string;
  vendor: string;
  contract_title: string;
  amount: number;
  year: number;
  state: string;
};

const MapView = dynamic(
  () => import("./MapView"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: 600,
          display: "grid",
          placeItems: "center",
          color: "white",
          background: "#020617",
          borderRadius: 12,
        }}
      >
        Loading map...
      </div>
    ),
  }
);

type Props = {
  contracts: Contract[];
};

export default function MapStage({
  contracts,
}: Props) {
  return (
    <div
      style={{
        marginTop: 30,
        background: "#0f172a",
        padding: 20,
        borderRadius: 12,
      }}
    >
      <h2
        style={{
          color: "#38bdf8",
          marginBottom: 20,
        }}
      >
        Contract Locations
      </h2>

      <MapView contracts={contracts} />
    </div>
  );
}