'use client';

import React, { useState } from 'react';

export default function InteractiveBitToggler() {
  const [bits, setBits] = useState<number[]>(Array(8).fill(0));

  const toggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);
  };

  // Bits are stored [msb, ..., lsb], so index 0 is 2^7
  let decimalValue = 0;
  bits.forEach((b, i) => {
    if (b) decimalValue += Math.pow(2, 7 - i);
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-2xl mx-auto my-6">
      <h3 className="text-xl font-bold mb-4 text-center">Interactive Bit Toggler</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">Click the bits to toggle them on or off and see how the values change!</p>
      
      <div className="flex justify-center gap-1 sm:gap-2 mb-8 overflow-x-auto">
        {bits.map((b, i) => {
          const weight = Math.pow(2, 7 - i);
          return (
            <div key={i} className="flex flex-col items-center">
              <button 
                onClick={() => toggleBit(i)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-bold text-xl sm:text-2xl transition-all transform hover:scale-105 ${
                  b === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}
              >
                {b}
              </button>
              <div className={`mt-2 text-xs font-mono ${b === 1 ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-400'}`}>
                {weight}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
          <div className="text-xs text-orange-600 font-semibold mb-1">Decimal</div>
          <div className="text-2xl font-mono text-orange-800 dark:text-orange-300">{decimalValue}</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
          <div className="text-xs text-green-600 font-semibold mb-1">Octal</div>
          <div className="text-2xl font-mono text-green-800 dark:text-green-300">{decimalValue.toString(8)}</div>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
          <div className="text-xs text-purple-600 font-semibold mb-1">Hexadecimal</div>
          <div className="text-2xl font-mono text-purple-800 dark:text-purple-300">{decimalValue.toString(16).toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
}
