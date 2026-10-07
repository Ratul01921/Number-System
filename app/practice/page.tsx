'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';

import DailyChallenge from '../../components/practice/DailyChallenge';
import StatsPanel from '../../components/practice/StatsPanel';
import Achievements from '../../components/practice/Achievements';

const PracticeMode = dynamic(() => import('../../components/practice/PracticeMode'), { loading: () => <p className="p-10 animate-pulse text-center">Loading...</p> });
const QuizMode = dynamic(() => import('../../components/practice/QuizMode'), { loading: () => <p className="p-10 animate-pulse text-center">Loading...</p> });
const FlashcardsMode = dynamic(() => import('../../components/practice/FlashcardsMode'), { loading: () => <p className="p-10 animate-pulse text-center">Loading...</p> });
const SpeedRoundMode = dynamic(() => import('../../components/practice/SpeedRoundMode'), { loading: () => <p className="p-10 animate-pulse text-center">Loading...</p> });

const TABS = [
  { id: 'practice', label: 'Practice', component: PracticeMode },
  { id: 'quiz', label: 'Quiz', component: QuizMode },
  { id: 'flashcards', label: 'Flashcards', component: FlashcardsMode },
  { id: 'speed', label: 'Speed Round', component: SpeedRoundMode },
];

function PracticePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentTabId = searchParams.get('tab') || 'practice';
  const activeTab = TABS.find(t => t.id === currentTabId) || TABS[0];
  const ActiveComponent = activeTab.component;

  const setTab = (id: string) => {
    router.push(`/practice?tab=${id}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Practice & Test</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Test your skills and track your progress.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Content Area (2/3 width) */}
        <div className="flex-grow lg:w-2/3">
          
          {/* Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-4 mb-6 border-b border-gray-200 dark:border-gray-800 hide-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`whitespace-nowrap px-6 py-2 rounded-full font-bold transition-colors ${
                  currentTabId === tab.id 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 min-h-[500px]">
            <Suspense fallback={<div className="text-center p-20 animate-pulse">Loading Mode...</div>}>
              <ActiveComponent />
            </Suspense>
          </div>
        </div>

        {/* Side Panel (1/3 width) */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <DailyChallenge />
          <StatsPanel />
          <Achievements />
        </div>

      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center animate-pulse">Loading Practice Area...</div>}>
      <PracticePageContent />
    </Suspense>
  );
}
