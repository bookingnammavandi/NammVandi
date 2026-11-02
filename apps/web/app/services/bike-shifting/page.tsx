import React from 'react';
import Link from 'next/link';
import {
  Bike,
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  Package,
  MapPin,
  Clock,
  Sparkles,
  Wrench,
} from 'lucide-react';

export default function BikeShiftingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-14 sm:space-y-16">
      
      {/* ───────────────────── HEADER ───────────────────── */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-emerald-600 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full">
          <Bike className="w-3.5 h-3.5" />
          Two-Wheeler Logistics
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Bike Transport Services
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          Door-to-door two-wheeler relocation across South India with multi-layer scratch protection and careful handling.
        </p>
      </div>

      {/* ───────────────────── KEY BENEFITS ───────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package, label: 'Multi-layer Wrap', desc: 'Foam + corrugated' },
          { icon: ShieldCheck, label: 'Scratch Protection', desc: 'Mirrors & body' },
          { icon: Truck, label: 'Secure Tie-down', desc: 'Hydraulic belts' },
          { icon: Clock, label: 'Door-to-Door', desc: 'Pickup & delivery' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-center hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* ───────────────────── SAFETY + COVERAGE ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Safety Measures */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Safety Measures</h2>
          </div>
          <ul className="space-y-3">
            {[
              'Corrugated sheet & foam body wrap',
              'Rear-view mirror & indicator bubble wrapping',
              'Hydraulic belt truck tie-down for stability',
              'Careful loading to avoid scratches & dents',
              'Door-to-door pickup and delivery handling',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coverage & Why Us */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
              <Bike className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">What We Transport</h2>
          </div>
          <ul className="space-y-3">
            {[
              'Scooters and commuter bikes',
              'Royal Enfield and similar cruisers',
              'Superbikes and premium motorcycles',
              'Within-city and intercity routes',
              'Transparent pricing with no hidden charges',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="w-4.5 h-4.5 text-orange-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ───────────────────── HOW IT WORKS ───────────────────── */}
      <div className="bg-slate-50/70 border border-slate-200/60 rounded-3xl p-7 sm:p-10 space-y-8">
        <div className="text-center max-w-md mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            How Bike Transport Works
          </h2>
          <p className="text-sm text-slate-500">
            Simple steps from booking to safe delivery of your two-wheeler.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, title: 'Share Details', desc: 'Pickup & drop cities, bike type, and preferred date.' },
            { step: 2, title: 'Get Quote', desc: 'Clear estimate based on distance and bike category.' },
            { step: 3, title: 'Pickup Scheduled', desc: 'Driver & vehicle details shared via WhatsApp/SMS.' },
            { step: 4, title: 'Safe Delivery', desc: 'Protected transport and doorstep handover.' },
          ].map((s) => (
            <div key={s.step} className="text-center space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white font-black text-base flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
                {s.step}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[180px] mx-auto">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ───────────────────── IDEAL FOR ───────────────────── */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Ideal For
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Bike,
              title: 'Scooters & Commuters',
              desc: 'Everyday two-wheelers that need careful door-to-door shifting.',
            },
            {
              icon: Wrench,
              title: 'Royal Enfield & Cruisers',
              desc: 'Heavier bikes that benefit from secure tie-down and padded transport.',
            },
            {
              icon: MapPin,
              title: 'Intercity Moves',
              desc: 'Relocating across cities in South India with tracked, protected delivery.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2.5 hover:border-slate-300 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 text-emerald-600 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ───────────────────── CTA ───────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 p-8 sm:p-11 text-center">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-400/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative max-w-md mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ready to transport your bike?
          </h2>
          <p className="text-sm text-slate-500">
            Get a clear quote and book door-to-door two-wheeler relocation in minutes.
          </p>
        </div>

        <div className="relative pt-6">
          <Link
            href="/booking?service=bike"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <Bike className="w-4.5 h-4.5" />
            Book Bike Transport
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}