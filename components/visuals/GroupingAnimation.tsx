'use client';

import React, { useState } from 'react';

export default function GroupingAnimation() {
  const [binary, setBinary] = useState('11010110');
  const [toBase, setToBase] = useState(16);

  const groupSize = toBase === 16 ? 4 : 3;
  
  // Pad binary to multiple of groupSize
  const paddedLength = Math.ceil(binary.length / groupSize) * groupSize;
  const paddedBin = binary.padStart(paddedLength, '0');
  
  const groups = [];
  for (let i = 0; i < paddedBin.length; i += groupSize) {
    groups.push(paddedBin.slice(i, i + groupSize));
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-4xl mx-auto my-6">
      <h3 className="text-xl font-bold mb-4 text-center">Binary Grouping Visualizer</h3>
      <p className="text-gray-500 text-center mb-6 text-sm">See how bits group into chunks of {groupSize} to form Base {toBase} digits.</p>
      
      <div className="flex gap-4 mb-8 justify-center">
        <input 
          type="text" 
          value={binary} 
          onChange={(e) => setBinary(e.target.value.replace(/[^01]/g, ''))} 
          className="w-48 p-2 border rounded font-mono text-center dark:bg-gray-700 outline-none"
          placeholder="Enter binary..."
        />
        <select value={toBase} onChange={(e) => setToBase(Number(e.target.value))} className="p-2 border rounded dark:bg-gray-700 outline-none">
          <option value={8}>To Octal (Base 8)</option>
          <option value={16}>To Hex (Base 16)</option>
        </select>
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Original string */}
        <div className="text-2xl font-mono tracking-widest text-gray-400">
          {binary || '0'}
        </div>

        {/* Grouped blocks */}
        <div className="flex gap-4 flex-wrap justify-center">
          {binary && groups.map((g, i) => {
            const decVal = parseInt(g, 2);
            const hexVal = decVal.toString(toBase).toUpperCase();
            const colors = ['bg-blue-100 dark:bg-blue-900/40', 'bg-purple-100 dark:bg-purple-900/40', 'bg-green-100 dark:bg-green-900/40', 'bg-orange-100 dark:bg-orange-900/40'];
            const color = colors[i % colors.length];

            return (
              <div key={i} className={`flex flex-col items-center p-3 rounded-lg ${color} transition-all transform hover:scale-110`}>
                <div className="text-xl font-mono font-bold tracking-widest mb-2">{g}</div>
                <div className="text-gray-500 text-xs mb-1">↓</div>
                <div className="text-2xl font-bold font-mono">{hexVal}</div>
              </div>
            );
          })}
        </div>

        {/* Final result */}
        {binary && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <span className="text-gray-500 mr-2">Result:</span>
            <span className="text-3xl font-mono font-bold">
              {groups.map(g => parseInt(g, 2).toString(toBase).toUpperCase()).join('')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
