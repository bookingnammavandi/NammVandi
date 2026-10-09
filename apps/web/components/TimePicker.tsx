'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChevronDown } from 'lucide-react';

export interface TimePickerProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  position?: 'top' | 'bottom';
}

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MINUTES = [0, 15, 30, 45];

function parseTimeString(val?: string): { hour12: number; minute: number; period: 'AM' | 'PM' } {
  if (!val) return { hour12: 9, minute: 0, period: 'AM' };

  // 12-hour pattern: "09:00 AM" or "9:00 PM"
  const m12 = val.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (m12) {
    const h = parseInt(m12[1], 10);
    const m = parseInt(m12[2], 10);
    const p = m12[3].toUpperCase() as 'AM' | 'PM';
    const roundedM = [0, 15, 30, 45].reduce((prev, curr) =>
      Math.abs(curr - m) < Math.abs(prev - m) ? curr : prev
    );
    return {
      hour12: h >= 1 && h <= 12 ? h : 9,
      minute: roundedM,
      period: p === 'PM' ? 'PM' : 'AM',
    };
  }

  // 24-hour pattern: "14:30" or "09:00"
  const m24 = val.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (m24) {
    const h24 = parseInt(m24[1], 10);
    const m = parseInt(m24[2], 10);
    const period: 'AM' | 'PM' = h24 >= 12 ? 'PM' : 'AM';
    const hour12 = h24 % 12 === 0 ? 12 : h24 % 12;
    const roundedM = [0, 15, 30, 45].reduce((prev, curr) =>
      Math.abs(curr - m) < Math.abs(prev - m) ? curr : prev
    );
    return {
      hour12,
      minute: roundedM,
      period,
    };
  }

  return { hour12: 9, minute: 0, period: 'AM' };
}

function formatTimeString(hour12: number, minute: number, period: 'AM' | 'PM'): string {
  return `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
}

export function TimePicker({
  id,
  value = '09:00 AM',
  onChange,
  className = '',
  disabled = false,
  position = 'top',
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const parsed = parseTimeString(value);
  const [hour12, setHour12] = useState<number>(parsed.hour12);
  const [minute, setMinute] = useState<number>(parsed.minute);
  const [period, setPeriod] = useState<'AM' | 'PM'>(parsed.period);

  // Sync internal state when external value changes
  useEffect(() => {
    const p = parseTimeString(value);
    setHour12(p.hour12);
    setMinute(p.minute);
    setPeriod(p.period);
  }, [value]);

  // Handle outside click and escape key to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const emitChange = (h: number, m: number, p: 'AM' | 'PM') => {
    const formatted = formatTimeString(h, m, p);
    onChange?.(formatted);
  };

  const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
    setPeriod(newPeriod);
    emitChange(hour12, minute, newPeriod);
  };

  const handleHourChange = (newHour: number) => {
    setHour12(newHour);
    emitChange(newHour, minute, period);
  };

  const handleMinuteChange = (newMinute: number) => {
    setMinute(newMinute);
    emitChange(hour12, newMinute, period);
  };

  const displayTime = formatTimeString(hour12, minute, period);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button styled cleanly like native input */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 focus:border-orange-500 rounded-xl px-3 py-2.5 text-sm text-white flex items-center justify-between gap-1.5 transition-colors outline-none disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <div className="flex items-center gap-2 truncate">
          <Clock className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
          <span className="font-semibold text-white tracking-wide text-xs sm:text-sm">{displayTime}</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded">
            {period}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-slate-400 transition-transform ${
              isOpen ? (position === 'top' ? 'rotate-0 text-orange-400' : 'rotate-180 text-orange-400') : ''
            }`}
          />
        </div>
      </button>

      {/* Popover on top side (or bottom) - compact height without popular move times */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose pickup time"
          className={`absolute z-50 right-0 w-72 sm:w-[285px] bg-slate-900/98 backdrop-blur-2xl border border-slate-700 rounded-2xl p-3 shadow-2xl shadow-black/90 space-y-2.5 ${
            position === 'top'
              ? 'bottom-full mb-2'
              : 'top-full mt-2'
          }`}
        >
          {/* AM / PM Option Selector */}
          <div>
            <div className="text-[11px] font-bold text-slate-300 mb-1 flex items-center justify-between">
              <span>Choose AM or PM</span>
              <span className="text-[10px] text-orange-400 font-semibold">
                {period === 'AM' ? 'Morning (AM)' : 'Afternoon (PM)'}
              </span>
            </div>
            <div
              className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800"
              role="radiogroup"
              aria-label="Select AM or PM"
            >
              <button
                type="button"
                role="radio"
                aria-checked={period === 'AM'}
                onClick={() => handlePeriodChange('AM')}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  period === 'AM'
                    ? 'bg-orange-500 text-white shadow-glow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>AM</span>
                <span className="text-[10px] font-normal opacity-75">(Morning)</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={period === 'PM'}
                onClick={() => handlePeriodChange('PM')}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  period === 'PM'
                    ? 'bg-orange-500 text-white shadow-glow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>PM</span>
                <span className="text-[10px] font-normal opacity-75">(Afternoon)</span>
              </button>
            </div>
          </div>

          {/* Hour Selector (1-12) */}
          <div>
            <div className="text-[11px] font-bold text-slate-300 mb-1 flex items-center justify-between">
              <span>Hour</span>
              <span className="text-[10px] text-slate-400 font-mono">1 – 12 {period}</span>
            </div>
            <div className="grid grid-cols-6 gap-1" role="group" aria-label="Select hour">
              {HOURS.map((h) => {
                const isSelected = hour12 === h;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => handleHourChange(h)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-500 shadow-glow'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {String(h).padStart(2, '0')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minute Selector */}
          <div>
            <div className="text-[11px] font-bold text-slate-300 mb-1 flex items-center justify-between">
              <span>Minutes</span>
              <span className="text-[10px] text-slate-400">15 min slots</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Select minute">
              {MINUTES.map((m) => {
                const isSelected = minute === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleMinuteChange(m)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-500 shadow-glow'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    :{String(m).padStart(2, '0')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Action */}
          <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between">
            <div className="text-xs text-slate-300">
              Time: <strong className="text-orange-400">{displayTime}</strong>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-1 rounded-lg brand-gradient-bg text-white text-xs font-bold shadow-glow hover:opacity-95 transition-opacity"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
