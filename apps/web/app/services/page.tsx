import React from 'react';
import Link from 'next/link';
import {
  Home,
  Building2,
  Bike,
  Car,
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
  Sparkles,
} from 'lucide-react';

const services = [
  {
    href: '/services/house-shifting',
    icon: Home,
    color: 'orange',
    title: 'House Shifting',
    subtitle: 'Household Relocation',
    desc: 'End-to-end packing, loading, transport, and unloading for 1BHK to villas. Bubble wrap, corrugated sheets, and careful heavy-item handling.',
    cta: 'Explore House Shifting',
  },
  {
    href: '/services/office-shifting',
    icon: Building2,
    color: 'blue',
    title: 'Office Relocation',
    subtitle: 'Commercial Moves',
    desc: 'Workstations, IT equipment, server racks, and furniture moved with minimal downtime. Weekend and overnight slots available.',
    cta: 'Explore Office Shifting',
  },
  {
    href: '/services/bike-shifting',
    icon: Bike,
    color: 'emerald',
    title: 'Bike Transport',
    subtitle: 'Two-Wheeler Logistics',
    desc: 'Door-to-door transport for scooters, motorcycles, and superbikes with multi-layer foam wrap and secure truck tie-down.',
    cta: 'Explore Bike Transport',
  },
  {
    href: '/services/car-shifting',
    icon: Car,
    color: 'purple',
    title: 'Car Carrier',
    subtitle: 'Auto Logistics',
    desc: 'Enclosed container and open trailer transport for hatchbacks, sedans, SUVs, and luxury cars with pre-move inspection.',
    cta: 'Explore Car Carrier',
  },
];

const colorMap: Record<
  string,
  { iconBg: string; borderHover: string; text: string; badge: string }
> = {
  orange: {
    iconBg: 'bg-orange-50 border-orange-100 text-orange-600',
    borderHover: 'hover:border-orange-300',
    text: 'text-orange-600',
    badge: 'bg-orange-50 text-orange-600',
  },
  blue: {
    iconBg: 'bg-blue-50 border-blue-100 text-blue-600',
    borderHover: 'hover:border-blue-300',
    text: 'text-blue-600',
    badge: 'bg-blue-50 text-blue-600',
  },
  emerald: {
    iconBg: 'bg-emerald-50 border-emerald-100 text-emerald-600',
    borderHover: 'hover:border-emerald-300',
    text: 'text-emerald-600',
    badge: 'bg-emerald-50 text-emerald-600',
  },
  purple: {
    iconBg: 'bg-purple-50 border-purple-100 text-purple-600',
    borderHover: 'hover:border-purple-300',
    text: 'text-purple-600',
    badge: 'bg-purple-50 text-purple-600',
  },
};

export default function ServicesOverviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-14 sm:space-y-16">
      
      {/* ───────────────────── HEADER ───────────────────── */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-orange-600 bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          Our Services
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Logistics & Relocation Services
        </h1>
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
          Packing, moving, vehicle transport, and commercial relocation across Tamil Nadu and South India — with verified crews and transparent pricing.
        </p>
      </div>

      {/* ───────────────────── QUICK TRUST STRIP ───────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: ShieldCheck, label: 'Verified Crews' },
          { icon: Truck, label: 'Covered Fleet' },
          { icon: Clock, label: 'On-Time Focus' },
          { icon: Sparkles, label: 'Transparent Quotes' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-2.5 bg-white border border-slate-200/80 rounded-xl px-3.5 py-3"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 text-orange-500 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* ───────────────────── SERVICE CARDS ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          const colors = colorMap[service.color];
          return (
            <Link
              key={service.href}
              href={service.href}
              className={`group bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md ${colors.borderHover} transition-all duration-300`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 ${colors.iconBg}`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${colors.badge}`}
                  >
                    {service.subtitle}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-slate-800">
                    {service.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed mt-2">
                    {service.desc}
                  </p>
                </div>
              </div>

              <div
                className={`mt-6 inline-flex items-center gap-1.5 text-sm font-bold ${colors.text}`}
              >
                {service.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ───────────────────── CTA ───────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-orange-200/50 bg-gradient-to-br from-orange-50 via-white to-orange-50/40 p-8 sm:p-11 text-center">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-orange-400/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative max-w-lg mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Not sure which service you need?
          </h2>
          <p className="text-sm text-slate-500">
            Start a booking and we’ll help match the right vehicle and crew for your move.
          </p>
        </div>

        <div className="relative pt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <Truck className="w-4.5 h-4.5" />
            Start Booking
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-semibold text-sm hover:border-slate-300 transition-colors"
          >
            Talk to Support
          </Link>
        </div>
      </div>
    </div>
  );
}