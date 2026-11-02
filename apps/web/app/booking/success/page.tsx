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
      <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-slate-200 bg-white shadow-xl space-y-8 relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="w-24 h-24 rounded-full brand-gradient-bg opacity-10 blur-2xl absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Success Icon */}
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
        </div>

        {/* Success Headline */}
        <div className="space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Booking Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Thank You, {customerName}!
          </h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Your relocation request has been registered in the NammaVandi system. Our dispatch team will review and contact you shortly.
          </p>
        </div>

        {/* Booking Number Display Box */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-md mx-auto space-y-2">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">
            Your Booking Reference Number
          </span>
          <span className="text-2xl sm:text-3xl font-black font-mono brand-gradient-text tracking-wider block">
            {bookingNumber}
          </span>
          <p className="text-[11px] text-slate-400">
            Keep this number handy for tracking and vehicle assignment updates.
          </p>
        </div>

        {/* Message */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 max-w-lg mx-auto">
          <p>
            Our operational team will call you on <strong className="text-slate-900 font-semibold">{customerPhone || 'your registered phone number'}</strong> to confirm final item loading schedule and driver vehicle assignment.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          <Link
            href="/dashboard"
            className="py-3 px-4 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-md hover:shadow-orange-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            View Booking
          </Link>

          <Link
            href="/"
            className="py-3 px-4 rounded-xl glass-card text-slate-700 hover:text-slate-900 font-semibold text-xs border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Home className="w-4 h-4 text-orange-500" />
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="py-3 px-4 rounded-xl glass-card text-slate-700 hover:text-slate-900 font-semibold text-xs border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-blue-500" />
            Contact Us
          </Link>

          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(
              `Hi NammaVandi, I just created booking ${bookingNumber}. Please assist with my move.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
