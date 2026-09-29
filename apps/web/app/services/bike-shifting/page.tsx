import React from 'react';
import Link from 'next/link';
import { Bike, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function BikeShiftingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="space-y-4 text-center">
        <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Two-Wheeler Logistics
        </span>
        <h1 className="text-4xl font-black text-white">Bike Transport Services</h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto">
          Door-to-door two-wheeler relocation across South India with multi-layer scratch protection.
        </p>
      </div>

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Safety Measures</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Corrugated sheet & foam body wrap</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Rear view mirror & indicator bubble wrapping</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Hydraulic belt truck tie-down</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Coverage</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Scooters, Commuters, Royal Enfield & Superbikes</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/booking?service=bike"
            className="px-8 py-4 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow inline-flex items-center gap-2"
          >
            <Bike className="w-4 h-4" /> Book Bike Transport
          </Link>
        </div>
      </div>
    </div>
  );
}
