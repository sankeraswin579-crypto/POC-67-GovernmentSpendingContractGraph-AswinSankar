"use client";

type Props = {
  title: string;
  value: string | number;
  change?: string;
  color?: string;
};

export default function StatsCard({
  title,
  value,
  change,
  color = "#38bdf8",
}: Props) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: 12,
        padding: 20,
        minHeight: 120,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 12,
          fontSize: 30,
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </div>

      {change && (
        <div
          style={{
            marginTop: 10,
            fontSize: 13,
            color:
              change.startsWith("-")
                ? "#ef4444"
                : "#22c55e",
            fontWeight: 600,
          }}
        >
          {change}
        </div>
      )}
    </div>
  );
}