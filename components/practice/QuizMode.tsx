'use client';

import React, { useState, useEffect } from 'react';
import { createQuestion, generateMultipleChoiceOptions, PracticeQuestion } from '../../lib/practice/generator';

type QuizState = 'start' | 'playing' | 'result';

export default function QuizMode() {
  const [state, setState] = useState<QuizState>('start');
  const [questions, setQuestions] = useState<{q: PracticeQuestion, opts: string[]}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
      const q = createQuestion('medium');
      const opts = generateMultipleChoiceOptions(q.answer, q.toBase);
      qs.push({ q, opts });
    }
    setQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setState('playing');
  };

  const handleAnswer = (opt: string) => {
    const currentQ = questions[currentIndex].q;
    if (opt === currentQ.answer) {
      setScore(s => s + 1);
    }
    if (currentIndex < 9) {
      setCurrentIndex(i => i + 1);
    } else {
      setState('result');
    }
  };

  if (state === 'start') {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-3xl font-bold mb-4">Quiz Time!</h2>
        <p className="mb-8 text-gray-600">10 questions. Multiple choice. Test your knowledge.</p>
        <button onClick={startQuiz} className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition">
          Start Quiz
        </button>
      </div>
    );
  }

  if (state === 'result') {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-4xl font-bold mb-4">Quiz Completed!</h2>
        <div className="text-6xl font-black text-blue-600 mb-8">{score}/10</div>
        <p className="mb-8 text-gray-600">Accuracy: {(score / 10) * 100}%</p>
        <button onClick={startQuiz} className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition">
          Play Again
        </button>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto py-6">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentIndex) / 10) * 100}%` }}></div>
      </div>
      <p className="text-gray-500 mb-2">Question {currentIndex + 1} of 10</p>
      
      <h3 className="text-2xl font-bold mb-8 text-center">
        Convert <span className="text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">{current.q.value}</span> (Base {current.q.fromBase}) to Base {current.q.toBase}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {current.opts.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => handleAnswer(opt)}
            className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-mono text-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition text-center break-all"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
