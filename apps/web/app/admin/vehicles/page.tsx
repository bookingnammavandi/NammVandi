'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Vehicle, Driver, VehicleType } from '@namma-move/types';
import { Truck, User, Plus, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    vehicle_number: 'TN 01 AB 1234',
    vehicle_type: 'Eicher Tempo',
    vehicle_model: 'Eicher Pro 2059',
    capacity_kg: 3500,
    contact_number: '+919876512345',
    driver_name: 'Rajesh Kumar',
    driver_phone: '+919876512345',
    is_available: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    vehicle_number: 'TN 02 CD 5678',
    vehicle_type: 'Mini Truck',
    vehicle_model: 'Tata Ace Gold',
    capacity_kg: 850,
    contact_number: '+919876523456',
    driver_name: 'Senthil Nathan',
    driver_phone: '+919876523456',
    is_available: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    vehicle_number: 'TN 03 EF 9012',
    vehicle_type: 'Pickup Truck',
    vehicle_model: 'Mahindra Bolero Pickup',
    capacity_kg: 1500,
    contact_number: '+919876534567',
    driver_name: 'Karthik Murugan',
    driver_phone: '+919876534567',
    is_available: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNumber, setNewNumber] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newType, setNewType] = useState<VehicleType>('Eicher Tempo');
  const [newDriver, setNewDriver] = useState('');
  const [newDriverPhone, setNewDriverPhone] = useState('');

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const v: Vehicle = {
      id: String(Date.now()),
      vehicle_number: newNumber || 'TN 05 AB 9999',
      vehicle_model: newModel || 'Ashok Leyland Dost',
      vehicle_type: newType,
      capacity_kg: 2500,
      driver_name: newDriver || 'New Driver',
      driver_phone: newDriverPhone || '+919876500000',
      is_available: true,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setVehicles([...vehicles, v]);
    setShowAddModal(false);
    setNewNumber('');
    setNewModel('');
    setNewDriver('');
  };

  const toggleAvailability = (id: string) => {
    setVehicles(
      vehicles.map((v) => (v.id === id ? { ...v, is_available: !v.is_available } : v))
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Vehicle Fleet & Drivers</h1>
            <p className="text-xs text-slate-400 mt-1">Manage active logistics trucks, drivers, models, and real-time availability status.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-glow flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" /> Add New Vehicle
          </button>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div key={v.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-black text-white">{v.vehicle_number}</span>
                <button
                  onClick={() => toggleAvailability(v.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    v.is_available
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {v.is_available ? '● Available' : '● On Trip / Busy'}
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-200">{v.vehicle_model}</h3>
                <span className="text-xs text-orange-400 font-semibold">{v.vehicle_type}</span>
                <p className="text-xs text-slate-400">Capacity: {v.capacity_kg} kg</p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Assigned Driver:</span>
                  <span className="text-white font-bold">{v.driver_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Driver Phone:</span>
                  <span className="text-slate-200 font-semibold">{v.driver_phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleAddVehicle} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-md w-full space-y-4">
              <h3 className="text-lg font-bold text-white">Add Vehicle to NammaMove Fleet</h3>
              
              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Vehicle Number</label>
                <input
                  type="text"
                  required
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  placeholder="TN 05 AB 1234"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Vehicle Model</label>
                <input
                  type="text"
                  required
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  placeholder="Eicher Pro 2059"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Vehicle Type Category</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Eicher Tempo">Eicher Tempo</option>
                  <option value="Mini Truck">Mini Truck</option>
                  <option value="Pickup Truck">Pickup Truck</option>
                  <option value="Large Truck">Large Truck</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Driver Name</label>
                <input
                  type="text"
                  value={newDriver}
                  onChange={(e) => setNewDriver(e.target.value)}
                  placeholder="Rajesh"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Driver Phone</label>
                <input
                  type="text"
                  value={newDriverPhone}
                  onChange={(e) => setNewDriverPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl glass-card text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl brand-gradient-bg text-white text-xs font-bold shadow-glow"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
