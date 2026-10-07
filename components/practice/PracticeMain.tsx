'use client';

import React, { useState } from 'react';
import PracticeMode from './PracticeMode';
import QuizMode from './QuizMode';
import FlashcardsMode from './FlashcardsMode';
import SpeedRoundMode from './SpeedRoundMode';
import StatsPanel from './StatsPanel';
import DailyChallenge from './DailyChallenge';
import Achievements from './Achievements';

type Tab = 'practice' | 'quiz' | 'flashcards' | 'speed';

export default function PracticeMain() {
  const [activeTab, setActiveTab] = useState<Tab>('practice');

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Daily Challenge */}
      <DailyChallenge />

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          {['practice', 'quiz', 'flashcards', 'speed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`px-4 py-2 rounded-t-lg font-semibold text-sm transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {activeTab === 'practice' && <PracticeMode />}
          {activeTab === 'quiz' && <QuizMode />}
          {activeTab === 'flashcards' && <FlashcardsMode />}
          {activeTab === 'speed' && <SpeedRoundMode />}
        </div>
      </div>

      {/* Stats Panel */}
      <StatsPanel />
      
      {/* Achievements */}
      <Achievements />
    </div>
  );
}
