'use client';

import React, { useState, useEffect } from 'react';

const ACHIEVEMENTS_DATA = [
  { id: 'first_conv', title: 'First Steps', desc: 'Complete your first conversion practice.', icon: '👶' },
  { id: 'streak_5', title: 'On Fire', desc: 'Reach a streak of 5 correct answers.', icon: '🔥' },
  { id: 'binary_master', title: 'Binary Master', desc: 'Score 100% on a Quiz.', icon: '💻' },
  { id: 'daily_player', title: 'Dedicated', desc: 'Complete a Daily Challenge.', icon: '📅' },
];

export default function Achievements() {
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    // In a real app, this would be reactive. For now, read from localStorage.
    const statsStr = localStorage.getItem('ns_practice_stats');
    const dailyStreak = localStorage.getItem('ns_daily_streak');
    const u: string[] = [];

    if (statsStr) {
      const stats = JSON.parse(statsStr);
      if (stats.attempted > 0) u.push('first_conv');
      if (stats.bestStreak >= 5) u.push('streak_5');
      if (stats.correct >= 10 && stats.attempted >= 10 && (stats.correct/stats.attempted === 1)) u.push('binary_master');
    }
    if (dailyStreak && parseInt(dailyStreak) > 0) {
      u.push('daily_player');
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUnlocked(u);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-8">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Achievements</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ACHIEVEMENTS_DATA.map((ach) => {
          const isUnlocked = unlocked.includes(ach.id);
          return (
            <div 
              key={ach.id} 
              className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                isUnlocked 
                  ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 opacity-50 grayscale'
              }`}
            >
              <div className="text-4xl mb-2">{ach.icon}</div>
              <h4 className="font-bold text-sm mb-1">{ach.title}</h4>
              <p className="text-xs text-gray-500">{ach.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
