"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

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

export default function SpendingChart({ contracts }: Props) {
  const totals: Record<string, number> = {};

  contracts.forEach((contract) => {
    totals[contract.agency] =
      (totals[contract.agency] || 0) + contract.amount;
  });

  const data = Object.entries(totals)
    .map(([agency, amount]) => ({
      agency,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10);

  return (
    <div
      style={{
        background: "#0f172a",
        marginTop: 30,
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
        Top Agencies by Spending
      </h2>

      {data.length === 0 ? (
        <div
          style={{
            height: 420,
            display: "grid",
            placeItems: "center",
            color: "#94a3b8",
          }}
        >
          No spending data available.
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={420}
        >
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 70,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="agency"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={80}
            />

            <YAxis />

            <Tooltip
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Spending",
              ]}
            />

            <Bar
              dataKey="amount"
              fill="#38bdf8"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}