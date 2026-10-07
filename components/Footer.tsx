import React from 'react';
import { CONFIG } from '../lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 mt-auto border-t border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-2">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          &copy; {currentYear} {CONFIG.appName}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Designed & Developed by{' '}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            {CONFIG.creatorName}
          </span>
        </p>
      </div>
    </footer>
  );
}
