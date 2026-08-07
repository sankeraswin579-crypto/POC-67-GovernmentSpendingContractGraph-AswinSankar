"use client";

type Props = {
  title: string;
  value: string | number;
  color?: string;
};

export default function StatsCard({
  title,
  value,
  color = "#38bdf8",
}: Props) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: 20,
        borderRadius: 12,
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
          fontSize: 32,
          color,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}