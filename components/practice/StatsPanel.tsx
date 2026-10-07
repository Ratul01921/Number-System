'use client';

import React, { useState, useEffect } from 'react';

// A simple local storage based stats tracker for demonstration.
// In a full app, we would have a context or custom hook syncing this.
export default function StatsPanel() {
  const [stats, setStats] = useState({
    attempted: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0,
  });

  useEffect(() => {
    const s = localStorage.getItem('ns_practice_stats');
    if (s) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStats(JSON.parse(s));
    }
  }, []);

  const resetStats = () => {
    if (confirm('Are you sure you want to reset all your progress?')) {
      const empty = { attempted: 0, correct: 0, streak: 0, bestStreak: 0 };
      setStats(empty);
      localStorage.setItem('ns_practice_stats', JSON.stringify(empty));
    }
  };

  const accuracy = stats.attempted === 0 ? 0 : Math.round((stats.correct / stats.attempted) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Your Stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
          <div className="text-sm text-gray-500 mb-1">Attempted</div>
          <div className="text-3xl font-black text-gray-800 dark:text-white">{stats.attempted}</div>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-center">
          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Accuracy</div>
          <div className="text-3xl font-black text-blue-700 dark:text-blue-300">{accuracy}%</div>
        </div>
        <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-center">
          <div className="text-sm text-orange-600 dark:text-orange-400 mb-1">Current Streak</div>
          <div className="text-3xl font-black text-orange-700 dark:text-orange-300">{stats.streak}</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-center">
          <div className="text-sm text-green-600 dark:text-green-400 mb-1">Best Streak</div>
          <div className="text-3xl font-black text-green-700 dark:text-green-300">{stats.bestStreak}</div>
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={resetStats} className="text-sm text-red-500 hover:underline">
          Reset Progress
        </button>
      </div>
    </div>
  );
}
