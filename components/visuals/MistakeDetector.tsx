'use client';

import React, { useState } from 'react';
import { checkAnswer } from '../../lib/practice/checker';
import { validateInput, parse, format } from '../../lib/convert';

export default function MistakeDetector() {
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [questionVal, setQuestionVal] = useState('45');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCheck = () => {
    const valCheck = validateInput(questionVal, fromBase);
    if (!valCheck.valid) {
      setFeedback('Invalid question value for the selected base.');
      return;
    }

    const parsed = parse(questionVal, fromBase);
    const expected = format(parsed, toBase);

    const res = checkAnswer(userAnswer, expected, fromBase, toBase);
    if (res.correct) {
      setFeedback('Correct! No mistakes found.');
    } else {
      setFeedback(res.hint || `Mistake detected. Expected length: ${expected.length}, Your length: ${userAnswer.length}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-2xl mx-auto my-6 border-l-4 border-red-500">
      <h3 className="text-xl font-bold mb-4">🔍 Smart Mistake Detector</h3>
      <p className="text-gray-500 mb-6 text-sm">Type your manual calculation answer. We will analyze it and tell you where you went wrong!</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-bold mb-1">Convert From (Base)</label>
          <select value={fromBase} onChange={(e) => setFromBase(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700">
            <option value={2}>Base 2</option>
            <option value={8}>Base 8</option>
            <option value={10}>Base 10</option>
            <option value={16}>Base 16</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold mb-1">Number to convert</label>
          <input type="text" value={questionVal} onChange={(e) => setQuestionVal(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700" placeholder="e.g. 45" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold mb-1">Convert To (Base)</label>
        <select value={toBase} onChange={(e) => setToBase(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700">
            <option value={2}>Base 2</option>
            <option value={8}>Base 8</option>
            <option value={10}>Base 10</option>
            <option value={16}>Base 16</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold mb-1">Your Calculated Answer</label>
        <input 
          type="text" 
          value={userAnswer} 
          onChange={(e) => setUserAnswer(e.target.value)} 
          className="w-full p-3 border-2 border-dashed border-red-300 dark:border-red-900/50 rounded-lg text-lg font-mono dark:bg-gray-800" 
          placeholder="Type what you got..." 
        />
      </div>

      <button onClick={handleCheck} className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
        Analyze My Mistake
      </button>

      {feedback && (
        <div className={`mt-4 p-4 rounded-lg font-bold ${feedback.includes('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}
