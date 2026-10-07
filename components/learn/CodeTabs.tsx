'use client';

import React, { useState } from 'react';

const CODE_EXAMPLES = {
  javascript: {
    label: 'JavaScript',
    code: `// Decimal to Binary, Octal, Hex
const num = 45;
console.log(num.toString(2));  // "101101"
console.log(num.toString(8));  // "55"
console.log(num.toString(16)); // "2d"

// Any Base to Decimal
const binaryStr = "101101";
console.log(parseInt(binaryStr, 2)); // 45`
  },
  python: {
    label: 'Python',
    code: `# Decimal to Binary, Octal, Hex
num = 45
print(bin(num)) # "0b101101"
print(oct(num)) # "0o55"
print(hex(num)) # "0x2d"

# Any Base to Decimal
binary_str = "101101"
print(int(binary_str, 2)) # 45`
  },
  cpp: {
    label: 'C++',
    code: `// Include <iostream> and <bitset>
int num = 45;

// Decimal to Hex/Octal (using manipulators)
std::cout << std::hex << num << "\\n"; // "2d"
std::cout << std::oct << num << "\\n"; // "55"

// Decimal to Binary (using bitset)
std::cout << std::bitset<8>(num) << "\\n"; // "00101101"

// Any base string to int (using std::stoi)
std::string binStr = "101101";
int dec = std::stoi(binStr, nullptr, 2);`
  }
};

export default function CodeTabs() {
  const [activeTab, setActiveTab] = useState<keyof typeof CODE_EXAMPLES>('javascript');

  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4">
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
        Developer&apos;s Corner
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-2xl mx-auto">
        Learn how to do conversions programmatically in your favorite language.
      </p>

      <div className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-2xl">
        <div className="flex border-b border-gray-700 bg-[#2D2D2D]">
          {(Object.keys(CODE_EXAMPLES) as Array<keyof typeof CODE_EXAMPLES>).map(key => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 font-mono text-sm transition-colors ${
                activeTab === key ? 'bg-[#1E1E1E] text-blue-400 border-t-2 border-blue-400' : 'text-gray-400 hover:text-gray-200 hover:bg-[#3D3D3D]'
              }`}
            >
              {CODE_EXAMPLES[key].label}
            </button>
          ))}
        </div>
        <div className="p-6 overflow-x-auto">
          <pre className="text-gray-300 font-mono text-sm leading-relaxed">
            <code>{CODE_EXAMPLES[activeTab].code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
