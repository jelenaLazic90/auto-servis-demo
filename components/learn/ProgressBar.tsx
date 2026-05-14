'use client';

import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ completed, total, label }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-slate-300 font-medium">{label || 'Napredak'}</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gradient">{percentage}%</span>
          <span className="text-sm text-slate-500">({completed}/{total})</span>
        </div>
      </div>
      <div className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out animate-gradient"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
