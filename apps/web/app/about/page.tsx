import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Target, Eye, Award, Users, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
          About NammaVandi
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white">
          Who We Are & How We Relocate
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          NammaVandi is a modern logistics and relocation technology platform built specifically for homes, offices, two-wheelers, and automobiles across South India.
        </p>
      </div>

      {/* Grid: Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            To provide transparent, dependable, and stress-free moving services powered by modern software, verified drivers, instant price estimations, and real-time customer updates.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Vision</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            To build South India’s most reliable logistics platform where every family and enterprise can move goods safely with complete peace of mind.
          </p>
        </div>
      </div>

      {/* Why Choose NammaVandi */}
      <div className="glass-card p-10 rounded-3xl border border-slate-800 space-y-8">
        <h2 className="text-2xl font-extrabold text-white text-center">Why Choose NammaVandi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-400" /> Transparent Pricing
            </h4>
            <p className="leading-relaxed">Upfront cost calculator based on load volume, vehicle capacity, and distance.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Drivers
            </h4>
            <p className="leading-relaxed">Licensed drivers and experienced packing crews equipped with protective materials.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> WhatsApp Notifications
            </h4>
            <p className="leading-relaxed">Receive instant driver name, phone number, and vehicle arrival alerts directly on WhatsApp.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
