'use client';

import React from 'react';
import { PriceBreakdown } from '@/lib/pricing';
import { Calculator, Info, ShieldCheck, Tag } from 'lucide-react';

interface PriceEstimatorWidgetProps {
  breakdown: PriceBreakdown;
  pickupCity: string;
  dropCity: string;
}

export function PriceEstimatorWidget({ breakdown, pickupCity, dropCity }: PriceEstimatorWidgetProps) {
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-700/70 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Calculator className="w-4 h-4 text-orange-500" />
          <span>Estimated Moving Cost</span>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          No Pre-Payment Required
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-slate-400">
          <span>Base Booking Charge</span>
          <span className="text-slate-200 font-medium">₹{breakdown.basePrice.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-slate-400">
          <span>Route ({pickupCity} ➔ {dropCity} ~{breakdown.distanceKm} km)</span>
          <span className="text-slate-200 font-medium">₹{breakdown.distanceCharge.toLocaleString()}</span>
        </div>

        {breakdown.floorCharge > 0 && (
          <div className="flex justify-between text-slate-400">
            <span>Floor / Staircase Handling</span>
            <span className="text-slate-200 font-medium">₹{breakdown.floorCharge.toLocaleString()}</span>
          </div>
        )}

        {breakdown.packingCharge > 0 && (
          <div className="flex justify-between text-slate-400">
            <span>Packing Materials & Service</span>
            <span className="text-slate-200 font-medium">₹{breakdown.packingCharge.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
        <div>
          <span className="text-xs text-slate-400 font-medium block">Total Estimate</span>
          <span className="text-[10px] text-slate-500">Taxes extra as applicable</span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-orange-400">
            ₹{breakdown.totalEstimatedPrice.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
        <p className="leading-snug">{breakdown.disclaimer}</p>
      </div>
    </div>
  );
}
