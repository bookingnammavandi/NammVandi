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
      <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mx-auto shadow-sm">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-black text-slate-900">Something went wrong</h1>
      <p className="text-xs text-slate-600">
        An unexpected error occurred while loading this page. Please try again or return to the home page.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-md hover:shadow-orange-500/25 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-white text-slate-700 font-semibold text-xs border border-slate-200 hover:bg-slate-50 flex items-center gap-2 shadow-sm"
        >
          <Home className="w-4 h-4 text-orange-600" /> Home
        </Link>
      </div>
    </div>
  );
}
