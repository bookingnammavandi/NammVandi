'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Truck,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MapPin,
  Building,
  Home,
  Bike,
  Car,
  ChevronRight,
  Star,
  HelpCircle,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [pickupCity, setPickupCity] = useState('Chennai');
  const [dropCity, setDropCity] = useState('Coimbatore');
  const [vehicle, setVehicle] = useState('Eicher Tempo');
  const [pickupDate, setPickupDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/booking?pickupCity=${encodeURIComponent(pickupCity)}&dropCity=${encodeURIComponent(
        dropCity
      )}&vehicle=${encodeURIComponent(vehicle)}&date=${pickupDate}`
    );
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 pb-16 overflow-hidden">
        {/* Glow background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-orange-500/30 text-xs font-semibold text-orange-400">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>South India’s Most Trusted Relocation Platform</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Move Anything. <br />
                <span className="brand-gradient-text">Move Anywhere.</span> <br />
                Move with NammaVandi.
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                Reliable relocation and transportation services for homes, offices, bikes, and cars. Verified drivers, instant pricing, and zero hidden charges.
              </p>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Drivers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>On-Time Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Safe Handling</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/booking"
                  className="px-8 py-4 rounded-xl brand-gradient-bg text-white font-bold text-base shadow-glow hover:scale-[1.02] transition-transform flex items-center gap-3"
                >
                  <Truck className="w-5 h-5" />
                  Book a Move Now
                </Link>
                <Link
                  href="/services"
                  className="px-6 py-4 rounded-xl glass-card text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 hover:border-slate-600 transition-colors"
                >
                  Explore Services →
                </Link>
              </div>
            </div>

            {/* Quick Booking Widget */}
            <div className="lg:col-span-5">
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-bold text-white">Quick Booking</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    Instant Quote
                  </span>
                </div>

                <form onSubmit={handleQuickBook} className="space-y-4">
                  {/* From City */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1.5 block flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" /> Pickup City
                    </label>
                    <select
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
                    >
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Trichy">Trichy</option>
                      <option value="Salem">Salem</option>
                      <option value="Pondicherry">Pondicherry</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>

                  {/* To City */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1.5 block flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" /> Drop City
                    </label>
                    <select
                      value={dropCity}
                      onChange={(e) => setDropCity(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
                    >
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Trichy">Trichy</option>
                      <option value="Salem">Salem</option>
                      <option value="Pondicherry">Pondicherry</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>

                  {/* Vehicle & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1.5 block">
                        Vehicle Type
                      </label>
                      <select
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-sm text-white outline-none"
                      >
                        <option value="Eicher Tempo">Eicher Tempo</option>
                        <option value="Mini Truck">Mini Truck</option>
                        <option value="Pickup Truck">Pickup Truck</option>
                        <option value="Large Truck">Large Truck</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1.5 block flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-orange-400" /> Date
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-sm text-white outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Continue Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tailored Moving Services for Every Need
          </h2>
          <p className="text-slate-400 text-base">
            From single-room apartments to multi-floor offices and vehicle shipping, NammaVandi delivers seamless transport.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Link href="/services/house-shifting" className="glass-card p-6 rounded-2xl group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
              House Shifting
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Complete packing, loading, transport, and unloading for 1BHK to 5+ BHK apartments and independent houses.
            </p>
            <div className="text-xs font-semibold text-orange-400 flex items-center gap-1 pt-2">
              Book House Move <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

          <Link href="/services/office-shifting" className="glass-card p-6 rounded-2xl group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              Office Relocation
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Commercial office moving, IT server rack transport, desks, chairs, and file archive shifting with minimal downtime.
            </p>
            <div className="text-xs font-semibold text-blue-400 flex items-center gap-1 pt-2">
              Book Office Move <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

          <Link href="/services/bike-shifting" className="glass-card p-6 rounded-2xl group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bike className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              Bike Transport
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Door-to-door two-wheeler relocation with multi-layer bubble & corrugated sheet protection.
            </p>
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 pt-2">
              Book Bike Transport <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

          <Link href="/services/car-shifting" className="glass-card p-6 rounded-2xl group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
              Car Carrier
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Enclosed and open car container shipping across South India with vehicle inspection tracking.
            </p>
            <div className="text-xs font-semibold text-purple-400 flex items-center gap-1 pt-2">
              Book Car Carrier <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-white">How NammaVandi Works</h2>
            <p className="text-slate-400 text-sm mt-2">
              Simple 4-step process from booking request to final delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white font-black text-lg flex items-center justify-center mx-auto shadow-glow">
                1
              </div>
              <h4 className="text-base font-bold text-white">Select Move & Route</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose pickup & drop locations, date, vehicle type, and property details.
              </p>
            </div>

            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-orange-400 border border-slate-700 font-black text-lg flex items-center justify-center mx-auto">
                2
              </div>
              <h4 className="text-base font-bold text-white">Instant Verification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verify phone number with one-click OTP to generate your unique booking ID.
              </p>
            </div>

            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-orange-400 border border-slate-700 font-black text-lg flex items-center justify-center mx-auto">
                3
              </div>
              <h4 className="text-base font-bold text-white">Vehicle Assignment</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                NammaVandi operational team assigns vehicle & driver details with SMS/WhatsApp updates.
              </p>
            </div>

            <div className="space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-emerald-400 border border-slate-700 font-black text-lg flex items-center justify-center mx-auto">
                4
              </div>
              <h4 className="text-base font-bold text-white">Hassle-free Delivery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Professional packing team arrives on schedule, transports & completes unloading safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VEHICLE FLEET OPTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-white">NammaVandi Vehicle Fleet</h2>
            <p className="text-slate-400 text-sm mt-1">
              Choose the exact truck suited for your load size.
            </p>
          </div>
          <Link href="/booking" className="text-xs font-semibold text-orange-400 hover:underline">
            View Pricing Calculator →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">Popular for 2 BHK</span>
            <h3 className="text-lg font-bold text-white mt-3">Eicher Tempo</h3>
            <p className="text-xs text-slate-400 mt-1">Capacity: Up to 3,500 kg</p>
            <p className="text-xs text-slate-500 mt-2">Ideal for 2BHK - 3BHK home relocation and medium commercial goods.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Quick City Moves</span>
            <h3 className="text-lg font-bold text-white mt-3">Mini Truck (Tata Ace)</h3>
            <p className="text-xs text-slate-400 mt-1">Capacity: Up to 850 kg</p>
            <p className="text-xs text-slate-500 mt-2">Perfect for 1BHK, single room luggage, small furniture & appliances.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Medium Loads</span>
            <h3 className="text-lg font-bold text-white mt-3">Pickup Truck</h3>
            <p className="text-xs text-slate-400 mt-1">Capacity: Up to 1,500 kg</p>
            <p className="text-xs text-slate-500 mt-2">Great for 1BHK-2BHK goods, bike shifting + household boxes.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">Heavy Commercial</span>
            <h3 className="text-lg font-bold text-white mt-3">Large Container Truck</h3>
            <p className="text-xs text-slate-400 mt-1">Capacity: Up to 5,000+ kg</p>
            <p className="text-xs text-slate-500 mt-2">Suited for 4BHK+, villa shifting, and full commercial office moves.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS PLACEHOLDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white">Customer Experiences</h2>
          <p className="text-slate-400 text-sm mt-1">Read how NammaVandi helps families and businesses relocate smoothly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Shifted our 2 BHK apartment from T. Nagar Chennai to RS Puram Coimbatore. The vehicle arrived right on time at 10 AM, and the driver Rajesh was very professional."
            </p>
            <div className="pt-2 border-t border-slate-800">
              <h5 className="text-xs font-bold text-white">Arun Vijay</h5>
              <span className="text-[10px] text-slate-500">Chennai ➔ Coimbatore</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "We booked office shifting for our startup in Indiranagar Bengaluru. They completed the movement without damaging a single monitor or server."
            </p>
            <div className="pt-2 border-t border-slate-800">
              <h5 className="text-xs font-bold text-white">Priya Sharma</h5>
              <span className="text-[10px] text-slate-500">Bengaluru City Shift</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Got my Royal Enfield bike transported from Madurai to Trichy. Received live WhatsApp notifications with driver details. Super smooth experience!"
            </p>
            <div className="pt-2 border-t border-slate-800">
              <h5 className="text-xs font-bold text-white">Deepak Raj</h5>
              <span className="text-[10px] text-slate-500">Madurai ➔ Trichy</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-orange-400" />
              Do I need to make an online payment while booking?
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              No. Online payment is not required during initial booking. Once you submit your booking details and verify your phone number, our NammaVandi team confirms the move and handles payment terms separately.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-orange-400" />
              How will I receive driver and vehicle details?
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Once an admin/dispatcher assigns your vehicle, you will receive an instant notification on WhatsApp and SMS containing driver name, contact number, and vehicle registration details.
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-orange-400" />
              What cities are currently covered by NammaVandi?
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              We operate across all major South Indian hubs including Chennai, Coimbatore, Bengaluru, Madurai, Trichy, Salem, Pondicherry, Hyderabad, and Kochi.
            </p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-orange-500/30 text-center space-y-6 relative overflow-hidden shadow-glow">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Move Your Home or Business?
            </h2>
            <p className="text-slate-300 text-sm">
              Get an instant price estimate and book your vehicle in less than 2 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/booking"
              className="px-8 py-4 rounded-xl brand-gradient-bg text-white font-bold text-base shadow-glow hover:scale-[1.02] transition-transform"
            >
              Start Booking Now
            </Link>
            <Link
              href="/contact"
              className="px-6 py-4 rounded-xl glass-card text-slate-200 font-semibold text-base border border-slate-700 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-orange-400" /> Contact Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
