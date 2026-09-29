'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Truck, Phone, Menu, X, ChevronDown, User, Shield, Calendar, MapPin, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  // Admin Login Modal State
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('gokulseenuvasan31@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState<string | null>(null);
  const [isVerifyingAdmin, setIsVerifyingAdmin] = useState(false);

  const handleAdminPortalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdminError(null);
    setAdminModalOpen(true);
  };

  const handleAdminModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    setIsVerifyingAdmin(true);

    try {
      const cleanEmail = adminEmail.trim().toLowerCase();

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          password: adminPassword,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setAdminError(result.message || 'Invalid login credentials');
        setIsVerifyingAdmin(false);
        return; // STOP! Do not route to /admin on error!
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('nammamove_admin_logged_in', 'true');
        localStorage.setItem('nammamove_admin_email', cleanEmail);
      }

      setAdminModalOpen(false);
      router.push('/admin');
    } catch (err: any) {
      setAdminError(err.message || 'Invalid user or password.');
    } finally {
      setIsVerifyingAdmin(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl brand-gradient-bg flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
            <Truck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-1">
              Namma<span className="text-orange-500">Move</span>
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Packers & Movers
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => setServicesDropdownOpen(true)} onMouseLeave={() => setServicesDropdownOpen(false)}>
            <button className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors py-2">
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-orange-400' : ''}`} />
            </button>

            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 w-64 glass-panel rounded-2xl p-2 shadow-2xl border border-slate-700/60 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link href="/services/house-shifting" className="block px-4 py-2.5 rounded-xl hover:bg-slate-800/70 text-sm text-slate-200 hover:text-orange-400 font-medium">
                  🏠 House Relocation
                </Link>
                <Link href="/services/office-shifting" className="block px-4 py-2.5 rounded-xl hover:bg-slate-800/70 text-sm text-slate-200 hover:text-orange-400 font-medium">
                  🏢 Office Shifting
                </Link>
                <Link href="/services/bike-shifting" className="block px-4 py-2.5 rounded-xl hover:bg-slate-800/70 text-sm text-slate-200 hover:text-orange-400 font-medium">
                  🏍️ Bike Transport
                </Link>
                <Link href="/services/car-shifting" className="block px-4 py-2.5 rounded-xl hover:bg-slate-800/70 text-sm text-slate-200 hover:text-orange-400 font-medium">
                  🚗 Car Carrier
                </Link>
                <div className="border-t border-slate-800 my-1"></div>
                <Link href="/services" className="block px-4 py-2 text-xs text-orange-400 hover:underline font-semibold">
                  View All Services →
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">
            About Us
          </Link>

          <Link href="/contact" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <User className="w-4 h-4 text-orange-400" />
            My Bookings
          </Link>

          <button
            onClick={handleAdminPortalClick}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-blue-400 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-blue-500/40 transition-colors cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            Admin Portal
          </button>

          <Link
            href="/booking"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl brand-gradient-bg text-white font-semibold text-sm shadow-glow hover:opacity-95 hover:scale-[1.02] transition-all"
          >
            <Calendar className="w-4 h-4" />
            Book a Move
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>
          <div className="space-y-1 pl-3">
            <span className="text-xs uppercase text-slate-500 font-bold tracking-wider">Services</span>
            <Link href="/services/house-shifting" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm text-slate-300 hover:text-orange-400">
              🏠 House Relocation
            </Link>
            <Link href="/services/office-shifting" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm text-slate-300 hover:text-orange-400">
              🏢 Office Shifting
            </Link>
            <Link href="/services/bike-shifting" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm text-slate-300 hover:text-orange-400">
              🏍️ Bike Transport
            </Link>
            <Link href="/services/car-shifting" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm text-slate-300 hover:text-orange-400">
              🚗 Car Carrier
            </Link>
          </div>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Contact
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            My Bookings & Profile
          </Link>
          <button
            onClick={(e) => { setMobileMenuOpen(false); handleAdminPortalClick(e); }}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-blue-400 hover:bg-slate-800"
          >
            Admin Portal
          </button>
          <div className="pt-2">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow"
            >
              Book a Move Now
            </Link>
          </div>
        </div>
      )}

      {/* ADMIN LOGIN POPUP MODAL */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 h-screen backdrop-blur-xl glass-panel flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-md w-full space-y-6 shadow-2xl relative animate-in zoom-in-95">
            
            {/* Close Button */}
            <button
              onClick={() => setAdminModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2 pt-2">
              <div className="w-12 h-12 rounded-2xl brand-gradient-bg text-white flex items-center justify-center mx-auto shadow-glow">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Admin Portal Verification</h3>
              <p className="text-xs text-slate-400">Enter admin username/email and password to verify with Supabase DB</p>
            </div>

            {/* Error Message */}
            {adminError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{adminError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAdminModalSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-orange-400" /> Admin Username / Email *
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="gokulseenuvasan31@gmail.com"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-blue-400" /> Password *
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl glass-card text-xs text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifyingAdmin}
                  className="px-6 py-2.5 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-glow hover:opacity-95 flex items-center gap-2"
                >
                  {isVerifyingAdmin ? 'Verifying DB...' : 'Login & Go to Admin'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </header>
  );
}
