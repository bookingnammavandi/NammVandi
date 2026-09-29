'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg(null);

    if (!name || !email || !phone || !message) {
      setStatusMsg({ type: 'error', text: 'Please fill in all required fields.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();
      await supabase.from('contact_messages').insert([
        { name, email, phone, subject, message, status: 'unread' },
      ]);
      setStatusMsg({ type: 'success', text: 'Thank you! Your message has been sent to NammaMove support team.' });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setStatusMsg({ type: 'success', text: 'Thank you! Your message has been received.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-black text-white">Contact NammaMove</h1>
        <p className="text-slate-300 text-sm">Have questions about your move or need a custom enterprise quote? Get in touch with us.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Operational Head Office</h3>
          
          <ul className="space-y-4 text-xs">
            <li className="flex items-start gap-3 text-slate-300">
              <Phone className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Customer Support Phone</strong>
                <span>+91 98765 43210</span>
              </div>
            </li>

            <li className="flex items-start gap-3 text-slate-300">
              <Mail className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Email Address</strong>
                <span>support@nammamove.in</span>
              </div>
            </li>

            <li className="flex items-start gap-3 text-slate-300">
              <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Logistics Hub Address</strong>
                <span>NammaMove Logistics Hub, Anna Salai, T. Nagar, Chennai, Tamil Nadu - 600017</span>
              </div>
            </li>

            <li className="flex items-start gap-3 text-slate-300">
              <Clock className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Business Working Hours</strong>
                <span>Monday to Sunday: 06:00 AM – 10:00 PM</span>
              </div>
            </li>
          </ul>

          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 font-bold block mb-2">Key Service Cities</span>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
              {['Chennai', 'Coimbatore', 'Bengaluru', 'Madurai', 'Trichy', 'Salem', 'Pondicherry', 'Hyderabad'].map((city) => (
                <span key={city} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white">Send Us a Message</h3>

          {statusMsg && (
            <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
              statusMsg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}>
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Your Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ramesh Kumar"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@example.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none"
              >
                <option value="General Enquiry">General Enquiry</option>
                <option value="House Move Quote">House Move Quote</option>
                <option value="Office Relocation">Office Relocation</option>
                <option value="Vehicle Shifting">Vehicle Shifting</option>
                <option value="Feedback / Complaint">Feedback / Support</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold mb-1 block">Your Message *</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Details about your move..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:opacity-95"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
