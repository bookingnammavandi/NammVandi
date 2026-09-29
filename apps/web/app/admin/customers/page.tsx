'use client';

import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Users, Phone, Mail, Calendar, ShieldCheck } from 'lucide-react';

const MOCK_CUSTOMERS = [
  { id: '1', name: 'Arun Vijay', email: 'arun.v@example.com', phone: '+91 98123 45678', bookingsCount: 2, lastBooking: '12 Oct 2026', status: 'Active' },
  { id: '2', name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+91 98234 56789', bookingsCount: 1, lastBooking: '15 Oct 2026', status: 'Active' },
  { id: '3', name: 'Deepak Raj', email: 'deepak.r@example.com', phone: '+91 98345 67890', bookingsCount: 1, lastBooking: '20 Oct 2026', status: 'Active' },
  { id: '4', name: 'Gokul Seenuvasan', email: 'gokulseenuvasan31@gmail.com', phone: '+91 98765 43210', bookingsCount: 3, lastBooking: 'Today', status: 'Admin' },
];

export default function AdminCustomersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Customer Database</h1>
          <p className="text-xs text-slate-400 mt-1">Registered customer profiles, contact records, and total move history.</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Bookings</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {MOCK_CUSTOMERS.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-white">{c.name}</td>
                  <td className="py-4 px-4 text-slate-300 font-mono">{c.phone}</td>
                  <td className="py-4 px-4 text-slate-300">{c.email}</td>
                  <td className="py-4 px-4 font-bold text-orange-400">{c.bookingsCount} Move(s)</td>
                  <td className="py-4 px-4 text-slate-400">{c.lastBooking}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {c.status}
                    </span>
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
