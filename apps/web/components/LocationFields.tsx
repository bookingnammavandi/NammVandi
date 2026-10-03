'use client';

import { MapPin, Search, AlertCircle } from 'lucide-react';
import { AddressSnapshot, ParkingAccess } from '@namma-move/types';

// EDIT THIS LIST: put the cities you serve (same names your pricing uses).
export const CITIES: Array<{ city: string; state: string }> = [
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Coimbatore', state: 'Tamil Nadu' },
  { city: 'Madurai', state: 'Tamil Nadu' },
  { city: 'Trichy', state: 'Tamil Nadu' },
  { city: 'Salem', state: 'Tamil Nadu' },
  { city: 'Tirunelveli', state: 'Tamil Nadu' },
  { city: 'Puducherry', state: 'Puducherry' },
  { city: 'Bengaluru', state: 'Karnataka' },
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Kochi', state: 'Kerala' },
];

// "Ground", "g", "0" -> "0"; "2", "2nd" -> "2". Used for pricing and saving.
export const normFloor = (f: string | number | null | undefined): string => {
  const s = String(f ?? '').trim().toLowerCase();
  if (s.startsWith('g')) return '0';
  const n = parseInt(s, 10);
  return Number.isNaN(n) ? '0' : String(n);
};

const PARKING: Array<[ParkingAccess, string]> = [
  ['easy', 'Easy'],
  ['narrow', 'Narrow street'],
  ['far', '50m+ walk'],
];

type ErrKey = 'address_line' | 'city' | 'pincode' | 'floor' | 'has_lift' | 'parking_access';
type Props = {
  label: string;
  value: AddressSnapshot;
  onChange: (v: AddressSnapshot) => void;
  errors?: Partial<Record<ErrKey, string>>;
};

const lbl = 'text-[11px] text-slate-400 mb-1 block';
const box = (bad?: string) =>
  `w-full bg-slate-900 border ${bad ? 'border-red-500' : 'border-slate-700'} focus:border-orange-500 rounded-lg px-3 py-2.5 text-sm text-white outline-none`;
const chip = (on: boolean, bad?: string) =>
  `px-3 py-2 rounded-lg border text-xs transition-all ${
    on ? 'bg-orange-500/20 border-orange-500 text-white font-bold' : `bg-slate-900 text-slate-400 ${bad ? 'border-red-500' : 'border-slate-700'}`
  }`;

export function LocationFields({ label, value, onChange, errors = {} }: Props) {
  const set = (patch: Partial<AddressSnapshot>) => onChange({ ...value, ...patch });
  const cities = CITIES.some((c) => c.city === value.city) || !value.city ? CITIES : [...CITIES, { city: value.city, state: value.state }];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 space-y-3">
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <MapPin className="w-4 h-4 text-orange-500" /> {label}
      </h3>

      <div>
        <label className={lbl}>Street / Door No / Apartment / Area Name</label>
        <div className="relative">
          <input
            className={`${box(errors.address_line)} pr-9`}
            value={value.address_line}
            onChange={(e) => set({ address_line: e.target.value })}
            placeholder="12, Anna Salai, T. Nagar"
          />
          <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
        <FieldError msg={errors.address_line} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={lbl}>City</label>
          <select
            className={box(errors.city)}
            value={value.city}
            onChange={(e) => set({ city: e.target.value, state: cities.find((c) => c.city === e.target.value)?.state ?? '' })}
          >
            <option value="">Select</option>
            {cities.map((c) => (
              <option key={c.city} value={c.city}>{c.city}</option>
            ))}
          </select>
          <FieldError msg={errors.city} />
        </div>
        <div>
          <label className={lbl}>Pincode</label>
          <input
            inputMode="numeric"
            maxLength={6}
            className={box(errors.pincode)}
            value={value.pincode}
            onChange={(e) => set({ pincode: e.target.value.replace(/\D/g, '') })}
            placeholder="600017"
          />
          <FieldError msg={errors.pincode} />
        </div>
        <div>
          <label className={lbl}>Floor No.</label>
          <input
            className={box(errors.floor)}
            maxLength={10}
            value={String(value.floor ?? '')}
            onChange={(e) => set({ floor: e.target.value })}
            placeholder="2 or Ground"
          />
          <FieldError msg={errors.floor} />
        </div>
      </div>

      <div>
        <label className={lbl}>Landmark (optional)</label>
        <input
          className={box()}
          value={value.landmark ?? ''}
          onChange={(e) => set({ landmark: e.target.value })}
          placeholder="Near Pondy Bazaar bus stop"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Lift available?</label>
          <div className="flex gap-2">
            {[true, false].map((opt) => (
              <button key={String(opt)} type="button" onClick={() => set({ has_lift: opt })} className={`${chip(value.has_lift === opt, errors.has_lift)} min-w-[56px]`}>
                {opt ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
          <FieldError msg={errors.has_lift} />
        </div>
        <div>
          <label className={lbl}>Truck parking near entrance?</label>
          <div className="flex flex-wrap gap-2">
            {PARKING.map(([key, text]) => (
              <button key={key} type="button" onClick={() => set({ parking_access: key })} className={chip(value.parking_access === key, errors.parking_access)}>
                {text}
              </button>
            ))}
          </div>
          <FieldError msg={errors.parking_access} />
        </div>
      </div>

      {value.parking_access === 'narrow' && <p className="text-xs text-amber-400">Large trucks may not fit. We may suggest a smaller vehicle.</p>}
      {value.parking_access === 'far' && <p className="text-xs text-amber-400">Extra carrying charge may apply.</p>}
    </div>
  );
}

export function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {msg}
    </p>
  );
}