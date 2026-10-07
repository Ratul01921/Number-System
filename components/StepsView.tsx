'use client';

import React from 'react';
import { StepResult } from '../lib/steps';
import { useLanguage } from '../hooks/useLanguage';

export default function StepsView({ steps }: { steps: StepResult[] }) {
  const { t } = useLanguage();

  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        {t('step_by_step_solution' as any)}
      </h3>
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-3">
              Step {idx + 1}: {t(step.titleKey as any)}
            </h4>
            <StepRenderer step={step} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StepRenderer({ step }: { step: StepResult }) {
  if (step.type === 'identity') {
    return <p className="text-gray-600 dark:text-gray-400">The number is already in the target base.</p>;
  }
  
  if (step.type === 'division-table') {
    return (
      <div className="overflow-x-auto relative">
        <table className="min-w-full text-center border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="p-3">Number</th>
              <th className="p-3">Divisor</th>
              <th className="p-3">Quotient</th>
              <th className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">Remainder</th>
            </tr>
          </thead>
          <tbody>
            {step.data.rows.map((r: any, i: number) => (
              <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800/50">
                <td className="p-3 font-mono text-gray-800 dark:text-gray-200">{r.num}</td>
                <td className="p-3 font-mono text-gray-600 dark:text-gray-400">÷ {r.div}</td>
                <td className="p-3 font-mono text-blue-600 dark:text-blue-400 font-medium">{r.quot}</td>
                <td className="p-3 font-mono font-bold text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/10">{r.rem}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-end gap-2 text-sm font-medium text-red-600 dark:text-red-400 animate-pulse">
          <svg className="w-5 h-5 -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Read remainders from bottom to top
        </div>
      </div>
    );
  }

  if (step.type === 'multiplication-table') {
    return (
      <div className="overflow-x-auto relative">
        <table className="min-w-full text-center border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="p-3">Fraction</th>
              <th className="p-3">Multiplier</th>
              <th className="p-3">Result</th>
              <th className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">Integer Part</th>
            </tr>
          </thead>
          <tbody>
            {step.data.rows.map((r: any, i: number) => (
              <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800/50">
                <td className="p-3 font-mono text-gray-800 dark:text-gray-200">{r.current}</td>
                <td className="p-3 font-mono text-gray-600 dark:text-gray-400">× {r.mult}</td>
                <td className="p-3 font-mono text-gray-800 dark:text-gray-200">{r.resultStr}</td>
                <td className="p-3 font-mono font-bold text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/10">{r.intPart}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-end gap-2 text-sm font-medium text-red-600 dark:text-red-400 animate-pulse">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          Read integer parts from top to bottom
        </div>
      </div>
    );
  }

  if (step.type === 'positional-weight') {
    return (
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {step.data.positions.map((p: any, i: number) => (
            <div key={i} className="flex flex-col items-center bg-white dark:bg-gray-800 p-2 rounded shadow-sm border border-gray-200 dark:border-gray-700">
              <span className="font-mono text-lg font-bold">{p.digit}</span>
              <span className="text-xs text-gray-500">&times;</span>
              <span className="font-mono text-sm">{p.weight}</span>
              <span className="text-xs text-gray-500">=</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">{p.value}</span>
            </div>
          ))}
        </div>
        <div className="text-lg font-semibold border-t dark:border-gray-700 pt-2">
          Sum = <span className="text-green-600 dark:text-green-400 font-mono">{step.data.sum}</span>
        </div>
      </div>
    );
  }

  if (step.type === 'grouping') {
    return (
      <div>
        <p className="mb-2">Group bits into chunks of {step.data.bitsPerGroup}:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {step.data.intGroups.map((g: any, i: number) => (
            <div key={`int-${i}`} className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/30 p-2 rounded border border-blue-200 dark:border-blue-800">
              <span className="font-mono text-gray-800 dark:text-gray-200">{g.bin}</span>
              <span className="text-xs text-gray-500">↓</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{g.val}</span>
            </div>
          ))}
        </div>
        {step.data.fracGroups.length > 0 && (
          <>
            <p className="mb-2">Fractional groups:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {step.data.fracGroups.map((g: any, i: number) => (
                <div key={`frac-${i}`} className="flex flex-col items-center bg-green-50 dark:bg-green-900/30 p-2 rounded border border-green-200 dark:border-green-800">
                  <span className="font-mono text-gray-800 dark:text-gray-200">{g.bin}</span>
                  <span className="text-xs text-gray-500">↓</span>
                  <span className="font-mono font-bold text-green-600 dark:text-green-400">{g.val}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  if (step.type === 'ungrouping') {
    return (
      <div>
        <p className="mb-2">Expand each digit to {step.data.bitsPerGroup} bits:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {step.data.intGroups.map((g: any, i: number) => (
            <div key={`int-${i}`} className="flex flex-col items-center bg-purple-50 dark:bg-purple-900/30 p-2 rounded border border-purple-200 dark:border-purple-800">
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{g.digit}</span>
              <span className="text-xs text-gray-500">↓</span>
              <span className="font-mono text-gray-800 dark:text-gray-200">{g.bin}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step.type === 'two-stage') {
    return (
      <div className="space-y-4 border-l-2 border-dashed border-gray-300 dark:border-gray-600 pl-4">
        <div>
          <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Stage 1</h5>
          <StepRenderer step={step.data.stage1} />
        </div>
        <div>
          <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Stage 2</h5>
          <StepRenderer step={step.data.stage2} />
        </div>
      </div>
    );
  }

  return <pre className="text-xs bg-gray-200 dark:bg-gray-800 p-2 rounded">{JSON.stringify(step, null, 2)}</pre>;
}
