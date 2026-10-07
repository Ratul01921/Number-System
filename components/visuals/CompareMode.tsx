'use client';

import React, { useState } from 'react';
import { parse, format, validateInput } from '../../lib/convert';

export default function CompareMode() {
  const [input, setInput] = useState('42');
  const [base, setBase] = useState(10);
  
  const parsed = parse(input, base);
  const isValid = validateInput(input, base).valid;

  const results = [
    { base: 10, label: 'Decimal', color: 'bg-orange-50 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
    { base: 2, label: 'Binary', color: 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    { base: 8, label: 'Octal', color: 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    { base: 16, label: 'Hexadecimal', color: 'bg-purple-50 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-4xl mx-auto my-6">
      <h3 className="text-xl font-bold mb-4 text-center">Compare Mode</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">See the exact same number represented in all 4 bases instantly.</p>
      
      <div className="flex gap-4 mb-8 justify-center">
        <select value={base} onChange={(e) => setBase(Number(e.target.value))} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 outline-none">
          <option value={10}>Base 10</option>
          <option value={2}>Base 2</option>
          <option value={8}>Base 8</option>
          <option value={16}>Base 16</option>
        </select>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`w-48 p-3 text-xl font-mono text-center border-2 rounded-lg outline-none ${!isValid && input ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-800'}`}
          placeholder="Enter number"
        />
      </div>

      <div className="flex flex-col gap-3">
        {results.map(r => {
          const val = parsed && isValid ? format(parsed, r.base) : '---';
          return (
            <div key={r.base} className={`p-4 rounded-xl flex items-center justify-between ${r.color}`}>
              <div className="font-bold w-32">{r.label} ({r.base})</div>
              <div className="font-mono text-xl sm:text-2xl font-bold break-all text-right flex-1">{val}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
