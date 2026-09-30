import React from 'react';
import Link from 'next/link';
import { Home, Building, Bike, Car, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function ServicesOverviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          NammaVandi Logistics & Relocation Services
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Comprehensive packing, moving, vehicle transportation, and commercial relocation across Tamil Nadu and South India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* House Shifting */}
        <div className="glass-card p-8 rounded-3xl space-y-4 flex flex-col justify-between border border-slate-800">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center">
              <Home className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white">House Shifting & Household Relocation</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete end-to-end household packing, loading, transportation, unloading, and unpacking for 1BHK, 2BHK, 3BHK, and independent villas. Includes bubble wrap, corrugated sheets, and heavy item handling.
            </p>
          </div>
          <Link
            href="/services/house-shifting"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:underline pt-4"
          >
            Learn More About House Shifting <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Office Shifting */}
        <div className="glass-card p-8 rounded-3xl space-y-4 flex flex-col justify-between border border-slate-800">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
              <Building className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white">Office & Commercial Relocation</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seamless commercial office shifting, workstation disassembly, IT server rack moving, executive desk transport, and archive packing designed to minimize business operational downtime.
            </p>
          </div>
          <Link
            href="/services/office-shifting"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:underline pt-4"
          >
            Learn More About Office Shifting <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bike Shifting */}
        <div className="glass-card p-8 rounded-3xl space-y-4 flex flex-col justify-between border border-slate-800">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Bike className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white">Bike & Two-Wheeler Transport</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Safe, scratch-proof door-to-door two-wheeler transport for scooters, motorcycles, and superbikes with multi-layer protective foam wrapping and tied-down truck securing.
            </p>
          </div>
          <Link
            href="/services/bike-shifting"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:underline pt-4"
          >
            Learn More About Bike Shifting <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Car Shifting */}
        <div className="glass-card p-8 rounded-3xl space-y-4 flex flex-col justify-between border border-slate-800">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <Car className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white">Car Carrier & Auto Logistics</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enclosed container and open car carrier vehicle transport across South India with full pre-transport condition check and live status updates.
            </p>
          </div>
          <Link
            href="/services/car-shifting"
            className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:underline pt-4"
          >
            Learn More About Car Shifting <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
