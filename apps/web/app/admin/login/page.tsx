'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Shield, Lock, Mail, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('bookingnammavandi@gmail.com');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          password: password,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setErrorMsg(result.message || 'Invalid login credentials');
        setIsSubmitting(false);
        return; // STOP! Do not route to /admin on failure!
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('NammaVandi_admin_logged_in', 'true');
        localStorage.setItem('NammaVandi_admin_email', cleanEmail);
      }

      router.push('/admin');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid user credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 max-w-md w-full space-y-6 shadow-2xl relative">
        
        {/* Glow */}
        <div className="w-20 h-20 rounded-full brand-gradient-bg opacity-20 blur-xl absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl brand-gradient-bg text-white flex items-center justify-center mx-auto shadow-glow">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white">NammaVandi Admin Login</h1>
          <p className="text-xs text-slate-400">Enter your administrator email & password to access control center</p>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-orange-400" /> Admin Username / Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-400" /> Admin Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <span>Verifying Admin DB...</span>
            ) : (
              <>
                <span>Login to Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-300">
            ← Back to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}
