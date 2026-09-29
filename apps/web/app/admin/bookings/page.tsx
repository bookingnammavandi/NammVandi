'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/AdminLayout';
import { Booking, BookingStatus } from '@namma-move/types';
import { Search, Filter, Calendar, MapPin, Truck, Plus, Eye } from 'lucide-react';

const ALL_MOCK_BOOKINGS: Booking[] = [
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

export default function AdminBookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');

  const filteredBookings = ALL_MOCK_BOOKINGS.filter((b) => {
    const matchesSearch =
      b.booking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer_phone.includes(searchTerm) ||
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
            <p className="text-xs text-slate-400 mt-1">Search, filter, edit, and dispatch all customer relocations.</p>
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
                  <td className="py-4 px-4 font-bold text-orange-400">₹{b.estimated_price?.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    {b.status === 'assigned' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Assigned</span>}
                    {b.status === 'confirmed' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Confirmed</span>}
                    {b.status === 'pending' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">Pending</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
