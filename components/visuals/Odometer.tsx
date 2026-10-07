'use client';

import React, { useState } from 'react';

export default function Odometer() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-2xl mx-auto my-6">
      <h3 className="text-xl font-bold mb-4 text-center">Base Odometer (0 - 31)</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">Slide to see how the same quantity looks across different number systems.</p>
      
      <div className="mb-8 px-4">
        <input 
          type="range" 
          min="0" 
          max="31" 
          value={count} 
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>0</span>
          <span>15</span>
          <span>31</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl flex flex-col items-center justify-center h-32">
          <div className="text-xs text-orange-600 font-semibold mb-2">Decimal (10)</div>
          <div className="text-3xl font-mono font-bold text-orange-800 dark:text-orange-300">{count}</div>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex flex-col items-center justify-center h-32">
          <div className="text-xs text-blue-600 font-semibold mb-2">Binary (2)</div>
          <div className="text-3xl font-mono font-bold text-blue-800 dark:text-blue-300">{count.toString(2).padStart(5, '0')}</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl flex flex-col items-center justify-center h-32">
          <div className="text-xs text-green-600 font-semibold mb-2">Octal (8)</div>
          <div className="text-3xl font-mono font-bold text-green-800 dark:text-green-300">{count.toString(8).padStart(2, '0')}</div>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex flex-col items-center justify-center h-32">
          <div className="text-xs text-purple-600 font-semibold mb-2">Hex (16)</div>
          <div className="text-3xl font-mono font-bold text-purple-800 dark:text-purple-300">{count.toString(16).toUpperCase().padStart(2, '0')}</div>
        </div>
      </div>
    </div>
  );
}
