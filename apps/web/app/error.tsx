'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-black text-white">Something went wrong</h1>
      <p className="text-xs text-slate-400">
        An unexpected error occurred while loading this page. Please try again or return to the home page.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-glow flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl glass-card text-slate-300 font-semibold text-xs border border-slate-700 flex items-center gap-2"
        >
          <Home className="w-4 h-4 text-orange-400" /> Home
        </Link>
      </div>
    </div>
  );
}
