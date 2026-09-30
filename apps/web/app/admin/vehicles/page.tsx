'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Vehicle, VehicleType } from '@namma-move/types';
import { Truck, User, Plus, Phone, CheckCircle2, ShieldCheck, Edit3, Trash2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Add Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newNumber, setNewNumber] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newType, setNewType] = useState<VehicleType>('Eicher Tempo');
  const [newCapacity, setNewCapacity] = useState<number>(2500);
  const [newDriver, setNewDriver] = useState('');
  const [newDriverPhone, setNewDriverPhone] = useState('');

  // Edit Modal state
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editNumber, setEditNumber] = useState('');
  const [editModel, setEditModel] = useState('');
  const [editType, setEditType] = useState<VehicleType>('Eicher Tempo');
  const [editCapacity, setEditCapacity] = useState<number>(2500);
  const [editDriver, setEditDriver] = useState('');
  const [editDriverPhone, setEditDriverPhone] = useState('');
  const [editIsAvailable, setEditIsAvailable] = useState(true);
  const [editIsActive, setEditIsActive] = useState(true);

  // Fetch all vehicles from Supabase DB via API
  const fetchVehicles = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/admin/vehicles');
      const data = await res.json();
      if (data.success) {
        setVehicles(data.data || []);
      } else {
        setErrorMsg(data.message || 'Failed to load fleet');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error fetching vehicles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/admin/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle_number: newNumber,
          vehicle_model: newModel,
          vehicle_type: newType,
          capacity_kg: newCapacity,
          driver_name: newDriver,
          driver_phone: newDriverPhone,
          contact_number: newDriverPhone,
          is_available: true,
          is_active: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Vehicle added successfully to Supabase DB!');
        setShowAddModal(false);
        setNewNumber('');
        setNewModel('');
        setNewDriver('');
        setNewDriverPhone('');
        await fetchVehicles();
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMsg(data.message || 'Failed to add vehicle');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error creating vehicle');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setEditNumber(v.vehicle_number);
    setEditModel(v.vehicle_model);
    setEditType(v.vehicle_type);
    setEditCapacity(v.capacity_kg || 1000);
    setEditDriver(v.driver_name || '');
    setEditDriverPhone(v.driver_phone || '');
    setEditIsAvailable(v.is_available);
    setEditIsActive(v.is_active);
  };

  const handleUpdateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/admin/vehicles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingVehicle.id,
          vehicle_number: editNumber,
          vehicle_model: editModel,
          vehicle_type: editType,
          capacity_kg: editCapacity,
          driver_name: editDriver,
          driver_phone: editDriverPhone,
          contact_number: editDriverPhone,
          is_available: editIsAvailable,
          is_active: editIsActive,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Vehicle updated successfully in Supabase DB!');
        setEditingVehicle(null);
        await fetchVehicles();
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMsg(data.message || 'Failed to update vehicle');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error updating vehicle');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAvailability = async (v: Vehicle) => {
    try {
      const res = await fetch('/api/admin/vehicles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: v.id,
          is_available: !v.is_available,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setVehicles(
          vehicles.map((item) => (item.id === v.id ? { ...item, is_available: !item.is_available } : item))
        );
      } else {
        setErrorMsg(data.message || 'Failed to update availability');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error updating availability');
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle from Supabase DB?')) return;
    try {
      const res = await fetch(`/api/admin/vehicles?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Vehicle deleted successfully!');
        setVehicles(vehicles.filter((v) => v.id !== id));
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMsg(data.message || 'Failed to delete vehicle');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error deleting vehicle');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Vehicle & Drivers</h1>
            {/* <p className="text-xs text-slate-400 mt-1">Manage live fleet trucks, drivers, and real-time availability connected to Supabase DB API.</p> */}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchVehicles}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
              title="Refresh Fleet Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-glow flex items-center gap-2 self-start"
            >
              <Plus className="w-4 h-4" /> Add New Vehicle
            </button>
          </div>
        </div>

        {/* Success / Error Messages */}
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Fleet Loading / Grid */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-orange-400 animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading vehicle fleet from Supabase database API...</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl border border-slate-800 space-y-4">
            <Truck className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Vehicles Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">There are no vehicle records in your Supabase database. Click below to add your first vehicle.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2 rounded-xl brand-gradient-bg text-white font-bold text-xs shadow-glow inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New Vehicle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <div key={v.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 relative group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-black text-white">{v.vehicle_number}</span>
                  <button
                    onClick={() => toggleAvailability(v)}
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
                  <p className="text-xs text-slate-400">Capacity: {v.capacity_kg || 1000} kg</p>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Assigned Driver:</span>
                    <span className="text-white font-bold">{v.driver_name || 'Unassigned'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Driver Phone:</span>
                    <span className="text-slate-200 font-semibold">{v.driver_phone || 'N/A'}</span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60">
                  <button
                    onClick={() => handleOpenEdit(v)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-orange-400" /> Edit Row
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(v.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 text-xs font-semibold transition-colors"
                    title="Delete Vehicle"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleAddVehicle} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-md w-full space-y-4">
              <h3 className="text-lg font-bold text-white">Add Vehicle to Supabase Fleet</h3>
              
              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Vehicle Number *</label>
                <input
                  type="text"
                  required
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  placeholder="TN 05 AB 1234"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Vehicle Model *</label>
                <input
                  type="text"
                  required
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  placeholder="Eicher Pro 2059"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Type Category *</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                  >
                    <option value="Eicher Tempo">Eicher Tempo</option>
                    <option value="Mini Truck">Mini Truck</option>
                    <option value="Pickup Truck">Pickup Truck</option>
                    <option value="Large Truck">Large Truck</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Capacity (kg)</label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(Number(e.target.value))}
                    placeholder="2500"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Driver Name</label>
                <input
                  type="text"
                  value={newDriver}
                  onChange={(e) => setNewDriver(e.target.value)}
                  placeholder="Rajesh Kumar"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Driver Phone</label>
                <input
                  type="text"
                  value={newDriverPhone}
                  onChange={(e) => setNewDriverPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl glass-card text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl brand-gradient-bg text-white text-xs font-bold shadow-glow flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Row Modal */}
        {editingVehicle && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleUpdateVehicle} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 max-w-md w-full space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white">Edit Vehicle Row</h3>
                <button
                  type="button"
                  onClick={() => setEditingVehicle(null)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Vehicle Registration Number *</label>
                <input
                  type="text"
                  required
                  value={editNumber}
                  onChange={(e) => setEditNumber(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Vehicle Model *</label>
                <input
                  type="text"
                  required
                  value={editModel}
                  onChange={(e) => setEditModel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Vehicle Type *</label>
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                  >
                    <option value="Eicher Tempo">Eicher Tempo</option>
                    <option value="Mini Truck">Mini Truck</option>
                    <option value="Pickup Truck">Pickup Truck</option>
                    <option value="Large Truck">Large Truck</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Capacity (kg)</label>
                  <input
                    type="number"
                    value={editCapacity}
                    onChange={(e) => setEditCapacity(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Assigned Driver Name</label>
                <input
                  type="text"
                  value={editDriver}
                  onChange={(e) => setEditDriver(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold mb-1 block">Driver Phone Number</label>
                <input
                  type="text"
                  value={editDriverPhone}
                  onChange={(e) => setEditDriverPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-orange-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsAvailable}
                    onChange={(e) => setEditIsAvailable(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-orange-500 focus:ring-0"
                  />
                  <span>Mark Available for Trips</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsActive}
                    onChange={(e) => setEditIsActive(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-orange-500 focus:ring-0"
                  />
                  <span>Active in Fleet</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingVehicle(null)}
                  className="px-4 py-2 rounded-xl glass-card text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl brand-gradient-bg text-white text-xs font-bold shadow-glow flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
