'use client';

import { MoveType, MOVE_TYPE_LABEL } from '@/lib/moveType';

export function MoveTypeChips({ value, onChange }: { value: MoveType | null; onChange: (t: MoveType) => void }) {
  return (
    <div>
      <label className="text-xs text-slate-700 font-semibold mb-1.5 block">Type of move</label>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MOVE_TYPE_LABEL) as MoveType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={`px-3.5 py-2 rounded-lg border text-xs transition-all ${
              value === t
                ? 'bg-orange-50 border-orange-500 text-orange-600 font-bold shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {MOVE_TYPE_LABEL[t]}
          </button>
        ))}
      </div>
    </div>
  );
}
