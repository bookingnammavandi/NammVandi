import React from 'react';
import Link from 'next/link';
import {
  Home,
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  Package,
  Users,
  Clock,
  MapPin,
  Sparkles,
  Box,
  Sofa,
} from 'lucide-react';

export default function HouseShiftingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-14 sm:space-y-16">
      
      {/* ───────────────────── HEADER ───────────────────── */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-orange-600 bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">
          <Home className="w-3.5 h-3.5" />
          Relocation Specialists
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          House Shifting Services
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          Complete household packing, loading, transportation, and setup for apartments and independent houses across South India.
        </p>
      </div>

      {/* ───────────────────── KEY BENEFITS ───────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package, label: 'Full Packing', desc: 'Bubble wrap & boxes' },
          { icon: Users, label: 'Verified Crew', desc: 'Trained movers' },
          { icon: Truck, label: 'Covered Trucks', desc: 'Padded interiors' },
          { icon: Clock, label: 'On-Time Focus', desc: 'Scheduled arrival' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-center hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* ───────────────────── WHAT'S INCLUDED + WHY US ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* What's Included */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
              <Box className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">What’s Included</h2>
          </div>
          <ul className="space-y-3">
            {[
              'Multi-layer bubble wrap & sturdy carton packing',
              'Disassembly of beds, dining tables & wardrobes',
              'Safe staircase and elevator floor protection',
              'Covered truck transport with padded walls',
              'Careful unloading and basic re-arrangement',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="w-4.5 h-4.5 text-orange-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why NammaVandi */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Why NammaVandi</h2>
          </div>
          <ul className="space-y-3">
            {[
              'Background-verified moving crew',
              'Transparent, zero-hidden pricing',
              'Driver & vehicle details via WhatsApp/SMS',
              'Suitable for 1BHK to 5+ BHK homes',
              'Support for both within-city and intercity moves',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
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
            How House Shifting Works
          </h2>
          <p className="text-sm text-slate-500">
            A simple, predictable process from booking to setup.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, title: 'Share Details', desc: 'Tell us pickup & drop, home size, and preferred date.' },
            { step: 2, title: 'Get Quote', desc: 'Receive a clear estimate based on load and distance.' },
            { step: 3, title: 'Crew Assigned', desc: 'Verified team and vehicle details shared with you.' },
            { step: 4, title: 'Move & Settle', desc: 'Packing, transport, and careful unloading at destination.' },
          ].map((s) => (
            <div key={s.step} className="text-center space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white font-black text-base flex items-center justify-center mx-auto shadow-md shadow-orange-500/20">
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
            { icon: Sofa, title: '1BHK – 2BHK', desc: 'Apartments and compact homes with standard furniture.' },
            { icon: Home, title: '3BHK – 4BHK', desc: 'Larger apartments needing careful packing & multiple trips if required.' },
            { icon: MapPin, title: 'Villas & Houses', desc: 'Independent houses with more volume and outdoor items.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2.5 hover:border-slate-300 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 text-orange-500 flex items-center justify-center">
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
      <div className="relative overflow-hidden rounded-3xl border border-orange-200/50 bg-gradient-to-br from-orange-50 via-white to-orange-50/40 p-8 sm:p-11 text-center">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-orange-400/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative max-w-md mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ready to shift your home?
          </h2>
          <p className="text-sm text-slate-500">
            Get an instant estimate and book a verified crew in a few minutes.
          </p>
        </div>

        <div className="relative pt-6">
          <Link
            href="/booking?service=house"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <Truck className="w-4.5 h-4.5" />
            Book Your House Move
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}