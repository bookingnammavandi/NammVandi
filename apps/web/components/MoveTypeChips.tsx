'use client';

import { MoveType, MOVE_TYPE_LABEL } from '@/lib/moveType';

export function MoveTypeChips({ value, onChange }: { value: MoveType | null; onChange: (t: MoveType) => void }) {
  return (
    <div>
      <label className="text-xs text-slate-300 font-semibold mb-1.5 block">Type of move</label>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MOVE_TYPE_LABEL) as MoveType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={`px-3.5 py-2 rounded-lg border text-xs transition-all ${
              value === t
                ? 'bg-orange-500/20 border-orange-500 text-white font-bold'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
            }`}
          >
            {MOVE_TYPE_LABEL[t]}
          </button>
        ))}
      </div>
    </div>
  );
}