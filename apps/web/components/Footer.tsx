import React from 'react';
import Link from 'next/link';
import { Truck, Phone, Mail, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl brand-gradient-bg flex items-center justify-center text-white shadow-glow">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Namma<span className="text-orange-500">Move</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Tamil Nadu & South India’s trusted logistics and relocation platform. Moving home, office, bikes & cars safely with verified drivers and zero hassle.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Moving Crew</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/house-shifting" className="hover:text-orange-400 transition-colors">
                  House Relocation & Packers
                </Link>
              </li>
              <li>
                <Link href="/services/office-shifting" className="hover:text-orange-400 transition-colors">
                  Commercial & Office Shifting
                </Link>
              </li>
              <li>
                <Link href="/services/bike-shifting" className="hover:text-orange-400 transition-colors">
                  Bike & Two-Wheeler Transport
                </Link>
              </li>
              <li>
                <Link href="/services/car-shifting" className="hover:text-orange-400 transition-colors">
                  Car Carrier & Vehicle Logistics
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-orange-400 transition-colors font-semibold text-orange-400">
                  + Instant Price Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Major Cities */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Service Hubs
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li className="hover:text-slate-600">Chennai</li>
              <li className="hover:text-slate-200">Coimbatore</li>
              <li className="hover:text-slate-200">Bengaluru</li>
              <li className="hover:text-slate-200">Madurai</li>
              <li className="hover:text-slate-200">Trichy</li>
              <li className="hover:text-slate-200">Salem</li>
              <li className="hover:text-slate-200">Pondicherry</li>
              <li className="hover:text-slate-200">Hyderabad</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>support@NammaVandi.in</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                <span>NammaVandi Logistics Hub, Anna Salai, Chennai, Tamil Nadu - 600017</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-500 pt-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Support Hours: 6:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NammaVandi Logistics Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300">About Us</Link>
            <Link href="/contact" className="hover:text-slate-300">Support</Link>
            <Link href="/admin" className="hover:text-blue-400 text-slate-400">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
