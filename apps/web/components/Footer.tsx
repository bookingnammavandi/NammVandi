import React from 'react';
import Link from 'next/link';
import { Truck, Phone, Mail, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl brand-gradient-bg flex items-center justify-center text-white shadow-md">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                Namma<span className="text-orange-500">Move</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tamil Nadu & South India’s trusted logistics and relocation platform. Moving home, office, bikes & cars safely with verified drivers and zero hassle.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Verified Moving Crew</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-semibold text-sm tracking-wider uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/house-shifting" className="text-slate-600 hover:text-orange-600 transition-colors">
                  House Relocation & Packers
                </Link>
              </li>
              <li>
                <Link href="/services/office-shifting" className="text-slate-600 hover:text-orange-600 transition-colors">
                  Commercial & Office Shifting
                </Link>
              </li>
              <li>
                <Link href="/services/bike-shifting" className="text-slate-600 hover:text-orange-600 transition-colors">
                  Bike & Two-Wheeler Transport
                </Link>
              </li>
              <li>
                <Link href="/services/car-shifting" className="text-slate-600 hover:text-orange-600 transition-colors">
                  Car Carrier & Vehicle Logistics
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-orange-700 transition-colors font-semibold text-orange-600">
                  + Instant Price Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Major Cities */}
          <div>
            <h4 className="text-slate-900 font-semibold text-sm tracking-wider uppercase mb-4">
              Service Hubs
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-600">
              <li className="hover:text-orange-600 transition-colors">Chennai</li>
              <li className="hover:text-orange-600 transition-colors">Coimbatore</li>
              <li className="hover:text-orange-600 transition-colors">Bengaluru</li>
              <li className="hover:text-orange-600 transition-colors">Madurai</li>
              <li className="hover:text-orange-600 transition-colors">Trichy</li>
              <li className="hover:text-orange-600 transition-colors">Salem</li>
              <li className="hover:text-orange-600 transition-colors">Pondicherry</li>
              <li className="hover:text-orange-600 transition-colors">Hyderabad</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-slate-900 font-semibold text-sm tracking-wider uppercase mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-700">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span className="font-medium">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>support@NammaVandi.in</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                <span>NammaVandi Logistics Hub, Anna Salai, Chennai, Tamil Nadu - 600017</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-500 pt-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Support Hours: 6:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NammaVandi Logistics Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-800 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-slate-800 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
