'use client';

import React from 'react';

export default function BitStrip({ value }: { value: bigint }) {
  // We'll show an 8-bit strip (128 down to 1), but if the value is larger, we could show more.
  // The prompt asks for 128 64 32 16 8 4 2 1. Let's strictly show 8 bits.
  // If the value is larger, we show the lowest 8 bits, or expand it?
  // Expanding it to fit the number is better.
  let bitCount = 8;
  let tempValue = value < 0n ? -value : value;
  
  // Find out how many bits we need (in multiples of 8)
  while (tempValue >= 1n << BigInt(bitCount)) {
    bitCount += 8;
    // Cap at 32 bits for display sanity
    if (bitCount >= 32) break;
  }

  const bits = [];
  for (let i = bitCount - 1; i >= 0; i--) {
    const bitWeight = 1n << BigInt(i);
    const isOn = (tempValue & bitWeight) !== 0n;
    bits.push({ weight: bitWeight.toString(), isOn, index: i });
  }

  const rows = [];
  for (let i = 0; i < bits.length; i += 8) {
    rows.push(bits.slice(i, i + 8));
  }

  return (
    <div className="flex flex-col items-center my-6 w-full max-w-full space-y-4">
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="flex gap-1 sm:gap-2 flex-wrap justify-center overflow-x-auto max-w-full">
          {row.map((b) => (
            <div key={b.index} className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center font-bold text-sm transition-colors duration-300 ${b.isOn ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                {b.isOn ? '1' : '0'}
              </div>
              <div className="text-[10px] sm:text-xs mt-1 text-gray-500 dark:text-gray-400 font-mono">
                {b.weight}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
