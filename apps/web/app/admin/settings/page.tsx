'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Settings, ShieldCheck, MapPin, Calculator, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [basePrice, setBasePrice] = useState('1500');
  const [perKmPrice, setPerKmPrice] = useState('40');
  const [floorPrice, setFloorPrice] = useState('250');
  const [otpProvider, setOtpProvider] = useState('mock');
  const [waProvider, setWaProvider] = useState('whatsapp_cloud');
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white">Platform Settings & Pricing Engine</h1>
          <p className="text-xs text-slate-400 mt-1">Configure base moving tariffs, service area coverage, WhatsApp & OTP integration settings.</p>
        </div>

        {savedMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Platform settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Pricing Engine Config */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4" /> Pricing Engine Algorithm Tariffs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Base Booking Price (₹)</label>
                <input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Per KM Rate (₹/km)</label>
                <input
                  type="number"
                  value={perKmPrice}
                  onChange={(e) => setPerKmPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Floor Charge per Floor (₹)</label>
                <input
                  type="number"
                  value={floorPrice}
                  onChange={(e) => setFloorPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Integration Providers */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Notification & OTP Providers
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Phone OTP Provider</label>
                <select
                  value={otpProvider}
                  onChange={(e) => setOtpProvider(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                >
                  <option value="mock">Local Development Mock OTP (123456)</option>
                  <option value="twilio">Twilio Programmable SMS</option>
                  <option value="msg91">MSG91 India OTP API</option>
                  <option value="supabase">Supabase Auth Native Phone</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">WhatsApp Dispatch Gateway</label>
                <select
                  value={waProvider}
                  onChange={(e) => setWaProvider(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                >
                  <option value="whatsapp_cloud">Official WhatsApp Cloud Business API</option>
                  <option value="simulated">Simulated Sandbox</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Service Hubs */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Active Service Cities
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Chennai', 'Coimbatore', 'Bengaluru', 'Madurai', 'Trichy', 'Salem', 'Pondicherry', 'Hyderabad', 'Kochi'].map((city) => (
                <div key={city} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-semibold text-white flex items-center justify-between">
                  <span>{city}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Active</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-glow"
          >
            Save All Settings
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
