'use client';

import React, { useState } from 'react';

export interface QuizOption {
  text: string;
  correct: boolean;
  explanation: string;
}

export interface QuizData {
  id: string;
  question: string;
  situation: string;
  options: QuizOption[];
}

interface QuizQuestionProps {
  quiz: QuizData;
  onAnswer: (correct: boolean) => void;
}

export default function QuizQuestion({ quiz, onAnswer }: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    onAnswer(quiz.options[index].correct);
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 space-y-5">
      <div className="callout callout-blue">
        <p className="text-xs text-blue-300 font-bold uppercase tracking-wide mb-1">Situacija</p>
        <p className="text-slate-200 leading-relaxed">{quiz.situation}</p>
      </div>
      <p className="text-lg font-bold text-white">{quiz.question}</p>

      <div className="space-y-3">
        {quiz.options.map((opt, i) => {
          let style = 'border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/30';
          if (answered && selected === i) {
            style = opt.correct
              ? 'border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/5'
              : 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/5';
          } else if (answered && opt.correct) {
            style = 'border-emerald-500/30 bg-emerald-500/5';
          }

          const letter = String.fromCharCode(65 + i);
          const letterColors = ['bg-blue-500/20 text-blue-300', 'bg-purple-500/20 text-purple-300', 'bg-emerald-500/20 text-emerald-300', 'bg-amber-500/20 text-amber-300'];

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full text-left p-4 rounded-xl border transition-all ${style} ${
                answered ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold shrink-0 mt-0.5 ${letterColors[i % 4]}`}>
                  {letter}
                </span>
                <div>
                  <p className="text-slate-200 text-sm font-medium">{opt.text}</p>
                  {answered && selected === i && (
                    <p className={`text-sm mt-2 ${opt.correct ? 'text-emerald-300' : 'text-red-300'}`}>
                      {opt.explanation}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
