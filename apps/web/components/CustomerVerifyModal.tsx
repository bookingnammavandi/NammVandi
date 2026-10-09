'use client';

import React, { useEffect, useRef, useState } from 'react';
import { normalizePhoneNumber } from '@namma-move/validation';
import { sendPhoneOtp, verifyPhoneOtp } from '@/lib/otp-service';
import { FieldError } from '@/components/LocationFields';
import { User, ShieldCheck, Lock, Sparkles, AlertCircle, X } from 'lucide-react';

export interface VerifiedCustomer {
  name: string;
  phone: string;
  email: string;
  alternatePhone: string;
  verifiedAt: number;
}

const STORAGE_KEY = 'nm_verified_customer';
const TTL_MS = 60 * 60 * 1000; // verification stays valid for 1 hour

export const saveVerifiedCustomer = (c: VerifiedCustomer) => {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch { /* storage blocked */ }
};

export const loadVerifiedCustomer = (): VerifiedCustomer | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as VerifiedCustomer;
    if (!c?.phone || !c?.verifiedAt || Date.now() - c.verifiedAt > TTL_MS) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return c;
  } catch {
    return null;
  }
};

export const clearVerifiedCustomer = () => {
  try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* storage blocked */ }
};

interface Props {
  open: boolean;
  onVerified: (c: VerifiedCustomer) => void;
  /** Home page: true (user can close). Booking page: false (verification is mandatory). */
  dismissible?: boolean;
  onClose?: () => void;
}

const inputCls = (bad?: string) =>
  `w-full bg-slate-900 border ${bad ? 'border-red-500' : 'border-slate-700'} focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none [color-scheme:dark]`;

export function CustomerVerifyModal({ open, onVerified, dismissible = true, onClose }: Props) {
  const [phase, setPhase] = useState<'details' | 'otp'>('details');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [mockOtpMsg, setMockOtpMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

    useEffect(() => {
    if (!open) return;
    setPhase('details');
    setOtp('');
    setErrors({});
    setFormError(null);
    setMockOtpMsg(null);
    setCooldown(0);
  }, [open]);

  // Lock page scroll, focus first field, Escape to close (only when dismissible)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissible) onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, dismissible, onClose]);

  if (!open) return null;

  const sendOtp = async (): Promise<boolean> => {
    try {
      const res = await sendPhoneOtp(phone);
      if (!res.success) {
        setFormError(res.message);
        return false;
      }
      setCooldown(res.cooldownSeconds || 30);
      if (res.mockOtp && process.env.NODE_ENV !== 'production') setMockOtpMsg(`Development OTP Code: ${res.mockOtp}`);
      return true;
    } catch (err: any) {
      setFormError(err.message || 'Failed to send OTP');
      return false;
    }
  };

  const submitDetails = async () => {
    setFormError(null);
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = 'Enter your full name';
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, '').slice(-10))) e.phone = 'Enter a valid 10-digit mobile number';
    if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter a valid email';
    setErrors(e);
    if (Object.keys(e).length) return;

    setBusy(true);
    const sent = await sendOtp();
    setBusy(false);
    if (sent) setPhase('otp');
  };

  const resendOtp = async () => {
    setFormError(null);
    setBusy(true);
    await sendOtp();
    setBusy(false);
  };

  const verify = async () => {
    setFormError(null);
    if (otp.length < 6) return setFormError('Please enter the 6-digit OTP');
    setBusy(true);
    try {
      const res = await verifyPhoneOtp(phone, otp);
      if (!res.success) return setFormError(res.message);
      const customer: VerifiedCustomer = {
        name: name.trim(),
        phone: normalizePhoneNumber(phone),
        email: email.trim(),
        alternatePhone: alternatePhone ? normalizePhoneNumber(alternatePhone) : '',
        verifiedAt: Date.now(),
      };
      saveVerifiedCustomer(customer);
      onVerified(customer);
    } catch (err: any) {
      setFormError(err.message || 'OTP verification failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === e.currentTarget && dismissible) onClose?.(); }}
    >
      <div
        role="dialog" aria-modal="true"
        aria-label={phase === 'details' ? 'Customer details' : 'Verify your phone'}
        className="glass-card w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-6 space-y-5 border border-slate-800 bg-slate-950"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {phase === 'details'
                ? <><User className="w-5 h-5 text-orange-500" /> Your details</>
                : <><ShieldCheck className="w-5 h-5 text-orange-500" /> Verify your phone</>}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {phase === 'details' ? (
                'We need these to confirm your booking.'
              ) : (
                <>
                  We sent a 6-digit code to <strong className="text-white">{phone}</strong>{' '}
                  <button type="button" onClick={() => { setPhase('details'); setOtp(''); setFormError(null); }} className="text-orange-400 hover:underline">
                    Change number
                  </button>
                </>
              )}
            </p>
          </div>
          {dismissible && (
            <button type="button" aria-label="Close" onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {formError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> <span>{formError}</span>
          </div>
        )}

        {phase === 'details' ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-semibold mb-1 block">Full name *</label>
              <input ref={firstFieldRef} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ramesh Kumar" className={inputCls(errors.name)} />
              <FieldError msg={errors.name} />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-semibold mb-1 block">Mobile number (+91) *</label>
              <input inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" className={inputCls(errors.phone)} />
              <FieldError msg={errors.phone} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Email (optional)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com" className={inputCls(errors.email)} />
                <FieldError msg={errors.email} />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Alternate phone (optional)</label>
                <input inputMode="numeric" value={alternatePhone} onChange={(e) => setAlternatePhone(e.target.value)} placeholder="99887 76655" className={inputCls()} />
              </div>
            </div>
            <button type="button" disabled={busy} onClick={submitDetails}
              className="w-full py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow disabled:opacity-60">
              {busy ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOtpMsg && process.env.NODE_ENV !== 'production' && (
              <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-3 rounded-xl text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> <span>{mockOtpMsg}</span>
              </div>
            )}
            <input
              inputMode="numeric" maxLength={6} value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => { if (e.key === 'Enter') verify(); }}
              placeholder="------" autoFocus
              className="w-full bg-slate-900 border-2 border-orange-500 rounded-2xl px-4 py-3.5 text-center text-2xl font-mono tracking-[0.5em] text-white outline-none"
            />
            <div className="flex items-center justify-between text-xs">
              <button type="button" disabled={cooldown > 0 || busy} onClick={resendOtp} className="text-orange-400 font-semibold hover:underline disabled:text-slate-600">
                {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
              </button>
              <span className="text-slate-500 flex items-center gap-1"><Lock className="w-3 h-3" /> Secure verification</span>
            </div>
            <button type="button" disabled={busy} onClick={verify}
              className="w-full py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow disabled:opacity-60">
              {busy ? 'Verifying...' : 'Verify and continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}