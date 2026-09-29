'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { CheckCircle2, PhoneCall, Home, User, MessageSquare, ArrowRight } from 'lucide-react';

export default function BookingSuccessPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-slate-400">Loading booking confirmation...</div>}>
      <BookingSuccessContent />
    </React.Suspense>
  );
}

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const bookingNumber = searchParams?.get('bookingNumber') || 'NM-20261012-0001';
  const customerName = searchParams?.get('name') || 'Valued Customer';
  const customerPhone = searchParams?.get('phone') || '';

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#3b82f6', '#10b981'],
      });
    } catch (e) {
      // Ignore if canvas confetti isn't ready
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-slate-800 space-y-8 relative overflow-hidden shadow-2xl">
        
        {/* Glow accent */}
        <div className="w-24 h-24 rounded-full brand-gradient-bg opacity-20 blur-2xl absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Success Icon */}
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
          <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
        </div>

        {/* Success Headline */}
        <div className="space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Booking Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Thank You, {customerName}!
          </h1>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            Your relocation request has been registered in the NammaMove system. Our dispatch team will review and contact you shortly.
          </p>
        </div>

        {/* Booking Number Display Box */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 max-w-md mx-auto space-y-2">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
            Your Booking Reference Number
          </span>
          <span className="text-2xl sm:text-3xl font-black font-mono brand-gradient-text tracking-wider block">
            {bookingNumber}
          </span>
          <p className="text-[11px] text-slate-500">
            Keep this number handy for tracking and vehicle assignment updates.
          </p>
        </div>

        {/* Message */}
        <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-400 max-w-lg mx-auto">
          <p>
            Our operational team will call you on <strong className="text-slate-200">{customerPhone || 'your registered phone number'}</strong> to confirm final item loading schedule and driver vehicle assignment.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          <Link
            href="/dashboard"
            className="py-3 px-4 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-glow hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            View Booking
          </Link>

          <Link
            href="/"
            className="py-3 px-4 rounded-xl glass-card text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-orange-400" />
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="py-3 px-4 rounded-xl glass-card text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-blue-400" />
            Contact Us
          </Link>

          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(
              `Hi NammaMove, I just created booking ${bookingNumber}. Please assist with my move.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 font-bold text-xs flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
