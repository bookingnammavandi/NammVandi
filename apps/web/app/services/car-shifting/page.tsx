import React from 'react';
import Link from 'next/link';
import {
  Car,
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  ClipboardCheck,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function CarShiftingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-14 sm:space-y-16">
      
      {/* ───────────────────── HEADER ───────────────────── */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-purple-600 bg-purple-50 border border-purple-100 px-3.5 py-1.5 rounded-full">
          <Car className="w-3.5 h-3.5" />
          Auto Carrier Logistics
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Car Carrier Services
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          Enclosed container and open trailer transportation for hatchbacks, sedans, SUVs, and luxury cars across South India.
        </p>
      </div>

      {/* ───────────────────── KEY BENEFITS ───────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: ClipboardCheck, label: 'Pre-Inspection', desc: 'Condition report' },
          { icon: ShieldCheck, label: 'Secure Loading', desc: 'Hydraulic ramps' },
          { icon: Truck, label: 'Enclosed / Open', desc: 'Container options' },
          { icon: MapPin, label: 'Door-to-Door', desc: 'Pickup & delivery' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-center hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* ───────────────────── HIGHLIGHTS + COVERAGE ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Service Highlights */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Service Highlights</h2>
          </div>
          <ul className="space-y-3">
            {[
              'Pre-transport vehicle condition inspection report',
              'Door pickup and doorstep delivery',
              'Hydraulic car ramp loading for safety',
              'Enclosed container or open trailer options',
              'Tracking updates shared during transit',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="w-4.5 h-4.5 text-purple-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What We Carry */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">What We Transport</h2>
          </div>
          <ul className="space-y-3">
            {[
              'Hatchbacks and compact cars',
              'Sedans and executive cars',
              'SUVs and MUVs',
              'Luxury and premium vehicles',
              'Within-city and intercity routes across South India',
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
            How Car Carrier Works
          </h2>
          <p className="text-sm text-slate-500">
            A clear process from booking to safe delivery of your vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, title: 'Share Details', desc: 'Pickup & drop locations, car type, and preferred date.' },
            { step: 2, title: 'Get Quote', desc: 'Transparent estimate based on distance and vehicle size.' },
            { step: 3, title: 'Inspection & Pickup', desc: 'Condition report and secure loading with hydraulic ramp.' },
            { step: 4, title: 'Safe Delivery', desc: 'Doorstep handover with transit updates along the way.' },
          ].map((s) => (
            <div key={s.step} className="text-center space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-500 text-white font-black text-base flex items-center justify-center mx-auto shadow-md shadow-purple-500/20">
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
              icon: Car,
              title: 'Hatchbacks & Sedans',
              desc: 'Everyday cars that need careful door-to-door carrier transport.',
            },
            {
              icon: Truck,
              title: 'SUVs & Luxury Cars',
              desc: 'Larger or premium vehicles that benefit from enclosed options.',
            },
            {
              icon: MapPin,
              title: 'Intercity Relocation',
              desc: 'Moving your car across cities in South India with tracked delivery.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2.5 hover:border-slate-300 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 text-purple-600 flex items-center justify-center">
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
      <div className="relative overflow-hidden rounded-3xl border border-purple-200/50 bg-gradient-to-br from-purple-50 via-white to-purple-50/40 p-8 sm:p-11 text-center">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-400/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative max-w-md mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ready to transport your car?
          </h2>
          <p className="text-sm text-slate-500">
            Get a clear quote and book enclosed or open car carrier service in minutes.
          </p>
        </div>

        <div className="relative pt-6">
          <Link
            href="/booking?service=car"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <Car className="w-4.5 h-4.5" />
            Book Car Carrier
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}