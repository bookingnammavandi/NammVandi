'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/AdminLayout';
import { Booking, BookingStatus } from '@namma-move/types';
import { triggerWhatsAppNotification } from '@/lib/notification-service';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Phone,
  User,
  MapPin,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

const MOCK_ADMIN_BOOKINGS: Booking[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    booking_number: 'NM-20261012-0001',
    customer_name: 'Arun Vijay',
    customer_email: 'arun.v@example.com',
    customer_phone: '+919812345678',
    pickup_address_snapshot: { address_line: '12, Anna Salai, T. Nagar', city: 'Chennai', state: 'Tamil Nadu', pincode: '600017', floor: '2' },
    drop_address_snapshot: { address_line: '45, RS Puram Main Rd', city: 'Coimbatore', state: 'Tamil Nadu', pincode: '641002', floor: '1' },
    pickup_date: '2026-10-12',
    pickup_time: '10:00 AM',
    pickup_floor: '2',
    drop_floor: '1',
    pickup_city: 'Chennai',
    drop_city: 'Coimbatore',
    vehicle_type: 'Eicher Tempo',
    property_type: '2 BHK',
    packing_type: ['Plastic Wrapper', 'Paper Box'],
    items_type: ['Household Items', 'Electronics'],
    distance_km: 500,
    estimated_price: 24500,
    final_price: 24000,
    status: 'assigned',
    otp_verified: true,
    driver_name: 'Rajesh Kumar',
    driver_phone: '+919876512345',
    vehicle_number: 'TN 01 AB 1234',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    booking_number: 'NM-20261015-0002',
    customer_name: 'Priya Sharma',
    customer_email: 'priya.s@example.com',
    customer_phone: '+919823456789',
    pickup_address_snapshot: { address_line: '88, Indiranagar 100ft Rd', city: 'Bengaluru', state: 'Karnataka', pincode: '560038', floor: '0' },
    drop_address_snapshot: { address_line: '104, Koramangala 4th Block', city: 'Bengaluru', state: 'Karnataka', pincode: '560034', floor: '3' },
    pickup_date: '2026-10-15',
    pickup_time: '08:30 AM',
    pickup_floor: '0',
    drop_floor: '3',
    pickup_city: 'Bengaluru',
    drop_city: 'Bengaluru',
    vehicle_type: 'Mini Truck',
    property_type: '1 BHK',
    packing_type: ['Full Packing'],
    items_type: ['Household Items'],
    distance_km: 12.5,
    estimated_price: 3200,
    status: 'confirmed',
    otp_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    booking_number: 'NM-20261020-0003',
    customer_name: 'Deepak Raj',
    customer_email: 'deepak.r@example.com',
    customer_phone: '+919834567890',
    pickup_address_snapshot: { address_line: '15, KK Nagar 7th St', city: 'Madurai', state: 'Tamil Nadu', pincode: '625020', floor: '1' },
    drop_address_snapshot: { address_line: '72, Cantonment Rd', city: 'Trichy', state: 'Tamil Nadu', pincode: '620001', floor: '2' },
    pickup_date: '2026-10-20',
    pickup_time: '02:00 PM',
    pickup_floor: '1',
    drop_floor: '2',
    pickup_city: 'Madurai',
    drop_city: 'Trichy',
    vehicle_type: 'Pickup Truck',
    property_type: '3 BHK',
    packing_type: ['Wooden Box'],
    items_type: ['Household Items', 'Bike'],
    distance_km: 135,
    estimated_price: 9800,
    status: 'pending',
    otp_verified: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_ADMIN_BOOKINGS);
  const [selectedBookingForAssign, setSelectedBookingForAssign] = useState<Booking | null>(null);
  const [assignDriverName, setAssignDriverName] = useState('Rajesh Kumar');
  const [assignDriverPhone, setAssignDriverPhone] = useState('+919876512345');
  const [assignVehicleNumber, setAssignVehicleNumber] = useState('TN 01 AB 1234');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    assigned: bookings.filter((b) => b.status === 'assigned').length,
    inTransit: bookings.filter((b) => b.status === 'in_transit').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  };

  const handleConfirmVehicleAssign = async () => {
    if (!selectedBookingForAssign) return;

    const updatedBookings = bookings.map((b) => {
      if (b.id === selectedBookingForAssign.id) {
        return {
          ...b,
          status: 'assigned' as BookingStatus,
          driver_name: assignDriverName,
          driver_phone: assignDriverPhone,
          vehicle_number: assignVehicleNumber,
        };
      }
      return b;
    });

    setBookings(updatedBookings);

    // Trigger WhatsApp notification service
    const notifRes = await triggerWhatsAppNotification({
      booking: selectedBookingForAssign,
      driverName: assignDriverName,
      driverPhone: assignDriverPhone,
      vehicleNumber: assignVehicleNumber,
    });

    setNotificationMsg(notifRes.message);
    setSelectedBookingForAssign(null);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Operations Dashboard</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time overview of customer moves, assignments, and dispatch status.</p>
          </div>
          <Link
            href="/admin/create-booking"
            className="px-5 py-3 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-glow hover:scale-[1.02] transition-transform flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" /> Create Manual Booking
          </Link>
        </div>

        {/* Notification Toast */}
        {notificationMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4" />
            <span>{notificationMsg}</span>
          </div>
        )}

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total</span>
            <span className="text-3xl font-black text-white">{stats.total}</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Pending</span>
            <span className="text-3xl font-black text-slate-300">{stats.pending}</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-blue-500/30 space-y-1">
            <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider block">Confirmed</span>
            <span className="text-3xl font-black text-blue-400">{stats.confirmed}</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-amber-500/30 space-y-1">
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">Assigned</span>
            <span className="text-3xl font-black text-amber-400">{stats.assigned}</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-purple-500/30 space-y-1">
            <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider block">In Transit</span>
            <span className="text-3xl font-black text-purple-400">{stats.inTransit}</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 space-y-1">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">Completed</span>
            <span className="text-3xl font-black text-emerald-400">{stats.completed}</span>
          </div>
        </div>

        {/* Recent Bookings Section */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-orange-400" />
              Recent Customer Bookings
            </h2>
            <Link href="/admin/bookings" className="text-xs font-semibold text-orange-400 hover:underline">
              View All ({bookings.length}) →
            </Link>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Route</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-white">{b.booking_number}</td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-slate-200 block">{b.customer_name}</span>
                      <span className="text-slate-500 text-[11px]">{b.customer_phone}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {b.pickup_city} ➔ {b.drop_city}
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {b.pickup_date} <br />
                      <span className="text-slate-500 text-[11px]">{b.pickup_time}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{b.vehicle_type}</td>
                    <td className="py-4 px-4">
                      {b.status === 'assigned' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Assigned</span>}
                      {b.status === 'confirmed' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Confirmed</span>}
                      {b.status === 'pending' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">Pending</span>}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedBookingForAssign(b)}
                        className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/30 text-[11px] font-bold"
                      >
                        {b.assigned_vehicle_id || b.driver_name ? 'Re-Assign Vehicle' : 'Assign Vehicle'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vehicle Assignment Modal */}
        {selectedBookingForAssign && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-lg w-full space-y-6 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Assign Vehicle & Driver</h3>
                  <span className="text-xs text-slate-400">Booking: {selectedBookingForAssign.booking_number} ({selectedBookingForAssign.customer_name})</span>
                </div>
                <button
                  onClick={() => setSelectedBookingForAssign(null)}
                  className="text-slate-500 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold mb-1 block">Assigned Driver Name</label>
                  <input
                    type="text"
                    value={assignDriverName}
                    onChange={(e) => setAssignDriverName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold mb-1 block">Driver Phone Number</label>
                  <input
                    type="text"
                    value={assignDriverPhone}
                    onChange={(e) => setAssignDriverPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold mb-1 block">Vehicle Registration Number</label>
                  <input
                    type="text"
                    value={assignVehicleNumber}
                    onChange={(e) => setAssignVehicleNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl text-orange-300 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span>Clicking save will automatically trigger WhatsApp & SMS dispatch to customer.</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedBookingForAssign(null)}
                  className="px-4 py-2 rounded-xl glass-card text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmVehicleAssign}
                  className="px-6 py-2.5 rounded-xl brand-gradient-bg text-white text-xs font-bold shadow-glow"
                >
                  Save & Dispatch Notification
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
