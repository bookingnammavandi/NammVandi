'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Search, Check, AlertCircle } from 'lucide-react';
import { AddressSnapshot } from '@namma-move/types';

interface GoogleAddressInputProps {
  label: string;
  value: AddressSnapshot;
  onChange: (value: AddressSnapshot) => void;
  error?: string;
}

const CITY_OPTIONS = [
  { city: 'Chennai', state: 'Tamil Nadu', pincode: '600001' },
  { city: 'Coimbatore', state: 'Tamil Nadu', pincode: '641001' },
  { city: 'Bengaluru', state: 'Karnataka', pincode: '560001' },
  { city: 'Madurai', state: 'Tamil Nadu', pincode: '625001' },
  { city: 'Trichy', state: 'Tamil Nadu', pincode: '620001' },
  { city: 'Salem', state: 'Tamil Nadu', pincode: '636001' },
  { city: 'Pondicherry', state: 'Puducherry', pincode: '605001' },
  { city: 'Hyderabad', state: 'Telangana', pincode: '500001' },
  { city: 'Kochi', state: 'Kerala', pincode: '682001' },
];

export function GoogleAddressInput({ label, value, onChange, error }: GoogleAddressInputProps) {
  const [searchTerm, setSearchTerm] = useState(value.address_line || '');
  const [selectedCity, setSelectedCity] = useState(value.city || 'Chennai');
  const [floor, setFloor] = useState(String(value.floor || '0'));
  const [pincode, setPincode] = useState(value.pincode || '600001');

  useEffect(() => {
    const selectedCityObj = CITY_OPTIONS.find((c) => c.city === selectedCity) || CITY_OPTIONS[0];
    onChange({
      ...value,
      address_line: searchTerm || `${selectedCity} Main Rd`,
      city: selectedCity,
      state: selectedCityObj.state,
      pincode: pincode || selectedCityObj.pincode,
      floor: floor,
    });
  }, [searchTerm, selectedCity, floor, pincode]);

  return (
    <div className="space-y-4 glass-card p-5 rounded-2xl border border-slate-700/60">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-500" />
          {label}
        </label>
        <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
          {selectedCity}
        </span>
      </div>

      {/* Address Line Search / Input */}
      <div>
        <label className="text-xs text-slate-400 font-medium mb-1 block">
          Street / Door No / Apartment / Area Name
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. 12B, Anna Salai, T. Nagar"
            className="w-full bg-slate-900/90 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
          />
          <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
        </div>
      </div>

      {/* City & Floor Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-slate-400 font-medium mb-1 block">City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-sm text-white outline-none"
          >
            {CITY_OPTIONS.map((c) => (
              <option key={c.city} value={c.city}>
                {c.city} ({c.state})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-400 font-medium mb-1 block">Pincode</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="600017"
            className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-sm text-white outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 font-medium mb-1 block">Floor No.</label>
          <select
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-sm text-white outline-none"
          >
            <option value="0">Ground Floor / Lift available</option>
            <option value="1">1st Floor</option>
            <option value="2">2nd Floor</option>
            <option value="3">3rd Floor</option>
            <option value="4">4th Floor</option>
            <option value="5">5th Floor or Higher</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
