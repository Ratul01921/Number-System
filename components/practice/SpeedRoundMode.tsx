'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createQuestion, PracticeQuestion } from '../../lib/practice/generator';
import { checkAnswer } from '../../lib/practice/checker';

export default function SpeedRoundMode() {
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState<PracticeQuestion | null>(null);
  const [input, setInput] = useState('');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (playing && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaying(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setPlaying(true);
    nextQuestion();
  };

  const nextQuestion = () => {
    setQuestion(createQuestion('easy'));
    setInput('');
  };

  const handleInput = (val: string) => {
    setInput(val);
    if (!question) return;
    const res = checkAnswer(val, question.answer, question.fromBase, question.toBase);
    if (res.correct) {
      setScore(s => s + 1);
      nextQuestion();
    }
  };

  if (!playing && timeLeft === 60) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-3xl font-bold mb-4">Speed Round</h2>
        <p className="mb-8 text-gray-600 text-center">Answer as many questions as you can in 60 seconds.<br/>Answers check automatically as you type!</p>
        <button onClick={startGame} className="px-8 py-3 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition">
          Start 60s Timer
        </button>
      </div>
    );
  }

  if (!playing && timeLeft === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <h2 className="text-4xl font-bold mb-4">Time&apos;s Up!</h2>
        <p className="text-2xl mb-2">You answered</p>
        <div className="text-6xl font-black text-red-600 mb-8">{score}</div>
        <button onClick={startGame} className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-sm mx-auto py-6">
      <div className="flex justify-between w-full mb-8">
        <div className="text-xl font-bold text-gray-500">Score: <span className="text-blue-600">{score}</span></div>
        <div className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-gray-500'}`}>
          Time: {timeLeft}s
        </div>
      </div>

      {question && (
        <>
          <h3 className="text-2xl font-bold mb-6 text-center">
            Convert <span className="text-red-600 font-mono bg-red-50 px-2 py-1 rounded">{question.value}</span> (Base {question.fromBase})
            <br /> to Base {question.toBase}
          </h3>

          <input 
            type="text" 
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            className="w-full text-center p-4 text-3xl font-mono border-4 border-gray-300 dark:border-gray-600 rounded-xl focus:border-red-500 outline-none dark:bg-gray-800"
            placeholder="Type answer..."
            autoFocus
          />
        </>
      )}
    </div>
  );
}
