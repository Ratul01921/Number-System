import React from 'react';
import CodeTabs from '../../components/learn/CodeTabs';

export default function DevCornerPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Developer's Corner</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        See how number systems are implemented in real code.
      </p>
      
      <CodeTabs />
    </div>
  );
}
