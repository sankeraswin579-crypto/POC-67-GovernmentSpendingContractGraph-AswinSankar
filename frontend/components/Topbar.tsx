"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#030712]/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">

        {/* Logo */}
        <div>
          <h1 className="text-xl font-bold tracking-wide text-cyan-400">
            Government Spending
          </h1>

          <p className="text-xs text-slate-400">
            AI Intelligence Dashboard
          </p>
        </div>

        {/* Search */}
        <div className="hidden w-[420px] lg:block">
          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#0B1117] px-4 py-2">
            <Search size={18} className="text-slate-500" />

            <input
              type="text"
              placeholder="Search departments, suppliers..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          <button className="relative rounded-lg p-2 hover:bg-slate-800">
            <Bell className="h-5 w-5 text-slate-300" />

            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-cyan-400"></span>
          </button>

          <div className="flex items-center gap-3">

            <UserCircle2
              className="text-cyan-400"
              size={38}
            />

            <div className="hidden md:block">
              <p className="text-sm font-semibold text-white">
                Administrator
              </p>

              <p className="text-xs text-slate-400">
                Government Analytics
              </p>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}