'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/AdminLayout';
import { Booking } from '@namma-move/types';
import { Search, Filter, Calendar, MapPin, Truck, Plus, Eye, Loader2 } from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.data || []);
      }
    } catch (err) {
      console.error('Error loading bookings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      (b.booking_number && b.booking_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.customer_name && b.customer_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.customer_phone && b.customer_phone.includes(searchTerm)) ||
      (b.customer_email && b.customer_email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesCity = cityFilter === 'all' || b.pickup_city === cityFilter || b.drop_city === cityFilter;

    return matchesSearch && matchesStatus && matchesCity;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">All Bookings Management</h1>
            <p className="text-xs text-slate-400 mt-1">Search, filter, edit, and dispatch all customer relocations connected to Supabase DB.</p>
          </div>
          <Link
            href="/admin/create-booking"
            className="px-5 py-2.5 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-glow flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Booking
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search booking #, name, phone, email..."
              className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none pl-9"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
            >
              <option value="all">Filter by All Statuses</option>
              <option value="pending">Pending OTP</option>
              <option value="confirmed">Confirmed</option>
              <option value="assigned">Vehicle Assigned</option>
              <option value="in_transit">In Transit</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
            >
              <option value="all">Filter by All Cities</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 overflow-x-auto">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-orange-400" /> Fetching bookings from Supabase DB API...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No matching bookings found in Supabase DB.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Pickup ➔ Drop</th>
                  <th className="py-3 px-4">Schedule</th>
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">Estimated Price</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-white">{b.booking_number}</td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-200 block">{b.customer_name}</span>
                      <span className="text-slate-500 text-[11px]">{b.customer_phone}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      <strong className="text-white">{b.pickup_city}</strong> ➔ <strong className="text-white">{b.drop_city}</strong>
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {b.pickup_date} <br />
                      <span className="text-slate-500 text-[11px]">{b.pickup_time}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{b.vehicle_type}</td>
                    <td className="py-4 px-4 font-bold text-orange-400">₹{b.estimated_price?.toLocaleString() || 'N/A'}</td>
                    <td className="py-4 px-4">
                      {b.status === 'assigned' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Assigned</span>}
                      {b.status === 'confirmed' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Confirmed</span>}
                      {b.status === 'pending' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">Pending</span>}
                      {b.status === 'in_transit' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">In Transit</span>}
                      {b.status === 'completed' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Completed</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
