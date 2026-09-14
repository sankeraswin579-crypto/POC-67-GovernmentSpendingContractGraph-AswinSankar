
"use client";

import { useState } from "react";

export default function DeveloperInfo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        data-testid="info-button"
        aria-label="Developer information"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/40 bg-[#0B1117] text-lg font-bold text-cyan-400 shadow-lg hover:bg-slate-800"
      >
        i
      </button>

      {open && (
        <div
          data-testid="developer-info-modal"
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-6"
        >
          <div className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-[#0B1117] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-cyan-400">
                Developer Information
              </h2>

              <button
                type="button"
                data-testid="info-close-button"
                aria-label="Close developer information"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-1 text-xl text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                ×
              </button>
            </div>

            <div
              data-testid="developer-signature"
              className="mt-6 rounded-xl border border-slate-700 bg-[#030712] p-5"
            >
              <p className="text-sm text-slate-400">
                Designed &amp; Transformed By
              </p>

              <p className="mt-2 text-lg font-bold text-white">
                Aswin Sankar P.S.
              </p>

              <p className="mt-2 text-sm text-cyan-400">
                Real Rails Internship • Batch 7
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                Government Spending Contract Graph — POC-67
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

