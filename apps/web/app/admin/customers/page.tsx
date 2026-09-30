'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Profile } from '@namma-move/types';
import { Users, Phone, Mail, Calendar, ShieldCheck, Loader2 } from 'lucide-react';

export default function AdminCustomersPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const res = await fetch('/api/admin/customers');
        const data = await res.json();
        if (data.success) {
          setProfiles(data.data || []);
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCustomers();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Customer Database</h1>
          <p className="text-xs text-slate-400 mt-1">Registered customer profiles, contact records, and role assignments in Supabase DB.</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 overflow-x-auto">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-orange-400" /> Fetching customer records from Supabase DB API...
            </div>
          ) : profiles.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No customer profile records found in Supabase DB.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Phone Number</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4">Account Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {profiles.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">{c.full_name || 'Anonymous User'}</td>
                    <td className="py-4 px-4 text-slate-300 font-mono">{c.phone || 'N/A'}</td>
                    <td className="py-4 px-4 text-slate-300">{c.email || 'N/A'}</td>
                    <td className="py-4 px-4 font-bold uppercase text-orange-400 text-[10px]">{c.role}</td>
                    <td className="py-4 px-4 text-slate-400">{c.created_at ? new Date(c.created_at).toLocaleDateString() : 'N/A'}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.is_active
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {c.is_active ? 'Active' : 'Inactive'}
                      </span>
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
