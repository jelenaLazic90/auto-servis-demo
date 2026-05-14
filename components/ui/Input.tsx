'use client';

import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id: string;
}

export default function Input({ label, error, id, className, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm text-gray-400">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2',
          'text-gray-100 placeholder-gray-500',
          'focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none',
          'transition-colors',
          error && 'border-red-500',
          className
        )}
        {...rest}
      />
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
}
