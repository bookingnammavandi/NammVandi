'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Send,
  Sparkles,
} from 'lucide-react';
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

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setStatusMsg({ type: 'error', text: 'Please fill in all required fields.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from('contact_messages').insert([
        { name: name.trim(), email: email.trim(), phone: phone.trim(), subject, message: message.trim(), status: 'unread' },
      ]);

      if (error) throw error;

      setStatusMsg({
        type: 'success',
        text: 'Thank you! Your message has been sent to the NammaVandi support team. We will get back to you shortly.',
      });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubject('General Enquiry');
    } catch {
      setStatusMsg({
        type: 'error',
        text: 'Something went wrong while sending your message. Please try again or call us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-slate-400';
  const labelClass = 'text-xs font-semibold text-slate-700 mb-1.5 block';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-12 sm:space-y-14">
      
      {/* ───────────────────── HEADER ───────────────────── */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-orange-600 bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">
          <MessageSquare className="w-3.5 h-3.5" />
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Contact NammaVandi
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          Have questions about your move or need a custom enterprise quote? We’re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* ───────────────────── CONTACT INFO ───────────────────── */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Operational Head Office
            </h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-0.5">Customer Support</p>
                  <a href="tel:+919876543210" className="text-sm font-semibold text-slate-900 hover:text-orange-600 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-0.5">Email</p>
                  <a href="mailto:support@NammaVandi.in" className="text-sm font-semibold text-slate-900 hover:text-orange-600 transition-colors break-all">
                    support@NammaVandi.in
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-0.5">Logistics Hub</p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    NammaVandi Logistics Hub, Anna Salai, T. Nagar, Chennai, Tamil Nadu – 600017
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-0.5">Working Hours</p>
                  <p className="text-sm text-slate-700">Monday – Sunday · 06:00 AM – 10:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Service Cities */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
              Key Service Cities
            </p>
            <div className="flex flex-wrap gap-2">
              {['Chennai', 'Coimbatore', 'Bengaluru', 'Madurai', 'Trichy', 'Salem', 'Pondicherry', 'Hyderabad'].map(
                (city) => (
                  <span
                    key={city}
                    className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg"
                  >
                    {city}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* ───────────────────── CONTACT FORM ───────────────────── */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Send Us a Message</h3>
          </div>

          {statusMsg && (
            <div
              className={`mb-5 p-4 rounded-xl text-sm flex items-start gap-2.5 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className={labelClass}>
                Your Name <span className="text-orange-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ramesh Kumar"
                className={fieldClass}
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number <span className="text-orange-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={fieldClass}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@example.com"
                  className={fieldClass}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject
              </label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={fieldClass}
                disabled={isSubmitting}
              >
                <option value="General Enquiry">General Enquiry</option>
                <option value="House Move Quote">House Move Quote</option>
                <option value="Office Relocation">Office Relocation</option>
                <option value="Vehicle Shifting">Vehicle Shifting</option>
                <option value="Feedback / Complaint">Feedback / Support</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Your Message <span className="text-orange-500">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your move, preferred dates, or any special requirements..."
                className={`${fieldClass} resize-y min-h-[120px]`}
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}