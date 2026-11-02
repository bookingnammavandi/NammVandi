'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Booking, NotificationRecord } from '@namma-move/types';
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
  Navigation,
  Loader2,
} from 'lucide-react';

export default function CustomerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'profile' | 'notifications'>('upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function fetchUserBookings() {
      setIsLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
        if (data) {
          setBookings(data);
          if (data.length > 0) setSelectedBooking(data[0]);
        }
      } catch (e) {
        console.error('Error fetching bookings from Supabase:', e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserBookings();
  }, []);

  const upcomingBookings = bookings.filter((b) => b.status !== 'completed' && b.status !== 'cancelled');
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Confirmed</span>;
      case 'assigned':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Vehicle Assigned</span>;
      case 'in_transit':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">In Transit</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Completed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Pending</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Profile Summary Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl brand-gradient-bg text-white flex items-center justify-center font-bold text-xl shadow-md">
            NV
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Namma Vandi Account</h1>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-orange-500" /> +91 98765 43210</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-blue-500" /> bookingnammavandi@gmail.com</span>
            </div>
          </div>
        </div>

        <Link
          href="/booking"
          className="px-5 py-3 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-md hover:shadow-orange-500/25 hover:scale-[1.02] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Book New Move
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('upcoming'); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'upcoming'
              ? 'brand-gradient-bg text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-4 h-4" /> Active Moves ({upcomingBookings.length})
        </button>

        <button
          onClick={() => { setActiveTab('past'); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'past'
              ? 'brand-gradient-bg text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" /> Completed Moves ({pastBookings.length})
        </button>

        <button
          onClick={() => { setActiveTab('notifications'); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'brand-gradient-bg text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4 text-orange-500" /> Notifications ({notifications.length})
        </button>

        <button
          onClick={() => { setActiveTab('profile'); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'brand-gradient-bg text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" /> Profile & Addresses
        </button>
      </div>

      {/* TAB 1: UPCOMING MOVES */}
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-orange-500" /> Loading your moves from Supabase...
            </div>
          ) : upcomingBookings.length === 0 ? (
            <div className="glass-card p-12 text-center rounded-3xl border border-slate-200 bg-white space-y-3 shadow-sm">
              <Truck className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No Active Moves</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You don't have any active relocation bookings in the database right now.
              </p>
              <Link href="/booking" className="inline-block mt-2 px-6 py-2.5 rounded-xl brand-gradient-bg text-white text-xs font-bold shadow-md">
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
                    className={`glass-card p-6 rounded-2xl border cursor-pointer transition-all space-y-4 bg-white ${
                      selectedBooking?.id === b.id
                        ? 'border-orange-500 shadow-md ring-2 ring-orange-500/20'
                        : 'border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-black text-slate-900">{b.booking_number}</span>
                      {getStatusBadge(b.status)}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-900 font-bold">
                      <span>{b.pickup_city}</span>
                      <Navigation className="w-4 h-4 text-orange-500 rotate-90" />
                      <span>{b.drop_city}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block">Date</span>
                        <strong className="text-slate-800">{b.pickup_date} ({b.pickup_time})</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Vehicle</span>
                        <strong className="text-slate-800">{b.vehicle_type}</strong>
                      </div>
                    </div>

                    {b.driver_name && (
                      <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800 flex items-center justify-between">
                        <div>
                          <strong className="block text-slate-900">Driver Assigned: {b.driver_name}</strong>
                          <span className="text-slate-600">Vehicle: {b.vehicle_number || 'Assigned'}</span>
                        </div>
                        {b.driver_phone && (
                          <a href={`tel:${b.driver_phone}`} className="px-3 py-1 bg-amber-500 text-white font-bold rounded-lg text-[11px] shadow-sm">
                            Call Driver
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Selected Booking Detail Panel */}
              <div className="lg:col-span-6">
                {selectedBooking ? (
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white space-y-6 shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-xs text-slate-500 block">Booking Details</span>
                        <h3 className="text-xl font-black font-mono text-slate-900">{selectedBooking.booking_number}</h3>
                      </div>
                      {getStatusBadge(selectedBooking.status)}
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-orange-600 font-bold uppercase block">Pickup Address</span>
                        <p className="text-slate-900 font-semibold">{selectedBooking.pickup_address_snapshot?.address_line || 'Address specified'}</p>
                        <p className="text-slate-600">{selectedBooking.pickup_city}, {selectedBooking.pickup_address_snapshot?.state || 'TN'} (Floor: {selectedBooking.pickup_floor})</p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                        <span className="text-blue-600 font-bold uppercase block">Drop Address</span>
                        <p className="text-slate-900 font-semibold">{selectedBooking.drop_address_snapshot?.address_line || 'Address specified'}</p>
                        <p className="text-slate-600">{selectedBooking.drop_city}, {selectedBooking.drop_address_snapshot?.state || 'TN'} (Floor: {selectedBooking.drop_floor})</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-500 block">Property Type</span>
                        <strong className="text-slate-900">{selectedBooking.property_type}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Packing</span>
                        <strong className="text-slate-900">{Array.isArray(selectedBooking.packing_type) ? selectedBooking.packing_type.join(', ') : selectedBooking.packing_type || 'Standard'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Estimated Price</span>
                        <strong className="text-orange-600 font-bold text-sm">₹{selectedBooking.estimated_price?.toLocaleString() || 'N/A'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">OTP Verified</span>
                        <strong className="text-emerald-600">{selectedBooking.otp_verified ? 'Yes' : 'Pending'}</strong>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="glass-card p-10 text-center rounded-3xl border border-slate-200 bg-white text-slate-400 text-xs shadow-sm">
                    Select a booking card on the left to view complete details.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PAST MOVES */}
      {activeTab === 'past' && (
        <div className="glass-card p-10 text-center rounded-3xl border border-slate-200 bg-white text-slate-600 text-sm shadow-sm">
          {pastBookings.length === 0 ? 'No completed moves yet.' : `Found ${pastBookings.length} completed move(s).`}
        </div>
      )}

      {/* TAB 3: NOTIFICATIONS CENTER */}
      {activeTab === 'notifications' && (
        <div className="space-y-4 max-w-3xl">
          {notifications.length === 0 ? (
            <div className="glass-card p-8 text-center rounded-2xl text-xs text-slate-400 border border-slate-200 bg-white shadow-sm">
              No new notifications.
            </div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="glass-card p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{n.title || 'NammaVandi Update'}</h4>
                    <span className="text-[10px] text-slate-400">{new Date(n.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: PROFILE & ADDRESSES */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Personal Information</h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block">Account Name</span>
                <strong className="text-slate-900 text-sm">Gokul Seenuvasan</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Phone Number</span>
                <strong className="text-slate-900 text-sm">+91 98765 43210</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Email Address</span>
                <strong className="text-slate-900 text-sm">bookingnammavandi@gmail.com</strong>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Primary Service Hubs</h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="text-orange-600 font-bold uppercase">Active Regions</span>
              <p className="text-slate-800 font-semibold">Chennai, Bengaluru, Coimbatore, Madurai, Trichy, Salem</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
