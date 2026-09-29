'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Booking, NotificationRecord, Address } from '@namma-move/types';
import { createClient } from '@/lib/supabase/client';
import {
  User,
  Truck,
  Calendar,
  Clock,
  MapPin,
  Bell,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus,
  Phone,
  Mail,
  ChevronRight,
  Navigation,
} from 'lucide-react';

const MOCK_CUSTOMER_BOOKINGS: Booking[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    booking_number: 'NM-20261012-0001',
    customer_name: 'Gokul Seenuvasan',
    customer_email: 'gokulseenuvasan31@gmail.com',
    customer_phone: '+919876543210',
    pickup_address_snapshot: {
      address_line: '12, Anna Salai, T. Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600017',
      floor: '2',
    },
    drop_address_snapshot: {
      address_line: '45, RS Puram Main Rd',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641002',
      floor: '1',
    },
    pickup_date: '2026-10-12',
    pickup_time: '10:00 AM',
    pickup_floor: '2',
    drop_floor: '1',
    pickup_city: 'Chennai',
    drop_city: 'Coimbatore',
    vehicle_type: 'Eicher Tempo',
    property_type: '2 BHK',
    packing_type: ['Plastic Wrapper', 'Paper Box'],
    items_type: ['Household Items', 'Electronics', 'Furniture'],
    distance_km: 500,
    estimated_price: 24500,
    final_price: 24000,
    status: 'assigned',
    otp_verified: true,
    assigned_vehicle_id: '11111111-1111-1111-1111-111111111111',
    driver_name: 'Rajesh Kumar',
    driver_phone: '+919876512345',
    vehicle_number: 'TN 01 AB 1234',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    booking_number: 'NM-20261015-0002',
    customer_name: 'Gokul Seenuvasan',
    customer_email: 'gokulseenuvasan31@gmail.com',
    customer_phone: '+919876543210',
    pickup_address_snapshot: {
      address_line: '88, Indiranagar 100ft Rd',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      floor: '0',
    },
    drop_address_snapshot: {
      address_line: '104, Koramangala 4th Block',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
      floor: '3',
    },
    pickup_date: '2026-10-15',
    pickup_time: '08:30 AM',
    pickup_floor: '0',
    drop_floor: '3',
    pickup_city: 'Bengaluru',
    drop_city: 'Bengaluru',
    vehicle_type: 'Mini Truck',
    property_type: '1 BHK',
    packing_type: ['Full Packing'],
    items_type: ['Household Items', 'Appliances'],
    distance_km: 12.5,
    estimated_price: 3200,
    status: 'confirmed',
    otp_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const MOCK_NOTIFICATIONS: NotificationRecord[] = [
  {
    id: 'n1',
    booking_id: 'NM-20261012-0001',
    channel: 'whatsapp',
    recipient: '+919876543210',
    title: 'Vehicle Assigned',
    message: 'Your NammaMove vehicle has been assigned. Driver: Rajesh Kumar (TN 01 AB 1234), Contact: +91 98765 12345.',
    status: 'sent',
    sent_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
];

export default function CustomerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'profile' | 'notifications'>('upcoming');
  const [bookings, setBookings] = useState<Booking[]>(MOCK_CUSTOMER_BOOKINGS);
  const [notifications, setNotifications] = useState<NotificationRecord[]>(MOCK_NOTIFICATIONS);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function fetchUserBookings() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
        if (data && data.length > 0) {
          setBookings(data);
        }
      } catch (e) {
        // Fallback to initial seed mock
      }
    }
    fetchUserBookings();
  }, []);

  const upcomingBookings = bookings.filter((b) => b.status !== 'completed' && b.status !== 'cancelled');
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Confirmed</span>;
      case 'assigned':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Vehicle Assigned</span>;
      case 'in_transit':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">In Transit</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Completed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400 border border-slate-700">Pending</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Profile Summary Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl brand-gradient-bg text-white flex items-center justify-center font-bold text-xl shadow-glow">
            GS
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Gokul Seenuvasan</h1>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-orange-400" /> +91 98765 43210</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-blue-400" /> gokulseenuvasan31@gmail.com</span>
            </div>
          </div>
        </div>

        <Link
          href="/booking"
          className="px-5 py-3 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-glow hover:scale-[1.02] transition-transform flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Book New Move
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('upcoming'); setSelectedBooking(null); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'upcoming'
              ? 'brand-gradient-bg text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Truck className="w-4 h-4" /> Upcoming Moves ({upcomingBookings.length})
        </button>

        <button
          onClick={() => { setActiveTab('past'); setSelectedBooking(null); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'past'
              ? 'brand-gradient-bg text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Calendar className="w-4 h-4" /> Past Moves ({pastBookings.length})
        </button>

        <button
          onClick={() => { setActiveTab('notifications'); setSelectedBooking(null); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'brand-gradient-bg text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Bell className="w-4 h-4 text-orange-400" /> Notifications ({notifications.length})
        </button>

        <button
          onClick={() => { setActiveTab('profile'); setSelectedBooking(null); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'brand-gradient-bg text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <User className="w-4 h-4" /> Profile & Addresses
        </button>
      </div>

      {/* TAB 1: UPCOMING MOVES */}
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          {upcomingBookings.length === 0 ? (
            <div className="glass-card p-12 text-center rounded-3xl border border-slate-800 space-y-3">
              <Truck className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Upcoming Moves</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You don't have any active relocation bookings right now.
              </p>
              <Link href="/booking" className="inline-block mt-2 px-6 py-2.5 rounded-xl brand-gradient-bg text-white text-xs font-bold">
                Book a Move Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Booking List */}
              <div className="lg:col-span-6 space-y-4">
                {upcomingBookings.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className={`glass-card p-6 rounded-2xl border cursor-pointer transition-all space-y-4 ${
                      selectedBooking?.id === b.id
                        ? 'border-orange-500 shadow-glow ring-2 ring-orange-500/20'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-black text-white">{b.booking_number}</span>
                      {getStatusBadge(b.status)}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-white font-bold">
                      <span>{b.pickup_city}</span>
                      <Navigation className="w-4 h-4 text-orange-400 rotate-90" />
                      <span>{b.drop_city}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-500 block">Date</span>
                        <strong className="text-slate-200">{b.pickup_date} ({b.pickup_time})</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Vehicle</span>
                        <strong className="text-slate-200">{b.vehicle_type}</strong>
                      </div>
                    </div>

                    {b.driver_name && (
                      <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs text-amber-300 flex items-center justify-between">
                        <div>
                          <strong className="block text-white">Driver Assigned: {b.driver_name}</strong>
                          <span>Vehicle: {b.vehicle_number}</span>
                        </div>
                        <a href={`tel:${b.driver_phone}`} className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-[11px]">
                          Call Driver
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Selected Booking Detail Panel */}
              <div className="lg:col-span-6">
                {selectedBooking ? (
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <span className="text-xs text-slate-400 block">Booking Details</span>
                        <h3 className="text-xl font-black font-mono text-white">{selectedBooking.booking_number}</h3>
                      </div>
                      {getStatusBadge(selectedBooking.status)}
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="bg-slate-900 p-4 rounded-xl space-y-1">
                        <span className="text-orange-400 font-bold uppercase block">Pickup Address</span>
                        <p className="text-white font-semibold">{selectedBooking.pickup_address_snapshot.address_line}</p>
                        <p className="text-slate-400">{selectedBooking.pickup_address_snapshot.city}, {selectedBooking.pickup_address_snapshot.state} (Floor: {selectedBooking.pickup_floor})</p>
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl space-y-1">
                        <span className="text-blue-400 font-bold uppercase block">Drop Address</span>
                        <p className="text-white font-semibold">{selectedBooking.drop_address_snapshot.address_line}</p>
                        <p className="text-slate-400">{selectedBooking.drop_address_snapshot.city}, {selectedBooking.drop_address_snapshot.state} (Floor: {selectedBooking.drop_floor})</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-500 block">Property Type</span>
                        <strong className="text-white">{selectedBooking.property_type}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Packing</span>
                        <strong className="text-white">{selectedBooking.packing_type.join(', ')}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Estimated Price</span>
                        <strong className="text-orange-400 text-sm">₹{selectedBooking.estimated_price?.toLocaleString()}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">OTP Verified</span>
                        <strong className="text-emerald-400">Yes</strong>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="glass-card p-10 text-center rounded-3xl border border-slate-800 text-slate-500 text-xs">
                    Select a booking card on the left to view complete details & driver timeline.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PAST MOVES */}
      {activeTab === 'past' && (
        <div className="glass-card p-10 text-center rounded-3xl border border-slate-800 text-slate-400 text-sm">
          No past completed moves yet. Your completed relocations will appear here.
        </div>
      )}

      {/* TAB 3: NOTIFICATIONS CENTER */}
      {activeTab === 'notifications' && (
        <div className="space-y-4 max-w-3xl">
          {notifications.map((n) => (
            <div key={n.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{n.title || 'NammaMove Update'}</h4>
                  <span className="text-[10px] text-slate-500">{new Date(n.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase">Channel: {n.channel}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: PROFILE & ADDRESSES */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Personal Information</h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block">Full Name</span>
                <strong className="text-white text-sm">Gokul Seenuvasan</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Phone Number</span>
                <strong className="text-white text-sm">+91 98765 43210</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Email Address</span>
                <strong className="text-white text-sm">gokulseenuvasan31@gmail.com</strong>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Saved Addresses</h3>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-orange-400 font-bold uppercase">Home Address</span>
              <p className="text-white font-semibold">12, Anna Salai, T. Nagar</p>
              <p className="text-slate-400">Chennai, Tamil Nadu - 600017</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
