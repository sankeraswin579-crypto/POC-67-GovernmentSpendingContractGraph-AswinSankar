"use client";

type Props = {
  contractCount: number;
  totalSpending: number;
  loading: boolean;
};

export default function Topbar({
  contractCount,
  totalSpending,
  loading,
}: Props) {
  return (
    <header
      style={{
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
        padding: "20px 40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#38bdf8",
              fontSize: 32,
            }}
          >
            Government Spending Contract Graph
          </h1>

          <p
            style={{
              color: "#94a3b8",
              marginTop: 8,
            }}
          >
            Interactive Government Procurement Intelligence Dashboard
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 15,
          }}
        >
          <StatusCard
            title="Contracts"
            value={
              loading
                ? "Loading..."
                : contractCount.toLocaleString()
            }
          />

          <StatusCard
            title="Spending"
            value={
              loading
                ? "Loading..."
                : `$${totalSpending.toLocaleString()}`
            }
          />
        </div>
      </div>
    </header>
  );
}

function StatusCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 10,
        padding: 15,
        minWidth: 140,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 12,
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 8,
          color: "#38bdf8",
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        {value}
      </div>
    </div>
  );
}