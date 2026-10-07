'use client';

import React, { useState, useEffect } from 'react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const handleCustomEvent = () => setIsOpen(true);
    window.addEventListener('open-command-palette', handleCustomEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomEvent);
    };
  }, []);

  const items = [
    { name: 'Converter', href: '/#converter' },
    { name: 'Learn the Basics', href: '/learn' },
    { name: 'Visual Learning Tools', href: '/visual-lab' },
    { name: 'Practice & Test', href: '/practice' },
    { name: 'Cheat Sheet', href: '/cheatsheet' },
    { name: 'Real-World Applications', href: '/real-world' },
    { name: 'Developer\'s Corner', href: '/dev-corner' },
  ];

  const filtered = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (href: string) => {
    setIsOpen(false);
    window.location.href = href;
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 transition z-40"
        aria-label="Search Command Palette"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border dark:border-gray-700 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b dark:border-gray-700 flex items-center">
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-lg dark:text-white"
            placeholder="Search tools and topics..."
          />
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 ml-2 text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">ESC</button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filtered.length > 0 ? (
            <div className="p-2">
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</div>
              {filtered.map(item => (
                <button 
                  key={item.href} 
                  onClick={() => handleSelect(item.href)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition text-gray-800 dark:text-gray-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
