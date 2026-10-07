'use client';

import React, { useState } from 'react';

const GLOSSARY_TERMS: Record<string, string> = {
  base: "The number of unique digits, including zero, used to represent numbers.",
  radix: "Another word for base. Decimal has a radix of 10.",
  bit: "Binary digit. The smallest unit of data, holding a 0 or a 1.",
  nibble: "A group of 4 bits. Also called half a byte. Can represent a single hex digit.",
  byte: "A group of 8 bits.",
  msb: "Most Significant Bit. The bit with the highest value, usually the leftmost.",
  lsb: "Least Significant Bit. The bit with the lowest value, usually the rightmost."
};

interface Props {
  term: string;
  children?: React.ReactNode;
}

export default function Glossary({ term, children }: Props) {
  const [show, setShow] = useState(false);
  const normalizedTerm = term.toLowerCase();
  const definition = GLOSSARY_TERMS[normalizedTerm];

  if (!definition) return <>{children || term}</>;

  return (
    <span 
      className="relative inline-block border-b border-dotted border-blue-500 cursor-help text-blue-700 dark:text-blue-400"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)}
    >
      {children || term}
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50 text-center animate-fade-in pointer-events-none">
          <span className="font-bold block mb-1 uppercase tracking-wider">{term}</span>
          {definition}
          {/* Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></span>
        </span>
      )}
    </span>
  );
}
