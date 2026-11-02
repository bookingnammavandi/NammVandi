'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Truck, Menu, X, ChevronDown, User, Shield, Calendar } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel bg-white/90 border-b border-slate-200/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl brand-gradient-bg flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Truck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
              Namma<span className="text-orange-500">Vandi</span>
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              Packers & Movers
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors">
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => setServicesDropdownOpen(true)} onMouseLeave={() => setServicesDropdownOpen(false)}>
            <button className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors py-2">
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-orange-500' : ''}`} />
            </button>

            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 w-64 glass-panel bg-white rounded-2xl p-2 shadow-xl border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link href="/services/house-shifting" className="block px-4 py-2.5 rounded-xl hover:bg-orange-50 text-sm text-slate-700 hover:text-orange-600 font-medium transition-colors">
                  🏠 House Relocation
                </Link>
                <Link href="/services/office-shifting" className="block px-4 py-2.5 rounded-xl hover:bg-orange-50 text-sm text-slate-700 hover:text-orange-600 font-medium transition-colors">
                  🏢 Office Shifting
                </Link>
                <Link href="/services/bike-shifting" className="block px-4 py-2.5 rounded-xl hover:bg-orange-50 text-sm text-slate-700 hover:text-orange-600 font-medium transition-colors">
                  🏍️ Bike Transport
                </Link>
                <Link href="/services/car-shifting" className="block px-4 py-2.5 rounded-xl hover:bg-orange-50 text-sm text-slate-700 hover:text-orange-600 font-medium transition-colors">
                  🚗 Car Carrier
                </Link>
                <div className="border-t border-slate-100 my-1"></div>
                <Link href="/services" className="block px-4 py-2 text-xs text-orange-600 hover:underline font-semibold">
                  View All Services →
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors">
            About Us
          </Link>

          <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <User className="w-4 h-4 text-orange-500" />
            My Bookings
          </Link>

          <Link
            href="/booking"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl brand-gradient-bg text-white font-semibold text-sm shadow-md hover:shadow-orange-500/25 hover:scale-[1.02] transition-all"
          >
            <Calendar className="w-4 h-4" />
            Book a Move
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            Home
          </Link>
          <div className="space-y-1 pl-3">
            <span className="text-xs uppercase text-slate-500 font-bold tracking-wider">Services</span>
            <Link href="/services/house-shifting" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm text-slate-600 hover:text-orange-600">
              🏠 House Relocation
            </Link>
            <Link href="/services/office-shifting" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm text-slate-600 hover:text-orange-600">
              🏢 Office Shifting
            </Link>
            <Link href="/services/bike-shifting" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm text-slate-600 hover:text-orange-600">
              🏍️ Bike Transport
            </Link>
            <Link href="/services/car-shifting" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-sm text-slate-600 hover:text-orange-600">
              🚗 Car Carrier
            </Link>
          </div>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            Contact
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            My Bookings & Profile
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-blue-600 hover:bg-blue-50"
          >
            Admin Portal
          </Link>
          <div className="pt-2">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-md"
            >
              Book a Move Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
