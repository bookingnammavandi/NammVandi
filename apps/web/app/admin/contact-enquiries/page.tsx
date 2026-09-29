'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { MessageSquare, Mail, Phone, Clock, CheckCircle2 } from 'lucide-react';

const MOCK_ENQUIRIES = [
  {
    id: '1',
    name: 'Kavitha Sundaram',
    email: 'kavitha@example.com',
    phone: '+91 99445 56677',
    subject: 'House Shifting Enquiry',
    message: 'Hi, I want to relocate a 3 BHK house from Chennai to Salem next month. Please provide a quote.',
    status: 'Unread',
    date: '24 Sep 2026',
  },
  {
    id: '2',
    name: 'Sanjay Raman',
    email: 'sanjay@example.com',
    phone: '+91 99556 67788',
    subject: 'Office Relocation',
    message: 'We are shifting our 40-workstation office in Indiranagar Bengaluru. Do you provide packing material?',
    status: 'Replied',
    date: '22 Sep 2026',
  },
];

export default function AdminContactEnquiriesPage() {
  const [messages, setMessages] = useState(MOCK_ENQUIRIES);

  const markAsRead = (id: string) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, status: 'Read' } : m)));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Contact Enquiries & Support</h1>
          <p className="text-xs text-slate-400 mt-1">Inbound support inquiries submitted via public contact form.</p>
        </div>

        <div className="space-y-4 max-w-4xl">
          {messages.map((m) => (
            <div key={m.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-sm">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{m.name}</h3>
                    <span className="text-xs text-slate-400">{m.email} • {m.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    m.status === 'Unread'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {m.status}
                  </span>
                  {m.status === 'Unread' && (
                    <button
                      onClick={() => markAsRead(m.id)}
                      className="text-xs text-slate-400 hover:text-white underline"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="text-orange-400 font-semibold block">Subject: {m.subject}</span>
                <p className="leading-relaxed">{m.message}</p>
              </div>

              <div className="text-[10px] text-slate-500 text-right">
                Received: {m.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
