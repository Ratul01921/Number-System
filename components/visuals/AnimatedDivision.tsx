'use client';

import React, { useState, useEffect } from 'react';

export default function AnimatedDivision() {
  const [input, setInput] = useState(45);
  const [base, setBase] = useState(2);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Generate steps
  const stepsData = [];
  let current = input;
  while (current > 0) {
    const rem = current % base;
    const next = Math.floor(current / base);
    stepsData.push({ val: current, rem, base });
    current = next;
  }
  if (input === 0) stepsData.push({ val: 0, rem: 0, base });

  const totalSteps = stepsData.length;

  useEffect(() => {
    let timer: any;
    if (playing && step < totalSteps) {
      timer = setTimeout(() => setStep(s => s + 1), 1000);
    } else if (step >= totalSteps) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [playing, step, totalSteps]);

  const handleReset = () => {
    setStep(0);
    setPlaying(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-4xl mx-auto my-6">
      <h3 className="text-xl font-bold mb-4 text-center">Animated Division (Decimal to Base)</h3>
      <div className="flex gap-4 mb-6 justify-center">
        <input type="number" value={input} onChange={(e) => { setInput(parseInt(e.target.value)||0); handleReset(); }} className="w-24 p-2 border rounded text-center dark:bg-gray-700 outline-none" />
        <select value={base} onChange={(e) => { setBase(Number(e.target.value)); handleReset(); }} className="p-2 border rounded dark:bg-gray-700 outline-none">
          <option value={2}>Base 2</option>
          <option value={8}>Base 8</option>
          <option value={16}>Base 16</option>
        </select>
      </div>

      <div className="flex gap-2 justify-center mb-8">
        <button onClick={() => setStep(Math.max(0, step - 1))} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300">Prev</button>
        <button onClick={() => setPlaying(!playing)} className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">{playing ? 'Pause' : 'Play'}</button>
        <button onClick={() => setStep(Math.min(totalSteps, step + 1))} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300">Next</button>
        <button onClick={handleReset} className="px-4 py-2 text-red-500 hover:bg-red-50 rounded">Reset</button>
      </div>

      <div className="flex flex-col items-center gap-2 font-mono text-xl">
        {stepsData.slice(0, step).map((s, i) => (
          <div key={i} className="flex items-center gap-4 animate-fade-in-up">
            <div className="w-8 text-right text-gray-500">{s.base}</div>
            <div className="border-l-2 border-b-2 border-gray-400 pl-2 pb-1 w-16 text-center">{s.val}</div>
            <div className="text-blue-600 font-bold ml-4">Rem: {s.rem.toString(base).toUpperCase()}</div>
          </div>
        ))}
        {step > 0 && step < totalSteps && (
          <div className="flex items-center gap-4 opacity-50">
            <div className="w-8 text-right text-gray-500">{base}</div>
            <div className="border-l-2 border-b-2 border-gray-400 pl-2 pb-1 w-16 text-center">...</div>
          </div>
        )}
        {step >= totalSteps && (
          <div className="mt-6 flex flex-col items-center text-green-600 animate-fade-in">
            <div className="text-sm font-sans text-gray-500 mb-2">Read bottom to top ⬆️</div>
            <div className="text-3xl font-bold bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-xl">
              {stepsData.map(s => s.rem.toString(base).toUpperCase()).reverse().join('')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
