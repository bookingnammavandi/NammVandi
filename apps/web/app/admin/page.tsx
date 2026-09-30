'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/AdminLayout';
import { Booking, BookingStatus, Vehicle } from '@namma-move/types';
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
  Loader2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBookingForAssign, setSelectedBookingForAssign] = useState<Booking | null>(null);
  const [assignDriverName, setAssignDriverName] = useState('');
  const [assignDriverPhone, setAssignDriverPhone] = useState('');
  const [assignVehicleNumber, setAssignVehicleNumber] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, vehiclesRes] = await Promise.all([
        fetch('/api/admin/bookings'),
        fetch('/api/admin/vehicles'),
      ]);
      const bookingsData = await bookingsRes.json();
      const vehiclesData = await vehiclesRes.json();

      if (bookingsData.success) setBookings(bookingsData.data || []);
      if (vehiclesData.success) setVehicles(vehiclesData.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    assigned: bookings.filter((b) => b.status === 'assigned').length,
    inTransit: bookings.filter((b) => b.status === 'in_transit').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  };

  const handleOpenAssignModal = (b: Booking) => {
    setSelectedBookingForAssign(b);
    setAssignDriverName(b.driver_name || '');
    setAssignDriverPhone(b.driver_phone || '');
    setAssignVehicleNumber(b.vehicle_number || '');
    setSelectedVehicleId(b.assigned_vehicle_id || '');
  };

  const handleSelectVehiclePreset = (vId: string) => {
    setSelectedVehicleId(vId);
    const found = vehicles.find((v) => v.id === vId);
    if (found) {
      setAssignVehicleNumber(found.vehicle_number);
      if (found.driver_name) setAssignDriverName(found.driver_name);
      if (found.driver_phone) setAssignDriverPhone(found.driver_phone);
    }
  };

  const handleConfirmVehicleAssign = async () => {
    if (!selectedBookingForAssign) return;

    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedBookingForAssign.id,
          status: 'assigned',
          driver_name: assignDriverName,
          driver_phone: assignDriverPhone,
          vehicle_number: assignVehicleNumber,
          assigned_vehicle_id: selectedVehicleId || null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Trigger WhatsApp notification service
        const notifRes = await triggerWhatsAppNotification({
          booking: selectedBookingForAssign,
          driverName: assignDriverName,
          driverPhone: assignDriverPhone,
          vehicleNumber: assignVehicleNumber,
        });

        setNotificationMsg(notifRes.message);
        setSelectedBookingForAssign(null);
        await fetchDashboardData();
        setTimeout(() => setNotificationMsg(null), 4000);
      }
    } catch (err) {
      console.error('Error assigning vehicle:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Operations Dashboard</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time overview of customer moves, assignments, and dispatch status connected to Supabase DB.</p>
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

          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-orange-400" /> Loading bookings from Supabase DB...
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No customer bookings found in Supabase database.
            </div>
          ) : (
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
                        {b.status === 'in_transit' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">In Transit</span>}
                        {b.status === 'completed' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Completed</span>}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleOpenAssignModal(b)}
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
          )}
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
                {vehicles.length > 0 && (
                  <div>
                    <label className="text-slate-300 font-semibold mb-1 block">Quick Select Available Fleet Vehicle</label>
                    <select
                      value={selectedVehicleId}
                      onChange={(e) => handleSelectVehiclePreset(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                    >
                      <option value="">-- Choose from Supabase Vehicles DB --</option>
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.vehicle_number} ({v.vehicle_type} - {v.driver_name || 'No Driver'})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

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
                  <span>Clicking save will automatically update Supabase DB and trigger WhatsApp notification.</span>
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
