'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';

const MistakeDetector = dynamic(() => import('../../components/visuals/MistakeDetector'), { loading: () => <p className="p-10 text-center animate-pulse">Loading...</p> });
const InteractiveBitToggler = dynamic(() => import('../../components/visuals/InteractiveBitToggler'), { loading: () => <p className="p-10 text-center animate-pulse">Loading...</p> });
const AnimatedDivision = dynamic(() => import('../../components/visuals/AnimatedDivision'), { loading: () => <p className="p-10 text-center animate-pulse">Loading...</p> });
const GroupingAnimation = dynamic(() => import('../../components/visuals/GroupingAnimation'), { loading: () => <p className="p-10 text-center animate-pulse">Loading...</p> });
const Odometer = dynamic(() => import('../../components/visuals/Odometer'), { loading: () => <p className="p-10 text-center animate-pulse">Loading...</p> });
const NumberBlockVisual = dynamic(() => import('../../components/visuals/NumberBlockVisual'), { loading: () => <p className="p-10 text-center animate-pulse">Loading...</p> });
const CompareMode = dynamic(() => import('../../components/visuals/CompareMode'), { loading: () => <p className="p-10 text-center animate-pulse">Loading...</p> });

const TABS = [
  { id: 'mistake', label: 'Mistake Detector', component: MistakeDetector },
  { id: 'bittoggler', label: 'Bit Toggler', component: InteractiveBitToggler },
  { id: 'division', label: 'Animated Division', component: AnimatedDivision },
  { id: 'grouping', label: 'Grouping', component: GroupingAnimation },
  { id: 'odometer', label: 'Odometer', component: Odometer },
  { id: 'blocks', label: 'Block Visual', component: NumberBlockVisual },
  { id: 'compare', label: 'Compare Mode', component: CompareMode },
];

function VisualLabPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentTabId = searchParams.get('tab') || 'mistake';
  const activeTab = TABS.find(t => t.id === currentTabId) || TABS[0];
  const ActiveComponent = activeTab.component;

  const setTab = (id: string) => {
    router.push(`/visual-lab?tab=${id}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Visual Lab</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Interactive tools to truly understand how number systems work under the hood.
      </p>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-8 border-b border-gray-200 dark:border-gray-800 hide-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-colors ${
              currentTabId === tab.id 
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full min-h-[500px]">
        <Suspense fallback={<div className="text-center p-20 animate-pulse">Loading Tool...</div>}>
          <ActiveComponent />
        </Suspense>
      </div>
    </div>
  );
}

export default function VisualLabPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center animate-pulse">Loading Visual Lab...</div>}>
      <VisualLabPageContent />
    </Suspense>
  );
}
