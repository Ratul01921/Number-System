'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useLearnConfig } from '../../hooks/useLearnConfig';
import Glossary from '../Glossary';

const CONTENT = {
  en: {
    what_is: {
      title: 'What is a Number System?',
      standard: 'A <Glossary term="base">number system</Glossary> is a writing system for expressing numbers. It represents numbers of a given set using digits or other symbols in a consistent manner. The most common is the Decimal (Base 10) system.',
      eli10: 'Imagine you have to count your toys. If you only have 10 fingers, you count in groups of 10. That is the Decimal system! If you were an alien with 8 fingers, you would count in groups of 8 (Octal). It is just how we group things to count them!'
    },
    systems: [
      {
        id: 'bin',
        name: 'Binary (Base 2)',
        standard: 'Uses only 2 digits: 0 and 1. It is the language of computers, representing on/off states of transistors.',
        eli10: 'Like a light switch! It can only be OFF (0) or ON (1). Computers are just millions of tiny light switches.',
      },
      {
        id: 'oct',
        name: 'Octal (Base 8)',
        standard: 'Uses 8 digits: 0-7. Often used as a shorthand for binary because exactly 3 bits make 1 octal digit.',
        eli10: 'Imagine counting but skipping 8 and 9! Every time you reach 7, you start over at 10. It is a quick way to group 3 light switches together.',
      },
      {
        id: 'dec',
        name: 'Decimal (Base 10)',
        standard: 'Uses 10 digits: 0-9. The standard system used by humans, based on our 10 fingers.',
        eli10: 'The normal way you count every day! 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. Nothing special here, just good old math.',
      },
      {
        id: 'hex',
        name: 'Hexadecimal (Base 16)',
        standard: 'Uses 16 digits: 0-9 and A-F. Used extensively in computing (like color codes) because exactly 4 bits make 1 hex digit.',
        eli10: 'What if you had 16 fingers? You would run out of numbers at 9, so you use letters! A=10, B=11, C=12, D=13, E=14, F=15.',
      }
    ]
  }
};

export default function LearnSection() {
  const { lang } = useLanguage();
  const { eli10, setEli10 } = useLearnConfig();
  const [openAccordion, setOpenAccordion] = useState<string | null>('what_is');

  // Fallback to English if key missing
  const data = CONTENT['en'];

  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4">
      
      {/* ELI10 Toggle Header */}
      <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl mb-8 border border-blue-200 dark:border-blue-800">
        <div>
          <h3 className="font-bold text-blue-800 dark:text-blue-300">
            Learning Mode
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Toggle "Explain like I'm 10" for simpler analogies.
          </p>
        </div>
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={eli10} onChange={() => setEli10(!eli10)} />
            <div className={`block w-14 h-8 rounded-full transition-colors ${eli10 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${eli10 ? 'transform translate-x-6' : ''}`}></div>
          </div>
          <span className="ml-3 font-bold text-gray-700 dark:text-gray-200">👶 ELI10</span>
        </label>
      </div>

      <div className="space-y-4">
        {/* What is a number system */}
        <div className="border dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          <button 
            onClick={() => setOpenAccordion(openAccordion === 'what_is' ? null : 'what_is')}
            className="w-full text-left px-6 py-4 font-bold text-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition flex justify-between items-center"
          >
            {data.what_is.title}
            <span className="text-gray-400">{openAccordion === 'what_is' ? '−' : '+'}</span>
          </button>
          {openAccordion === 'what_is' && (
            <div className="p-6 text-gray-700 dark:text-gray-300 animate-fade-in text-lg leading-relaxed">
              {eli10 ? data.what_is.eli10 : <Glossary term="number system">{data.what_is.standard}</Glossary>}
            </div>
          )}
        </div>

        {/* The 4 Systems */}
        <div className="border dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          <button 
            onClick={() => setOpenAccordion(openAccordion === 'systems' ? null : 'systems')}
            className="w-full text-left px-6 py-4 font-bold text-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition flex justify-between items-center"
          >
            The 4 Main Systems
            <span className="text-gray-400">{openAccordion === 'systems' ? '−' : '+'}</span>
          </button>
          {openAccordion === 'systems' && (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
              {data.systems.map(sys => (
                <div key={sys.id} className="p-4 border rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <h4 className="font-bold text-lg mb-2">{sys.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{eli10 ? sys.eli10 : sys.standard}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
