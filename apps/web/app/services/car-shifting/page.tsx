import React from 'react';
import Link from 'next/link';
import { Car, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CarShiftingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="space-y-4 text-center">
        <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          Auto Carrier Logistics
        </span>
        <h1 className="text-4xl font-black text-white">Car Carrier Services</h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto">
          Enclosed container & open trailer automobile transportation for hatchbacks, sedans, SUVs, and luxury cars.
        </p>
      </div>

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Service Highlights</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Pre-transport vehicle condition inspection report</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Door pickup & doorstep delivery</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Hydraulic car ramp loading</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/booking?service=car"
            className="px-8 py-4 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow inline-flex items-center gap-2"
          >
            <Car className="w-4 h-4" /> Book Car Carrier Now
          </Link>
        </div>
      </div>
    </div>
  );
}
