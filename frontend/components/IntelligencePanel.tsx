"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props={open:boolean;station:any;onClose:()=>void};

export default function IntelligencePanel({open,station,onClose}:Props){
return(
<AnimatePresence>
{open&&(
<motion.aside initial={{x:420,opacity:0}} animate={{x:0,opacity:1}} exit={{x:420,opacity:0}} transition={{duration:.35}}
className="absolute right-0 top-0 z-[200] h-full w-[400px] border-l border-cyan-500/30 bg-[#071019]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,.25)]">
<div className="flex h-full flex-col p-6">
<div className="flex items-center justify-between">
<div>
<p className="text-xs uppercase tracking-[4px] text-cyan-300">Live Analysis</p>
<h2 className="text-2xl font-black text-white">EV Station Intelligence</h2>
</div>
<button onClick={onClose} className="rounded-lg border border-cyan-500/30 px-3 py-1 text-slate-300 hover:bg-cyan-500 hover:text-white">✕</button>
</div>
<div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
<p className="text-xs uppercase tracking-[3px] text-emerald-300">Network Status</p>
<p className="font-bold text-white">ONLINE • Operational</p>
</div>
<div className="mt-5 space-y-4">
<Info label="Station Name" value={station?.name}/>
<Info label="Country" value={station?.country_name}/>
<Info label="Operator" value={station?.operator_name}/>
<Info label="Latitude" value={station?.lat}/>
<Info label="Longitude" value={station?.lng}/>
</div>
<div className="mt-auto rounded-xl border border-cyan-500/20 bg-[#0b1722] p-4">
<p className="text-xs uppercase tracking-[3px] text-slate-400">Intelligence Summary</p>
<p className="mt-2 text-sm text-slate-300">Live EV charging station metadata from the FastAPI backend.</p>
</div>
</div>
</motion.aside>)}
</AnimatePresence>);}
function Info({label,value}:{label:string;value:any}){return(<div className="rounded-xl border border-cyan-500/20 bg-[#0b1722] p-4"><p className="text-[11px] uppercase tracking-[3px] text-slate-400">{label}</p><p className="mt-1 text-white">{value||"-"}</p></div>);}