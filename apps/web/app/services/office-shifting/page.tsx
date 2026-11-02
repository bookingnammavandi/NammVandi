import React from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  Monitor,
  Clock,
  Users,
  Package,
  MapPin,
} from 'lucide-react';

export default function OfficeShiftingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-14 sm:space-y-16">
      
      {/* ───────────────────── HEADER ───────────────────── */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-blue-600 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full">
          <Building2 className="w-3.5 h-3.5" />
          Commercial Logistics
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Office Shifting Services
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          Minimal-downtime commercial relocation for workstations, IT equipment, server racks, and office furniture across South India.
        </p>
      </div>

      {/* ───────────────────── KEY BENEFITS ───────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: 'Flexible Slots', desc: 'Weekend & overnight' },
          { icon: Monitor, label: 'IT Safe Packing', desc: 'Anti-static materials' },
          { icon: Package, label: 'Labeled Boxes', desc: 'Per department' },
          { icon: Users, label: 'On-site Supervisor', desc: 'Coordinated move' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-center hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* ───────────────────── BENEFITS + FLEET ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Commercial Benefits */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Commercial Benefits</h2>
          </div>
          <ul className="space-y-3">
            {[
              'Weekend and overnight relocation slots',
              'Anti-static packing for monitors & servers',
              'Systematic box labeling per workstation / department',
              'Careful handling of desks, chairs & filing systems',
              'Coordinated to minimise business downtime',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fleet & Support */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Fleet & Support</h2>
          </div>
          <ul className="space-y-3">
            {[
              'Large container trucks (5,000+ kg capacity)',
              'Professional logistics supervisors on site',
              'Suitable for startups to multi-floor offices',
              'Within-city and intercity commercial moves',
              'Transparent pricing with clear estimates',
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
            How Office Relocation Works
          </h2>
          <p className="text-sm text-slate-500">
            A structured process designed to keep disruption low.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, title: 'Share Requirements', desc: 'Office size, equipment list, preferred date & time slot.' },
            { step: 2, title: 'Get Quote', desc: 'Clear estimate based on volume, floors, and distance.' },
            { step: 3, title: 'Plan & Assign', desc: 'Supervisor, crew, and vehicle details shared in advance.' },
            { step: 4, title: 'Move & Setup', desc: 'Packing, transport, and systematic unloading at the new site.' },
          ].map((s) => (
            <div key={s.step} className="text-center space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-500 text-white font-black text-base flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
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
              icon: Building2,
              title: 'Startups & Small Offices',
              desc: 'Compact teams that need fast, careful moves with minimal downtime.',
            },
            {
              icon: Monitor,
              title: 'IT & Tech Teams',
              desc: 'Desks, monitors, servers and networking gear with anti-static packing.',
            },
            {
              icon: MapPin,
              title: 'Multi-floor / Intercity',
              desc: 'Larger offices or relocation between cities with coordinated logistics.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2.5 hover:border-slate-300 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center">
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
      <div className="relative overflow-hidden rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-50 via-white to-blue-50/40 p-8 sm:p-11 text-center">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-400/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative max-w-md mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ready to relocate your office?
          </h2>
          <p className="text-sm text-slate-500">
            Get a clear estimate and schedule a low-downtime commercial move.
          </p>
        </div>

        <div className="relative pt-6">
          <Link
            href="/booking?service=office"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <Building2 className="w-4.5 h-4.5" />
            Schedule Office Relocation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}