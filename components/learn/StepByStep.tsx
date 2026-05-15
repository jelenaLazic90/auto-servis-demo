'use client';

import React, { useState, useRef, useCallback } from 'react';

export interface Step {
  title: string;
  description: string;
  file?: string;
  code?: string;
}

interface StepByStepProps {
  steps: Step[];
  title?: string;
  onStepChange?: (step: number) => void;
}

export default function StepByStep({ steps, title, onStepChange }: StepByStepProps) {
  const [activeStep, setActiveStep] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollTabIntoView = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    const button = buttonRefs.current[index];
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Center the button in the scroll container
    const scrollLeft = button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2;
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, []);

  const goToStep = (step: number) => {
    setActiveStep(step);
    onStepChange?.(step);
    setTimeout(() => {
      scrollTabIntoView(step);
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  };

  return (
    <div className="space-y-5">
      {title && <h3 className="text-lg font-semibold text-slate-200">{title}</h3>}

      {/* Step indicators */}
      <div ref={scrollContainerRef} className="flex gap-2 overflow-x-auto pb-2 scroll-smooth">
        {steps.map((step, i) => (
          <button
            key={i}
            ref={(el) => { buttonRefs.current[i] = el; }}
            onClick={() => goToStep(i)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all ${
              i === activeStep
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/5'
                : i < activeStep
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/30 hover:bg-slate-800/80 hover:text-slate-200'
            }`}
          >
            <span className={`w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold ${
              i < activeStep ? 'bg-emerald-500/20' : i === activeStep ? 'bg-indigo-500/20' : 'bg-slate-700/50'
            }`}>
              {i < activeStep ? '✓' : i + 1}
            </span>
            <span className="hidden sm:inline">{step.title}</span>
          </button>
        ))}
      </div>

      {/* Step content */}
      <div ref={contentRef} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 space-y-4 animate-fade-in">
        <h4 className="text-lg font-bold text-white">
          <span className="text-indigo-400">Korak {activeStep + 1}:</span> {steps[activeStep].title}
        </h4>
        <p className="text-slate-300 leading-relaxed">{steps[activeStep].description}</p>
        {steps[activeStep].file && (
          <p className="text-sm text-slate-500">
            📁 <code className="text-blue-400 bg-slate-900/50 px-2 py-0.5 rounded">{steps[activeStep].file}</code>
          </p>
        )}
        {steps[activeStep].code && (
          <pre className="p-4 bg-slate-950/80 rounded-xl overflow-x-auto text-sm border border-slate-700/30">
            <code className="text-slate-300 font-mono">{steps[activeStep].code}</code>
          </pre>
        )}
      </div>

      {/* Nav buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => goToStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="px-5 py-2.5 text-sm bg-slate-800/50 text-slate-300 rounded-xl border border-slate-700/30 hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ← Prethodni
        </button>
        <button
          onClick={() => goToStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
          className="px-5 py-2.5 text-sm bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30 hover:bg-indigo-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Sledeći →
        </button>
      </div>
    </div>
  );
}
