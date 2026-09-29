import React from 'react';
import Link from 'next/link';
import { Building, ShieldCheck, CheckCircle2, Truck } from 'lucide-react';

export default function OfficeShiftingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="space-y-4 text-center">
        <span className="text-xs uppercase font-extrabold tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          Commercial Logistics
        </span>
        <h1 className="text-4xl font-black text-white">Office Shifting Services</h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto">
          Minimal business downtime commercial relocation for workstations, IT equipment, server racks, and office furniture.
        </p>
      </div>

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Commercial Benefits</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Weekend & overnight relocation slots</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Anti-static packing for desktop monitors & servers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Systematic box labeling per workstation department</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Office Fleet Options</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Large Container Trucks (5,000+ kg)</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Professional logistics supervisors on site</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/booking?service=office"
            className="px-8 py-4 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow inline-flex items-center gap-2"
          >
            <Building className="w-4 h-4" /> Schedule Office Relocation
          </Link>
        </div>
      </div>
    </div>
  );
}
