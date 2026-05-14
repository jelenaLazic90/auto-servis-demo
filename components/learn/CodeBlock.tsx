'use client';

import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = 'javascript', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-700/30 overflow-hidden my-4 hover:border-slate-600/50 transition-colors">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-700/30">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          {filename && <span className="text-xs text-slate-400 font-medium">{filename}</span>}
          <span className="text-xs text-slate-600 font-mono">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`text-xs px-3 py-1 rounded-lg transition-all ${
            copied
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
          }`}
        >
          {copied ? '✓ Kopirano!' : 'Kopiraj'}
        </button>
      </div>
      <pre className="p-4 bg-slate-950/80 overflow-x-auto text-sm leading-relaxed">
        <code className="text-slate-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}
