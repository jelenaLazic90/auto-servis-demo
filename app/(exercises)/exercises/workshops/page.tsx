'use client';

import React, { useEffect, useState, useCallback } from 'react';
import WorkshopStep from '@/components/learn/WorkshopStep';
import { WORKSHOPS } from '@/lib/learn-data/workshops';
import { markCompleted } from '@/lib/store';

const WORKSHOP_STORAGE_KEY = 'demo_workshop_progress';

function getWorkshopProgress(): Record<string, boolean[]> {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem(WORKSHOP_STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

function saveWorkshopProgress(data: Record<string, boolean[]>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WORKSHOP_STORAGE_KEY, JSON.stringify(data));
}

export default function WorkshopsPage() {
  const [activeWorkshop, setActiveWorkshop] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean[]>>({});

  useEffect(() => {
    markCompleted('workshops');
    setProgress(getWorkshopProgress());
  }, []);

  const handleToggleStep = useCallback((workshopId: string, stepIndex: number) => {
    setProgress((prev) => {
      const workshop = WORKSHOPS.find((w) => w.id === workshopId);
      if (!workshop) return prev;

      const steps = prev[workshopId] || new Array(workshop.steps.length).fill(false);
      const updated = [...steps];
      updated[stepIndex] = !updated[stepIndex];

      const newProgress = { ...prev, [workshopId]: updated };
      saveWorkshopProgress(newProgress);
      return newProgress;
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="animate-fade-in-up">
        <span className="section-header-green">Vežbe</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Radionice</h1>
        <p className="text-slate-400">
          5 vođenih vežbi — korak po korak instrukcije za rad na pravom projektu.
          Čekiraj korake kako ih završavaš.
        </p>
      </div>

      {/* Workshop list */}
      <div className="space-y-3 stagger-children">
        {WORKSHOPS.map((workshop, i) => {
          const steps = progress[workshop.id] || new Array(workshop.steps.length).fill(false);
          const completed = steps.filter(Boolean).length;
          const isActive = activeWorkshop === workshop.id;
          const isComplete = completed === workshop.steps.length;

          return (
            <div key={workshop.id}>
              <button
                onClick={() => setActiveWorkshop(isActive ? null : workshop.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all hover:-translate-y-0.5 ${
                  isActive
                    ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                    : isComplete
                    ? 'bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/20'
                    : 'bg-slate-800/50 border-slate-700/30 hover:border-slate-600/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold ${
                      isComplete
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : isActive
                        ? 'bg-indigo-500/20 text-indigo-300'
                        : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      {isComplete ? '✓' : i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{workshop.title}</h3>
                      <p className="text-sm text-slate-500">{workshop.goal.substring(0, 80)}...</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-sm text-slate-400">
                      {completed}/{workshop.steps.length}
                    </span>
                    <span className={`text-slate-500 transition-transform text-xs ${isActive ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                </div>
              </button>

              {isActive && (
                <div className="mt-3 animate-fade-in">
                  <WorkshopStep
                    workshop={workshop}
                    completedSteps={steps}
                    onToggleStep={(stepIndex) => handleToggleStep(workshop.id, stepIndex)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
