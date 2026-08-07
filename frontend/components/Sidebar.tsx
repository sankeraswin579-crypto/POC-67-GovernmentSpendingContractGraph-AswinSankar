"use client";

import Link from "next/link";

const menu = [
  { name: "Dashboard", href: "/" },
  { name: "Suppliers", href: "/suppliers" },
  { name: "Agencies", href: "/agencies" },
  { name: "Analytics", href: "/analytics" },
  { name: "AI Intelligence", href: "/ai" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h1 className="text-xl font-bold mb-8">
        Government Spending
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg px-4 py-3 hover:bg-slate-700 transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}