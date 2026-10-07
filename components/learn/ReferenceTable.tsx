'use client';

import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export default function ReferenceTable() {
  const { lang } = useLanguage();

  const title = 'Quick Reference Table (0-15)';

  const rows = Array.from({ length: 16 }).map((_, i) => ({
    dec: i,
    bin: i.toString(2).padStart(4, '0'),
    oct: i.toString(8),
    hex: i.toString(16).toUpperCase(),
  }));

  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border dark:border-gray-700">
        <h3 className="text-xl font-bold p-4 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700 text-center">
          {title}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm md:text-base">
            <thead className="bg-gray-100 dark:bg-gray-700/50">
              <tr>
                <th className="p-3 text-orange-600 dark:text-orange-400 font-bold">Decimal (Base 10)</th>
                <th className="p-3 text-blue-600 dark:text-blue-400 font-bold">Binary (Base 2)</th>
                <th className="p-3 text-green-600 dark:text-green-400 font-bold">Octal (Base 8)</th>
                <th className="p-3 text-purple-600 dark:text-purple-400 font-bold">Hex (Base 16)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="p-3 font-mono font-bold text-gray-800 dark:text-gray-200">{r.dec}</td>
                  <td className="p-3 font-mono text-gray-600 dark:text-gray-400">{r.bin}</td>
                  <td className="p-3 font-mono text-gray-600 dark:text-gray-400">{r.oct}</td>
                  <td className="p-3 font-mono text-gray-600 dark:text-gray-400">{r.hex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
