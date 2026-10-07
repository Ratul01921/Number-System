'use client';

import React from 'react';
import CheatSheet from '../../components/learn/CheatSheet';
import ReferenceTable from '../../components/learn/ReferenceTable';

export default function CheatSheetPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cheat Sheet</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Quick reference guide and conversion tables.
          </p>
        </div>
        <button 
          onClick={handlePrint}
          className="print:hidden bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm"
        >
          🖨️ Print Page
        </button>
      </div>

      <div className="print:block space-y-12">
        <CheatSheet />
        <ReferenceTable />
      </div>
    </div>
  );
}
