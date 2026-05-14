'use client';

import React, { useEffect, useState } from 'react';
import QuizQuestion from '@/components/learn/QuizQuestion';
import ProgressBar from '@/components/learn/ProgressBar';
import { SCENARIOS } from '@/lib/learn-data/scenarios';
import { markCompleted } from '@/lib/store';

export default function ScenariosPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    markCompleted('scenarios');
  }, []);

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore((s) => s + 1);
    setAnswered((a) => a + 1);
  };

  const handleNext = () => {
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(0);
    setKey((k) => k + 1);
  };

  const isFinished = answered === SCENARIOS.length;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="animate-fade-in-up">
        <span className="section-header-green">Vežbe</span>
        <h1 className="text-3xl font-bold text-white mt-3 mb-2">Scenariji</h1>
        <p className="text-slate-400">
          Interaktivni kvizovi — pročitaj situaciju, izaberi šta bi uradio/la, i dobij instant feedback.
        </p>
      </div>

      {/* Score */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Pitanje <span className="text-white font-bold">{currentIndex + 1}</span> / {SCENARIOS.length}
            </span>
            <span className="text-sm text-emerald-300 font-medium">
              Tačno: {score}/{answered}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-1.5 rounded-xl hover:bg-slate-800/50 border border-slate-700/30"
          >
            Resetuj
          </button>
        </div>
        <ProgressBar completed={answered} total={SCENARIOS.length} />
      </div>

      {/* Finished screen */}
      {isFinished ? (
        <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 text-center space-y-4">
          <span className="text-6xl block">{score >= SCENARIOS.length * 0.8 ? '🎉' : score >= SCENARIOS.length * 0.6 ? '👍' : '📚'}</span>
          <h2 className="text-2xl font-bold text-white">
            Rezultat: <span className="text-gradient-blue inline-block">{score}/{SCENARIOS.length}</span>
          </h2>
          <p className="text-slate-400">
            {score >= SCENARIOS.length * 0.8
              ? 'Odlično! Razumeš handoff sistem i razvojni workflow.'
              : score >= SCENARIOS.length * 0.6
              ? 'Dobar rezultat! Pogledaj objašnjenja za pitanja koja si promašio/la.'
              : 'Prođi ponovo kroz lekcije i pokušaj opet. Fokusiraj se na objašnjenja.'}
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl transition-all font-medium shadow-lg shadow-blue-500/20"
          >
            Pokušaj ponovo
          </button>
        </div>
      ) : (
        <>
          <QuizQuestion
            key={`${key}-${currentIndex}`}
            quiz={SCENARIOS[currentIndex]}
            onAnswer={handleAnswer}
          />
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="px-5 py-2.5 text-sm bg-slate-800/50 text-slate-300 rounded-xl border border-slate-700/30 hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prethodno
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === SCENARIOS.length - 1 && !isFinished}
              className="px-5 py-2.5 text-sm bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30 hover:bg-indigo-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Sledeće →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
