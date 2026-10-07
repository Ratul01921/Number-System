'use client';

import React, { useState, useEffect } from 'react';
import { createQuestion, PracticeQuestion } from '../../lib/practice/generator';
import { checkAnswer } from '../../lib/practice/checker';

export default function DailyChallenge() {
  const [question, setQuestion] = useState<PracticeQuestion | null>(null);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; hint?: string } | null>(null);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    // Generate a question based on today's date
    const today = new Date().toISOString().split('T')[0];
    
    // Seeded random replacement for daily consistency
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed += today.charCodeAt(i);
    }
    
    const bases = [2, 8, 10, 16];
    const fromBase = bases[seed % 4];
    const toBase = bases[(seed + 1) % 4];
    
    // Create a dummy question for daily
    const q = createQuestion('medium', { from: fromBase, to: toBase });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuestion(q);
    
    // Check if already completed today
    const lastCompleted = localStorage.getItem('ns_daily_last_completed');
    if (lastCompleted === today) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompleted(true);
    }
  }, []);

  const handleCheck = () => {
    if (!question) return;
    const res = checkAnswer(input, question.answer, question.fromBase, question.toBase);
    setFeedback({ correct: res.correct, hint: res.hint });
    
    if (res.correct) {
      setCompleted(true);
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('ns_daily_last_completed', today);
      
      // Update streak
      const currentStreak = parseInt(localStorage.getItem('ns_daily_streak') || '0');
      localStorage.setItem('ns_daily_streak', (currentStreak + 1).toString());
    }
  };

  if (!question) return null;

  if (completed) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-2xl shadow border border-yellow-200 dark:border-yellow-700/50 text-center mb-8">
        <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-500 mb-2">⭐ Daily Challenge Complete!</h3>
        <p className="text-gray-600 dark:text-gray-300">Great job! Come back tomorrow for a new challenge.</p>
        <p className="text-sm font-bold text-yellow-600 mt-2">
          Streak: {localStorage.getItem('ns_daily_streak') || '1'} days
        </p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-2xl shadow border border-yellow-200 dark:border-yellow-700/50 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-500 mb-2">📅 Daily Challenge</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Convert <span className="font-mono font-bold">{question.value}</span> (Base {question.fromBase}) to Base {question.toBase}
          </p>
        </div>
        <div className="flex-1 w-full max-w-sm flex gap-2">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className="w-full p-2 border border-yellow-300 rounded font-mono focus:outline-none focus:ring-2 focus:ring-yellow-500" 
            placeholder="Your answer"
          />
          <button onClick={handleCheck} className="px-4 py-2 bg-yellow-600 text-white rounded font-bold hover:bg-yellow-700">Submit</button>
        </div>
      </div>
      
      {feedback && (
        <div className={`mt-4 p-2 text-center rounded font-bold ${feedback.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback.correct ? 'Correct! 🎉' : feedback.hint}
        </div>
      )}
    </div>
  );
}
