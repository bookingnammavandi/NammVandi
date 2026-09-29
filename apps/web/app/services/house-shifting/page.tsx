import React from 'react';
import Link from 'next/link';
import { Home, ShieldCheck, CheckCircle2, Truck, ArrowRight } from 'lucide-react';

export default function HouseShiftingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="space-y-4 text-center">
        <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
          Relocation Specialists
        </span>
        <h1 className="text-4xl font-black text-white">House Shifting Services</h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto">
          Hassle-free household packing, loading, transportation, and setup for apartments and independent houses.
        </p>
      </div>

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">What's Included</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Multi-layer bubble wrap & paper box packing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Disassembly of beds & dining tables</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Safe staircase & elevator floor handling</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /> Covered truck transport with padded walls</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Why NammaMove for Home Shift</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Background verified moving crew</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero hidden pricing policy</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Dedicated driver assignment notification</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/booking?service=house"
            className="px-8 py-4 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow inline-flex items-center gap-2"
          >
            <Truck className="w-4 h-4" /> Book Your House Move Now
          </Link>
        </div>
      </div>
    </div>
  );
}
