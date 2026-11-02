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
  Home,
  Bike,
  Car,
  ChevronRight,
  Star,
  HelpCircle,
  PhoneCall,
  Sparkles,
  Building2,
  MapPin,
} from 'lucide-react';
import { clearVerifiedCustomer, CustomerVerifyModal } from '@/components/CustomerVerifyModal';

/* -------------------------------------------------------------------------- */
/*  Quick Booking data                                                         */
/* -------------------------------------------------------------------------- */

const STATE_CITIES: Record<string, string[]> = {
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem'],
  Puducherry: ['Pondicherry'],
  Karnataka: ['Bengaluru'],
  Telangana: ['Hyderabad'],
  Kerala: ['Kochi'],
};
const ALL_CITIES = Object.values(STATE_CITIES).flat();
const getState = (city: string) =>
  Object.entries(STATE_CITIES).find(([, cities]) => cities.includes(city))?.[0] ?? '';

type MoveScope = 'inner' | 'outer';

const toLocalDate = (d: Date) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];

const fieldClass =
  'w-full bg-white/90 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/25 rounded-xl px-3.5 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400';
const labelClass = 'text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5';

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={fieldClass}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ChipGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; title: string; hint?: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-800 mb-2.5">{label}</p>
      <div className="grid grid-cols-2 gap-2.5" role="group" aria-label={label}>
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`text-left rounded-xl border px-3.5 py-3 transition-all duration-200 ${
                active
                  ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm ring-1 ring-orange-500/20'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="block text-sm font-semibold leading-tight">{o.title}</span>
              {o.hint && (
                <span className="block text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {o.hint}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const today = toLocalDate(new Date());

  const [scope, setScope] = useState<MoveScope>('outer');
  const [pickupCity, setPickupCity] = useState('Chennai');
  const [dropCity, setDropCity] = useState('Coimbatore');
  const [pickupDate, setPickupDate] = useState(
    toLocalDate(new Date(Date.now() + 86400000))
  );
  const [showVerify, setShowVerify] = useState(false);

  const finalDropCity = scope === 'inner' ? pickupCity : dropCity;

  const handlePickupCity = (city: string) => {
    setPickupCity(city);
    if (city === dropCity) {
      setDropCity(ALL_CITIES.find((c) => c !== city) ?? city);
    }
  };

  const moveType =
    scope === 'inner'
      ? 'within-city'
      : getState(pickupCity) !== getState(finalDropCity)
      ? 'interstate'
      : 'intercity';

  const goToBooking = () => {
    const params = new URLSearchParams({
      pickupState: getState(pickupCity),
      pickupCity,
      dropState: getState(finalDropCity),
      dropCity: finalDropCity,
      date: pickupDate,
      moveType,
    });
    router.push(`/booking?${params.toString()}`);
  };

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    clearVerifiedCustomer();
    setShowVerify(true);
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      <CustomerVerifyModal
        open={showVerify}
        onClose={() => setShowVerify(false)}
        onVerified={goToBooking}
      />

      {/* ───────────────────── HERO ───────────────────── */}
      <section className="relative pt-10 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 overflow-hidden">
        {/* Soft ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,620px)] h-[320px] bg-orange-500/15 blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[380px] h-[280px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Hero copy */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-xs font-semibold text-orange-500">
                <Sparkles className="w-3.5 h-3.5" />
                <span>South India’s Most Trusted Relocation Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight leading-[1.12]">
                Move Anything.
                <br />
                <span className="brand-gradient-text">Move Anywhere.</span>
                <br />
                Move with NammaVandi.
              </h1>

              <p className="text-base sm:text-[17px] text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Reliable relocation for homes, offices, bikes & cars. Verified drivers, transparent pricing, and zero hidden charges.
              </p>

              {/* Trust row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2.5 text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Verified Drivers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>On-Time Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span>Safe Handling</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-[15px] shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <Truck className="w-5 h-5" />
                  Book a Move Now
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-xl bg-white/60 border border-slate-200 text-slate-600 font-semibold text-[15px] hover:bg-white hover:border-slate-300 transition-colors"
                >
                  Explore Services
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick Booking card */}
            <div className="lg:col-span-5">
              <div className="bg-white/80 backdrop-blur-md p-5 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Quick Booking</h3>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                    Instant Quote
                  </span>
                </div>

                <form onSubmit={handleQuickBook} className="space-y-4">
                  <ChipGroup<MoveScope>
                    label="Where are you moving?"
                    value={scope}
                    onChange={setScope}
                    options={[
                      { value: 'inner', title: 'Inner city', hint: 'Within the same city' },
                      { value: 'outer', title: 'Outer city', hint: 'To another city' },
                    ]}
                  />

                  {scope === 'inner' ? (
                    <SelectField
                      id="pickupCity"
                      label="City"
                      value={pickupCity}
                      options={ALL_CITIES}
                      onChange={handlePickupCity}
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <SelectField
                        id="pickupCity"
                        label="From city"
                        value={pickupCity}
                        options={ALL_CITIES}
                        onChange={handlePickupCity}
                      />
                      <SelectField
                        id="dropCity"
                        label="To city"
                        value={dropCity}
                        options={ALL_CITIES.filter((c) => c !== pickupCity)}
                        onChange={setDropCity}
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="pickupDate" className={labelClass}>
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      Pickup date
                    </label>
                    <input
                      id="pickupDate"
                      type="date"
                      min={today}
                      value={pickupDate}
                      required
                      onChange={(e) => setPickupDate(e.target.value)}
                      className={fieldClass}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-1"
                  >
                    Continue Booking
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── SERVICES ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Tailored Moving Services
          </h2>
          <p className="text-slate-500 text-base">
            From single-room apartments to multi-floor offices and vehicle shipping — seamless transport across South India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              href: '/services/house-shifting',
              icon: Home,
              color: 'orange',
              title: 'House Shifting',
              desc: 'Complete packing, loading, transport & unloading for 1BHK to 5+ BHK homes.',
              cta: 'Book House Move',
            },
            {
              href: '/services/office-shifting',
              icon: Building2,
              color: 'blue',
              title: 'Office Relocation',
              desc: 'IT equipment, desks, archives & server racks with minimal downtime.',
              cta: 'Book Office Move',
            },
            {
              href: '/services/bike-shifting',
              icon: Bike,
              color: 'emerald',
              title: 'Bike Transport',
              desc: 'Door-to-door two-wheeler relocation with multi-layer protection.',
              cta: 'Book Bike Transport',
            },
            {
              href: '/services/car-shifting',
              icon: Car,
              color: 'purple',
              title: 'Car Carrier',
              desc: 'Enclosed & open car shipping with inspection tracking across South India.',
              cta: 'Book Car Carrier',
            },
          ].map((item) => {
            const Icon = item.icon;
            const colorMap: Record<string, string> = {
              orange: 'bg-orange-500/10 border-orange-500/20 text-orange-500 group-hover:text-orange-600',
              blue: 'bg-blue-500/10 border-blue-500/20 text-blue-500 group-hover:text-blue-600',
              emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:text-emerald-600',
              purple: 'bg-purple-500/10 border-purple-500/20 text-purple-500 group-hover:text-purple-600',
            };
            const ctaColor: Record<string, string> = {
              orange: 'text-orange-500',
              blue: 'text-blue-500',
              emerald: 'text-emerald-500',
              purple: 'text-purple-500',
            };
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white border border-slate-200/80 rounded-2xl p-6 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 flex flex-col"
              >
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${colorMap[item.color]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{item.desc}</p>
                <div
                  className={`mt-4 text-xs font-semibold flex items-center gap-1 ${ctaColor[item.color]}`}
                >
                  {item.cta}
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ───────────────────── HOW IT WORKS ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50/80 border border-slate-200/60 rounded-3xl p-8 sm:p-12 lg:p-14">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight">How NammaVandi Works</h2>
            <p className="text-slate-500 text-sm mt-2">
              Simple 4-step process from booking to safe delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-orange-200 via-slate-200 to-emerald-200" />

            {[
              {
                step: 1,
                title: 'Select Move & Route',
                desc: 'Choose pickup & drop, date, vehicle type and property details.',
                active: true,
              },
              {
                step: 2,
                title: 'Instant Verification',
                desc: 'Verify phone with one-click OTP and get your unique booking ID.',
              },
              {
                step: 3,
                title: 'Vehicle Assignment',
                desc: 'We assign vehicle & driver details with SMS / WhatsApp updates.',
              },
              {
                step: 4,
                title: 'Hassle-free Delivery',
                desc: 'Professional team arrives on schedule and completes the move safely.',
                done: true,
              },
            ].map((s) => (
              <div key={s.step} className="relative text-center space-y-3">
                <div
                  className={`w-12 h-12 rounded-2xl font-black text-lg flex items-center justify-center mx-auto relative z-10 ${
                    s.active
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                      : s.done
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white border border-slate-200 text-orange-500'
                  }`}
                >
                  {s.step}
                </div>
                <h4 className="text-[15px] font-bold text-slate-800">{s.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── FLEET ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Vehicle Fleet</h2>
            <p className="text-slate-500 text-sm mt-1">
              Choose the right truck for your load size.
            </p>
          </div>
          <Link
            href="/booking"
            className="text-sm font-semibold text-orange-500 hover:text-orange-600 inline-flex items-center gap-1"
          >
            View Pricing Calculator
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              tag: 'Popular for 2 BHK',
              tagColor: 'orange',
              title: 'Eicher Tempo',
              capacity: 'Up to 3,500 kg',
              desc: 'Ideal for 2BHK–3BHK home relocation and medium commercial goods.',
            },
            {
              tag: 'Quick City Moves',
              tagColor: 'blue',
              title: 'Mini Truck (Tata Ace)',
              capacity: 'Up to 850 kg',
              desc: 'Perfect for 1BHK, single room luggage, small furniture & appliances.',
            },
            {
              tag: 'Medium Loads',
              tagColor: 'emerald',
              title: 'Pickup Truck',
              capacity: 'Up to 1,500 kg',
              desc: 'Great for 1BHK–2BHK goods, bike shifting + household boxes.',
            },
            {
              tag: 'Heavy Commercial',
              tagColor: 'purple',
              title: 'Large Container Truck',
              capacity: 'Up to 5,000+ kg',
              desc: 'Suited for 4BHK+, villas, and full commercial office moves.',
            },
          ].map((v) => {
            const tagStyles: Record<string, string> = {
              orange: 'text-orange-600 bg-orange-50',
              blue: 'text-blue-600 bg-blue-50',
              emerald: 'text-emerald-600 bg-emerald-50',
              purple: 'text-purple-600 bg-purple-50',
            };
            return (
              <div
                key={v.title}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <span
                  className={`text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 rounded ${tagStyles[v.tagColor]}`}
                >
                  {v.tag}
                </span>
                <h3 className="text-lg font-bold mt-3 text-slate-800">{v.title}</h3>
                <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {v.capacity}
                </p>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────────────────── TESTIMONIALS ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight">Customer Experiences</h2>
          <p className="text-slate-500 text-sm mt-1.5">
            Real stories from families and businesses who moved with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              quote:
                'Shifted our 2 BHK from T. Nagar Chennai to RS Puram Coimbatore. The vehicle arrived right on time and the driver was very professional.',
              name: 'Arun Vijay',
              route: 'Chennai → Coimbatore',
            },
            {
              quote:
                'We booked office shifting for our startup in Indiranagar. They completed the move without damaging a single monitor or server.',
              name: 'Priya Sharma',
              route: 'Bengaluru City Shift',
            },
            {
              quote:
                'Got my Royal Enfield transported from Madurai to Trichy. Live WhatsApp updates with driver details. Super smooth experience!',
              name: 'Deepak Raj',
              route: 'Madurai → Trichy',
            },
          ].map((t) => (
            <div
              key={t.name}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed flex-1 italic">
                “{t.quote}”
              </p>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <h5 className="text-sm font-bold text-slate-800">{t.name}</h5>
                <span className="text-xs text-slate-500">{t.route}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────── FAQ ───────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Do I need to make an online payment while booking?',
              a: 'No. Online payment is not required during initial booking. Once you submit details and verify your phone, our team confirms the move and handles payment terms separately.',
            },
            {
              q: 'How will I receive driver and vehicle details?',
              a: 'Once a vehicle is assigned, you receive an instant WhatsApp + SMS notification with driver name, contact number, and vehicle registration details.',
            },
            {
              q: 'What cities are currently covered?',
              a: 'We operate across major South Indian hubs including Chennai, Coimbatore, Bengaluru, Madurai, Trichy, Salem, Pondicherry, Hyderabad, and Kochi.',
            },
          ].map((item) => (
            <div
              key={item.q}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-slate-300 transition-colors"
            >
              <h4 className="text-sm font-bold text-slate-800 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                {item.q}
              </h4>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed pl-6">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────── CTA ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-orange-200/60 bg-gradient-to-br from-orange-50 via-white to-orange-50/40 p-10 sm:p-14 text-center shadow-sm">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-400/10 blur-3xl rounded-full pointer-events-none" />
          <div className="relative max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Ready to Move Your Home or Business?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Get an instant price estimate and book your vehicle in under 2 minutes.
            </p>
          </div>

          <div className="relative flex flex-wrap items-center justify-center gap-3 pt-6">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl brand-gradient-bg font-bold text-white shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Start Booking Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-semibold hover:border-slate-300 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-orange-500" />
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}