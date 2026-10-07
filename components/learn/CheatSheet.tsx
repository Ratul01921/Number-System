'use client';

import React from 'react';

export default function CheatSheet() {
  const powers = Array.from({ length: 11 }).map((_, i) => ({
    power: i,
    val: Math.pow(2, i)
  }));

  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 md:p-8 shadow-sm border border-blue-100 dark:border-blue-800">
        <h3 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-100 flex items-center gap-2">
          <span>⚡</span> Exam Quick Cheat Sheet
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Fast Conversions */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">How to convert FAST</h4>
            <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">»</span>
                <div>
                  <strong>Bin → Oct:</strong> Group bits by 3 from right to left.
                  <div className="text-xs font-mono text-gray-500 mt-1">10 110 = 2 6 = 26₈</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">»</span>
                <div>
                  <strong>Bin → Hex:</strong> Group bits by 4 from right to left.
                  <div className="text-xs font-mono text-gray-500 mt-1">1101 0110 = D 6 = D6₁₆</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">»</span>
                <div>
                  <strong>Any → Dec:</strong> Multiply by powers of the base.
                  <div className="text-xs font-mono text-gray-500 mt-1">101₂ = 1×4 + 0×2 + 1×1 = 5₁₀</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">»</span>
                <div>
                  <strong>Dec → Any:</strong> Divide by the base, read remainders bottom-up.
                </div>
              </li>
            </ul>
          </div>

          {/* Powers of 2 */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Powers of 2 (Memorize!)</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {powers.map(p => (
                <div key={p.power} className="flex justify-between border-b border-blue-200/50 dark:border-blue-800/50 py-1">
                  <span className="font-mono text-gray-500">2<sup className="text-[10px]">{p.power}</sup></span>
                  <span className="font-mono font-bold">{p.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
