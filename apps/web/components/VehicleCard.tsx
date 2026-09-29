'use client';

import React from 'react';
import { VehicleType } from '@namma-move/types';
import { Truck, CheckCircle2, ShieldCheck, Weight } from 'lucide-react';

interface VehicleCardProps {
  type: VehicleType;
  title: string;
  description: string;
  capacity: string;
  recommendedFor: string;
  selected: boolean;
  onSelect: (type: VehicleType) => void;
  badge?: string;
}

export function VehicleCard({
  type,
  title,
  description,
  capacity,
  recommendedFor,
  selected,
  onSelect,
  badge,
}: VehicleCardProps) {
  return (
    <div
      onClick={() => onSelect(type)}
      className={`cursor-pointer rounded-2xl p-5 border transition-all relative overflow-hidden ${
        selected
          ? 'bg-slate-800/90 border-orange-500 shadow-glow ring-2 ring-orange-500/50'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
      }`}
    >
      {badge && (
        <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
          {badge}
        </span>
      )}

      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            selected ? 'brand-gradient-bg text-white shadow-glow' : 'bg-slate-800 text-slate-400'
          }`}
        >
          <Truck className="w-6 h-6 stroke-[2]" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">{title}</h3>
            {selected && <CheckCircle2 className="w-4 h-4 text-orange-400" />}
          </div>

          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>

          <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-slate-800/80 text-xs">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <Weight className="w-3.5 h-3.5 text-orange-400" />
              Cap: {capacity}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Best for: <strong className="text-slate-200">{recommendedFor}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
