'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface BookingProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onStepClick?: (step: number) => void;
}

export function BookingProgress({
  currentStep,
  totalSteps = 9,
  stepTitles,
  onStepClick,
}: BookingProgressProps) {
  return (
    <div className="w-full mb-8">
      {/* Mobile step indicator */}
      <div className="md:hidden flex items-center justify-between mb-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
        <span className="text-xs font-semibold text-slate-500">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-bold text-orange-600">
          {stepTitles[currentStep - 1]}
        </span>
      </div>

      {/* Desktop step indicator */}
      <div className="hidden md:flex items-center justify-between relative px-2">
        {/* Track Line */}
        <div className="absolute left-6 right-6 top-4 h-0.5 bg-slate-200 -z-0" />
        <div
          className="absolute left-6 top-4 h-0.5 brand-gradient-bg transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 94}%` }}
        />

        {stepTitles.map((title, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              onClick={() => isCompleted && onStepClick && onStepClick(stepNumber)}
              className={`flex flex-col items-center relative z-10 ${
                isCompleted ? 'cursor-pointer' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? 'brand-gradient-bg text-white shadow-md'
                    : isCurrent
                    ? 'bg-orange-500 text-white ring-4 ring-orange-500/20 shadow-md'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNumber}
              </div>
              <span
                className={`text-[11px] font-semibold mt-2 max-w-[70px] text-center truncate ${
                  isCurrent ? 'text-orange-600 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
