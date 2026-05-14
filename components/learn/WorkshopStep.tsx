'use client';

import React from 'react';

export interface WorkshopStepData {
  title: string;
  description: string;
  claudePrompt?: string;
  tip?: string;
  expectedResult?: string;
}

export interface Workshop {
  id: string;
  title: string;
  goal: string;
  prerequisite: string;
  intro?: string;
  steps: WorkshopStepData[];
  whatYouLearned: string[];
}

interface WorkshopStepProps {
  workshop: Workshop;
  completedSteps: boolean[];
  onToggleStep: (index: number) => void;
}

export default function WorkshopStep({ workshop, completedSteps, onToggleStep }: WorkshopStepProps) {
  const completed = completedSteps.filter(Boolean).length;
  const total = workshop.steps.length;

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white">{workshop.title}</h3>
        <p className="text-slate-400 mt-1">{workshop.goal}</p>
      </div>

      {workshop.intro && (
        <div className="callout callout-blue">
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{workshop.intro}</p>
        </div>
      )}

      <div className="flex items-center gap-3 text-sm">
        <span className="section-header section-header-purple">Preduslov</span>
        <span className="text-slate-300">{workshop.prerequisite}</span>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Napredak</span>
          <span className="text-slate-300 font-semibold">{completed}/{total} koraka</span>
        </div>
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
            style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {workshop.steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 p-5 rounded-xl border transition-all ${
              completedSteps[i]
                ? 'bg-emerald-500/5 border-emerald-500/30'
                : 'bg-slate-900/50 border-slate-700/30 hover:border-slate-600/50'
            }`}
          >
            <button
              onClick={() => onToggleStep(i)}
              className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                completedSteps[i]
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'border-slate-600 hover:border-indigo-400 hover:bg-indigo-500/10'
              }`}
            >
              {completedSteps[i] && <span className="text-xs font-bold">✓</span>}
            </button>
            <div className="flex-1 min-w-0 space-y-3">
              <p className="font-semibold text-white">
                <span className="text-indigo-400">Korak {i + 1}:</span> {step.title}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{step.description}</p>

              {step.claudePrompt && (
                <div className="p-4 bg-slate-950/80 border border-emerald-500/20 rounded-xl">
                  <p className="text-xs text-emerald-400 mb-2 font-bold uppercase tracking-wide">Reci Claude Code-u:</p>
                  <p className="text-sm text-emerald-300 font-mono leading-relaxed whitespace-pre-line">{step.claudePrompt}</p>
                </div>
              )}

              {step.tip && (
                <div className="callout callout-yellow">
                  <p className="text-xs text-amber-300 font-bold uppercase tracking-wide mb-1">Savet</p>
                  <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{step.tip}</p>
                </div>
              )}

              {step.expectedResult && (
                <div className="flex items-start gap-2 mt-1">
                  <span className="text-blue-400 text-sm mt-0.5">✓</span>
                  <p className="text-sm text-blue-300">{step.expectedResult}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* What you learned */}
      {completed === total && total > 0 && (
        <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl animate-fade-in-scale">
          <h4 className="font-bold text-emerald-300 mb-3 text-lg">🎉 Šta si naučio/la:</h4>
          <ul className="space-y-2">
            {workshop.whatYouLearned.map((item, i) => (
              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-emerald-400">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
