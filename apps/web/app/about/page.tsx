import React from 'react';
import Link from 'next/link';
import {
  Truck,
  ShieldCheck,
  Target,
  Eye,
  Award,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16 sm:space-y-20">
      
      {/* ───────────────────── HEADER ───────────────────── */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-orange-600 bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          About NammaVandi
        </span>
        
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Who We Are & How We Relocate
        </h1>
        
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          NammaVandi is a modern logistics and relocation platform built for homes, offices, two-wheelers, and automobiles across South India.
        </p>
      </div>

      {/* ───────────────────── MISSION & VISION ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            To provide transparent, dependable, and stress-free moving services powered by modern software, verified drivers, instant price estimations, and real-time customer updates.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Our Vision</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            To build South India’s most reliable logistics platform where every family and enterprise can move goods safely with complete peace of mind.
          </p>
        </div>
      </div>

      {/* ───────────────────── QUICK STATS ───────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {[
          { icon: MapPin, label: 'Cities Covered', value: '9+' },
          { icon: Users, label: 'Happy Customers', value: 'Growing' },
          { icon: ShieldCheck, label: 'Verified Drivers', value: '100%' },
          { icon: Clock, label: 'On-Time Focus', value: 'Priority' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 text-center hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* ───────────────────── WHY CHOOSE US ───────────────────── */}
      <div className="bg-slate-50/70 border border-slate-200/60 rounded-3xl p-8 sm:p-10 lg:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Choose NammaVandi
          </h2>
          <p className="text-sm text-slate-500">
            Built for reliability, transparency, and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              color: 'orange',
              title: 'Transparent Pricing',
              desc: 'Upfront cost calculator based on load volume, vehicle capacity, and distance — no surprises.',
            },
            {
              icon: CheckCircle2,
              color: 'emerald',
              title: 'Verified Drivers',
              desc: 'Licensed drivers and experienced packing crews equipped with proper protective materials.',
            },
            {
              icon: Truck,
              color: 'blue',
              title: 'WhatsApp Updates',
              desc: 'Receive driver name, phone number, and vehicle arrival alerts instantly on WhatsApp.',
            },
          ].map((item) => {
            const Icon = item.icon;
            const colorMap: Record<string, string> = {
              orange: 'bg-orange-50 text-orange-600 border-orange-100',
              emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
              blue: 'bg-blue-50 text-blue-600 border-blue-100',
            };
            return (
              <div
                key={item.title}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-3 hover:shadow-sm transition-shadow"
              >
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center ${colorMap[item.color]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ───────────────────── OUR VALUES ───────────────────── */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What We Stand For
          </h2>
          <p className="text-sm text-slate-500">
            The principles that guide every move we handle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            {
              icon: ShieldCheck,
              title: 'Safety First',
              desc: 'Careful packing, secure loading, and responsible handling of every item.',
            },
            {
              icon: Award,
              title: 'Reliability',
              desc: 'Clear communication and on-time focus so you can plan with confidence.',
            },
            {
              icon: Users,
              title: 'Customer Care',
              desc: 'Supportive team that stays reachable before, during, and after the move.',
            },
            {
              icon: Target,
              title: 'Transparency',
              desc: 'Honest pricing and real-time updates so nothing is left in the dark.',
            },
          ].map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-orange-500 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{value.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ───────────────────── CTA ───────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-orange-200/50 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 p-8 sm:p-12 text-center">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-orange-400/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative max-w-lg mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ready to experience a smoother move?
          </h2>
          <p className="text-sm text-slate-500">
            Get an instant estimate and book your vehicle in just a few minutes.
          </p>
        </div>

        <div className="relative flex flex-wrap items-center justify-center gap-3 pt-6">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Start Booking
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-semibold text-sm hover:border-slate-300 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-orange-500" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}