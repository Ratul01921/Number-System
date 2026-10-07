import React from 'react';
import RealWorldVisuals from '../../components/visuals/RealWorldVisuals';

export default function RealWorldPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Real-World Applications</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        See how different number systems are used in computing everyday.
      </p>
      
      <RealWorldVisuals />
    </div>
  );
}
