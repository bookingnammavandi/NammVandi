'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { ContactMessage } from '@namma-move/types';
import { MessageSquare, Mail, Phone, Clock, CheckCircle2, Loader2 } from 'lucide-react';

export default function AdminContactEnquiriesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/contact-enquiries');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch('/api/admin/contact-enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'read' }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.map((m) => (m.id === id ? { ...m, status: 'read' } : m)));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Contact Enquiries & Support</h1>
          <p className="text-xs text-slate-500 mt-1">Inbound support inquiries submitted via public contact form, fetched live from Supabase DB.</p>
        </div>

        <div className="space-y-4 max-w-4xl">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-orange-500" /> Fetching support enquiries from Supabase DB...
            </div>
          ) : messages.length === 0 ? (
            <div className="glass-card p-8 text-center rounded-2xl border border-slate-200 bg-white text-xs text-slate-500 shadow-sm">
              No contact enquiries found in Supabase database.
            </div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="glass-card p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center font-bold text-sm">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{m.name}</h3>
                      <span className="text-xs text-slate-500">{m.email} • {m.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                      m.status === 'unread'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {m.status}
                    </span>
                    {m.status === 'unread' && (
                      <button
                        onClick={() => markAsRead(m.id)}
                        className="text-xs text-slate-500 hover:text-slate-900 underline font-medium"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="text-orange-600 font-semibold block">Subject: {m.subject || 'General Enquiry'}</span>
                  <p className="leading-relaxed">{m.message}</p>
                </div>

                <div className="text-[10px] text-slate-400 text-right">
                  Received: {m.created_at ? new Date(m.created_at).toLocaleString() : 'Recently'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
