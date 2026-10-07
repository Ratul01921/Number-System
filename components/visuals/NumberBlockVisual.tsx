'use client';

import React, { useState } from 'react';

export default function NumberBlockVisual() {
  const [value, setValue] = useState(45);
  const [base, setBase] = useState(8);

  const safeValue = Math.max(0, Math.min(255, value));
  
  // Calculate blocks
  // For 45 in base 8: 45 / 8 = 5, rem 5.
  // We'll just do a 2-level grouping for simplicity (since value <= 255)
  const groups = Math.floor(safeValue / base);
  const ones = safeValue % base;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-4xl mx-auto my-6">
      <h3 className="text-xl font-bold mb-4 text-center">Number Block Visualizer</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">See how numbers are physically grouped in different bases.</p>
      
      <div className="flex gap-4 mb-8 justify-center items-center">
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Decimal Value (0-255):</label>
        <input 
          type="number" 
          min="0" max="255"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value) || 0)}
          className="w-24 p-2 border rounded-lg text-center font-mono dark:bg-gray-700 outline-none"
        />
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-4">Base Grouping:</label>
        <select value={base} onChange={(e) => setBase(Number(e.target.value))} className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 outline-none">
          <option value={2}>Base 2</option>
          <option value={8}>Base 8</option>
          <option value={10}>Base 10</option>
          <option value={16}>Base 16</option>
        </select>
      </div>

      <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6 text-lg">
          <span className="font-bold text-blue-600">{safeValue}</span> = <span className="font-bold text-purple-600">{groups}</span> groups of {base} + <span className="font-bold text-green-600">{ones}</span> ones
        </div>
        
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Groups */}
          {Array.from({ length: groups }).map((_, i) => (
            <div key={`g-${i}`} className="p-2 border-2 border-purple-300 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex flex-wrap gap-1 w-[120px] justify-center items-center">
              {Array.from({ length: base }).map((_, j) => (
                <div key={`g-${i}-b-${j}`} className="w-3 h-3 bg-purple-500 rounded-sm"></div>
              ))}
            </div>
          ))}

          {/* Ones */}
          <div className="p-2 border-2 border-green-300 bg-green-100 dark:bg-green-900/40 rounded-lg flex flex-wrap gap-1 justify-center items-center h-fit">
            {Array.from({ length: ones }).map((_, j) => (
              <div key={`o-${j}`} className="w-3 h-3 bg-green-500 rounded-sm"></div>
            ))}
            {ones === 0 && <span className="text-xs text-green-700 opacity-50 px-2">0 ones</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
