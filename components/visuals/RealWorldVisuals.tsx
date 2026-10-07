'use client';

import React, { useState } from 'react';

export default function RealWorldVisuals() {
  const [hexColor, setHexColor] = useState('3B82F6'); // Tailwind blue-500
  const [ipPart, setIpPart] = useState('192');
  const [chmod, setChmod] = useState({ r: true, w: true, x: false }); // 6

  // Helpers
  const isValidHex = /^[0-9A-Fa-f]{6}$/.test(hexColor);
  const ipNum = parseInt(ipPart) || 0;
  const ipBin = (ipNum >= 0 && ipNum <= 255) ? ipNum.toString(2).padStart(8, '0') : '00000000';
  
  const chmodOctal = (chmod.r ? 4 : 0) + (chmod.w ? 2 : 0) + (chmod.x ? 1 : 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-4xl mx-auto my-6">
      <h3 className="text-2xl font-bold mb-6 text-center border-b pb-4">Real World Examples</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Hex Color */}
        <div className="p-4 border rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
          <h4 className="font-bold mb-2 text-purple-600">Hex Colors (Base 16)</h4>
          <p className="text-xs text-gray-500 mb-4 text-center">Web colors use 3 pairs of hex digits (R, G, B).</p>
          <div className="flex items-center gap-2 mb-4 w-full">
            <span className="text-xl font-bold text-gray-400">#</span>
            <input 
              type="text" 
              maxLength={6}
              value={hexColor}
              onChange={(e) => setHexColor(e.target.value.toUpperCase())}
              className="w-full p-2 border rounded font-mono text-center uppercase focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-800"
            />
          </div>
          <div 
            className="w-full h-24 rounded-lg shadow-inner transition-colors duration-300" 
            style={{ backgroundColor: isValidHex ? `#${hexColor}` : '#cccccc' }}
          ></div>
        </div>

        {/* Binary IP */}
        <div className="p-4 border rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
          <h4 className="font-bold mb-2 text-blue-600">IP Addresses (Base 2)</h4>
          <p className="text-xs text-gray-500 mb-4 text-center">IPv4 uses four 8-bit numbers (0-255).</p>
          <input 
            type="number" 
            min="0" max="255"
            value={ipPart}
            onChange={(e) => setIpPart(e.target.value)}
            className="w-full p-2 border rounded font-mono text-center focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 mb-4"
          />
          <div className="flex-1 flex flex-col items-center justify-center w-full bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
            <span className="text-xs text-blue-600 font-semibold mb-2">Under the hood:</span>
            <span className="text-2xl font-mono font-bold text-blue-800 dark:text-blue-300 tracking-widest">{ipBin}</span>
          </div>
        </div>

        {/* Linux chmod */}
        <div className="p-4 border rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
          <h4 className="font-bold mb-2 text-green-600">Permissions (Base 8)</h4>
          <p className="text-xs text-gray-500 mb-4 text-center">Linux `chmod` uses Octal (Read=4, Write=2, eXecute=1).</p>
          <div className="flex gap-4 mb-6">
            <label className="flex flex-col items-center cursor-pointer">
              <span className="mb-2 font-mono font-bold text-gray-600 dark:text-gray-400">R (4)</span>
              <input type="checkbox" checked={chmod.r} onChange={(e) => setChmod({...chmod, r: e.target.checked})} className="w-6 h-6 accent-green-600" />
            </label>
            <label className="flex flex-col items-center cursor-pointer">
              <span className="mb-2 font-mono font-bold text-gray-600 dark:text-gray-400">W (2)</span>
              <input type="checkbox" checked={chmod.w} onChange={(e) => setChmod({...chmod, w: e.target.checked})} className="w-6 h-6 accent-green-600" />
            </label>
            <label className="flex flex-col items-center cursor-pointer">
              <span className="mb-2 font-mono font-bold text-gray-600 dark:text-gray-400">X (1)</span>
              <input type="checkbox" checked={chmod.x} onChange={(e) => setChmod({...chmod, x: e.target.checked})} className="w-6 h-6 accent-green-600" />
            </label>
          </div>
          <div className="w-full bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center">
            <span className="text-4xl font-mono font-bold text-green-800 dark:text-green-300">chmod {chmodOctal}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
