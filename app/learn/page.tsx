'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TOPICS } from '../../lib/topics';

export default function LearnIndexPage() {
  const [search, setSearch] = useState('');

  const filtered = TOPICS.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Learn the Basics</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
        Select a topic below to master its rules, learn quick conversion tricks, and see common mistakes.
      </p>

      {/* Search Bar */}
      <div className="mb-8">
        <input 
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((topic, idx) => (
          <Link href={`/learn/${topic.id}`} key={topic.id} className="block group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-400 transition-all flex items-start gap-4">
              <div className="text-4xl group-hover:scale-110 transition-transform">{topic.emoji}</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{topic.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{topic.desc}</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    {/* Mock progress bar */}
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(idx + 1) * 20}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{(idx + 1) * 20}%</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
