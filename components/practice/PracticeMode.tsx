'use client';

import React, { useState, useEffect } from 'react';
import { createQuestion, PracticeQuestion } from '../../lib/practice/generator';
import { checkAnswer } from '../../lib/practice/checker';
import { useLanguage } from '../../hooks/useLanguage';
import StepsView from '../StepsView';
import { parse } from '../../lib/convert';
import { generateSteps } from '../../lib/steps';

export default function PracticeMode() {
  const { t } = useLanguage();
  const [question, setQuestion] = useState<PracticeQuestion | null>(null);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; hint?: string } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy'|'medium'|'hard'>('easy');

  const generateNewQuestion = () => {
    setQuestion(createQuestion(difficulty));
    setInput('');
    setFeedback(null);
    setShowSolution(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const handleCheck = () => {
    if (!question) return;
    const res = checkAnswer(input, question.answer, question.fromBase, question.toBase);
    setFeedback({ correct: res.correct, hint: res.hint });
    
    // Update stats logic could go here
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 self-end">
        <label className="mr-2 text-sm text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider">Difficulty</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)} className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className={`w-full max-w-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm transition-all duration-300 ${feedback?.correct === true ? 'ring-4 ring-green-400 shadow-green-100 dark:shadow-none' : feedback?.correct === false ? 'ring-4 ring-red-400 shadow-red-100 dark:shadow-none animate-pulse' : ''}`}>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Convert to Base {question.toBase}</h2>
          <div className="text-5xl font-mono font-bold mt-4 mb-2 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {question.value}
          </div>
          <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider border border-gray-200 dark:border-gray-600">
            Base {question.fromBase}
          </span>
        </div>

        <div className="mb-6">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            className={`w-full text-center p-4 text-3xl font-mono border-2 rounded-xl outline-none bg-gray-50 dark:bg-gray-900 transition-colors ${
              feedback?.correct === true ? 'border-green-500 text-green-700 dark:text-green-400 focus:border-green-500' :
              feedback?.correct === false ? 'border-red-500 text-red-700 dark:text-red-400 focus:border-red-500' :
              'border-gray-200 dark:border-gray-700 focus:border-blue-500'
            }`}
            placeholder="?"
            autoFocus
          />
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleCheck}
            className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition hover:-translate-y-1 shadow-md hover:shadow-lg active:translate-y-0"
          >
            Check Answer
          </button>
          <button 
            onClick={generateNewQuestion}
            className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition shadow-sm active:scale-95"
          >
            Skip & Next
          </button>
        </div>

        {feedback && (
          <div className={`mt-6 p-4 rounded-xl text-center font-bold text-lg border ${feedback.correct ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'}`}>
            {feedback.correct ? '🎉 Correct! Brilliant work!' : feedback.hint}
          </div>
        )}

        {(!feedback?.correct && feedback !== null) && (
          <div className="text-center mt-4">
            <button onClick={() => setShowSolution(!showSolution)} className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition">
              {showSolution ? 'Hide Solution' : 'Stuck? View Solution'}
            </button>
          </div>
        )}
      </div>

      {showSolution && (
        <div className="w-full max-w-lg mt-8">
          <StepsView steps={generateSteps(question.value, parse(question.value, question.fromBase)!, question.fromBase, question.toBase)} />
        </div>
      )}
    </div>
  );
}
