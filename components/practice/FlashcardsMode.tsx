'use client';

import React, { useState, useEffect } from 'react';
import { createQuestion, PracticeQuestion } from '../../lib/practice/generator';

export default function FlashcardsMode() {
  const [question, setQuestion] = useState<PracticeQuestion | null>(null);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setQuestion(createQuestion('easy'));
    setFlipped(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    nextCard();
  }, []);

  if (!question) return null;

  return (
    <div className="flex flex-col items-center py-6">
      <div className="text-gray-500 mb-6">Tap the card to flip</div>
      
      <div 
        onClick={() => setFlipped(!flipped)}
        className="w-full max-w-sm h-64 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg cursor-pointer transition-all duration-500 transform relative"
        style={{ perspective: '1000px' }}
      >
        {/* Inner rotating container could be added for 3D flip, keeping it simple toggle for now */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {!flipped ? (
            <>
              <span className="text-gray-500 text-sm font-semibold mb-2">Convert to Base {question.toBase}</span>
              <span className="text-4xl font-mono font-bold text-gray-800 dark:text-white">{question.value}</span>
              <span className="text-gray-400 mt-2 font-mono">Base {question.fromBase}</span>
            </>
          ) : (
            <>
              <span className="text-gray-500 text-sm font-semibold mb-2">Answer</span>
              <span className="text-4xl font-mono font-bold text-blue-600 dark:text-blue-400">{question.answer}</span>
            </>
          )}
        </div>
      </div>

      {flipped && (
        <div className="flex gap-4 mt-8 w-full max-w-sm">
          <button onClick={nextCard} className="flex-1 py-3 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 transition">
            Review Again
          </button>
          <button onClick={nextCard} className="flex-1 py-3 bg-green-100 text-green-700 rounded-xl font-bold hover:bg-green-200 transition">
            I Knew It!
          </button>
        </div>
      )}
    </div>
  );
}
