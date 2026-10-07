'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { validateInput, parse, format, convertNumber } from '../lib/convert';
import { generateSteps, StepResult } from '../lib/steps';
import StepsView from './StepsView';
import BitStrip from './BitStrip';

import { useSearchParams, useRouter } from 'next/navigation';

const BASES = [
  { value: 2, label: 'Binary (2)', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  { value: 8, label: 'Octal (8)', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  { value: 10, label: 'Decimal (10)', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
  { value: 16, label: 'Hexadecimal (16)', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
];

export default function Converter() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [input, setInput] = useState(searchParams.get('v') || '45');
  const [fromBase, setFromBase] = useState(Number(searchParams.get('from')) || 10);
  const [toBase, setToBase] = useState(Number(searchParams.get('to')) || 2);

  
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<StepResult[]>([]);
  const [parsedNum, setParsedNum] = useState<any>(null);

  // All 4 results
  const [results, setResults] = useState({
    bin: '',
    oct: '',
    dec: '',
    hex: ''
  });

  function updateConversion(val: string, from: number, to: number) {
    const validation = validateInput(val, from);
    if (!validation.valid) {
      setError(validation.error || 'Invalid input');
      setSteps([]);
      setParsedNum(null);
      setResults({ bin: '', oct: '', dec: '', hex: '' });
      return;
    }

    setError(null);
    const parsed = parse(val, from);
    setParsedNum(parsed);

    if (parsed) {
      setResults({
        bin: format(parsed, 2),
        oct: format(parsed, 8),
        dec: format(parsed, 10),
        hex: format(parsed, 16)
      });
      setSteps(generateSteps(val, parsed, from, to));
    } else {
      setSteps([]);
      setResults({ bin: '', oct: '', dec: '', hex: '' });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateConversion(input, fromBase, toBase);
  }, [input, fromBase, toBase]);



  const handleSwap = () => {
    setFromBase(toBase);
    setToBase(fromBase);
    // Let input be the converted output
    if (parsedNum) {
      setInput(format(parsedNum, toBase));
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast here
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 border border-white/20 dark:border-gray-700/50">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Controls & Input */}
          <div className="flex-1 w-full lg:w-1/2 flex flex-col gap-6">
            
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">From Base</label>
                <select 
                  value={fromBase}
                  onChange={(e) => setFromBase(Number(e.target.value))}
                  className="w-full p-3 text-base bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm hover:border-gray-300 dark:hover:border-gray-600 appearance-none"
                >
                  {BASES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>

              <button 
                onClick={handleSwap}
                className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
                title={t('swap' as any)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>

              <div className="flex-1 relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">To Base</label>
                <select 
                  value={toBase}
                  onChange={(e) => setToBase(Number(e.target.value))}
                  className="w-full p-3 text-base bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm hover:border-gray-300 dark:hover:border-gray-600 appearance-none"
                >
                  {BASES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('input_placeholder' as any)}
                className={`w-full p-6 text-3xl md:text-4xl font-mono text-center bg-gray-50/50 dark:bg-gray-900/50 border-2 rounded-2xl outline-none transition-all shadow-inner placeholder:text-gray-300 dark:placeholder:text-gray-700 ${
                  error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                }`}
              />
              {error && <p className="text-red-500 text-center mt-3 font-medium animate-pulse">{error}</p>}
            </div>

            {/* Bit Strip inside left column */}
            {parsedNum && <div className="mt-4"><BitStrip value={parsedNum.intPart} /></div>}

            <div className="flex justify-center gap-4 mt-auto pt-4">
              <button 
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.set('v', input);
                  url.searchParams.set('from', fromBase.toString());
                  url.searchParams.set('to', toBase.toString());
                  navigator.clipboard.writeText(url.toString());
                  alert('Share link copied to clipboard!');
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share
              </button>
              
              <button 
                onClick={() => {
                  const text = `Converted ${input} (Base ${fromBase}):\nBinary: ${results.bin}\nOctal: ${results.oct}\nDecimal: ${results.dec}\nHex: ${results.hex}`;
                  navigator.clipboard.writeText(text);
                  alert('Copied results as text!');
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Copy Text
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 2x2 Result Cards Grid */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {BASES.map((b) => {
                let res = '';
                if (b.value === 2) res = results.bin;
                if (b.value === 8) res = results.oct;
                if (b.value === 10) res = results.dec;
                if (b.value === 16) res = results.hex;
                
                const getBorderColor = () => {
                  if (b.value === 2) return 'border-l-blue-500';
                  if (b.value === 8) return 'border-l-green-500';
                  if (b.value === 10) return 'border-l-orange-500';
                  return 'border-l-purple-500';
                };
                
                return (
                  <div key={b.value} className={`relative p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between bg-white dark:bg-gray-800/50 hover:shadow-md transition-shadow overflow-hidden group border-l-4 ${getBorderColor()}`}>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${b.color}`}>
                        {b.label}
                      </span>
                      <button onClick={() => handleCopy(res)} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      </button>
                    </div>
                    <div className="font-mono text-2xl break-all font-bold text-gray-900 dark:text-gray-100 min-h-[4rem] flex items-center">
                      {res || <span className="text-gray-300 dark:text-gray-600">-</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>

      {/* Steps View */}
      {parsedNum && <StepsView steps={steps} />}
      
    </div>
  );
}
