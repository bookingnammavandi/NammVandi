import React from 'react';
import Link from 'next/link';
import { Truck, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl brand-gradient-bg text-white flex items-center justify-center mx-auto shadow-glow">
        <Truck className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-white">404 — Page Not Found</h1>
      <p className="text-xs text-slate-400">
        The page or relocation route you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-glow"
      >
        <Home className="w-4 h-4" /> Back to Home Page
      </Link>
    </div>
  );
}
