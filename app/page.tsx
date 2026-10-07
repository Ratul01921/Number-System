import { Suspense } from 'react';
import Link from 'next/link';
import Converter from "../components/Converter";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      
      {/* Hero Section */}
      <section id="converter" className="relative w-full flex flex-col items-center pt-20 pb-12 px-4 overflow-hidden bg-gradient-to-b from-blue-50/50 to-transparent dark:from-gray-900/50">
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 
            className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 text-center tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1 }}
          >
            Number System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-12 text-center max-w-2xl text-lg sm:text-xl font-medium">
            Convert, learn, and master Binary, Octal, Decimal, and Hexadecimal.
          </p>
          <div className="w-full max-w-5xl">
            <Suspense fallback={<div className="p-10 animate-pulse text-center bg-white/50 rounded-3xl">Loading Converter...</div>}>
              <Converter />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 3 Feature Cards Linking to other pages */}
      <section className="w-full max-w-7xl mx-auto py-24 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <Link href="/learn" className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700/50 p-8 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:rotate-6 transition-transform">
              📚
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Learn the Basics</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Interactive guides, explanations, and ELI10 analogies for Binary, Octal, Decimal, and Hex.
            </p>
          </div>
        </Link>

        <Link href="/visual-lab" className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700/50 p-8 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:-rotate-6 transition-transform">
              🔬
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Visual Lab</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Play with Bit Togglers, Odometers, Number Blocks, and visually debug manual calculations.
            </p>
          </div>
        </Link>

        <Link href="/practice" className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700/50 p-8 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 dark:bg-green-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Practice & Test</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Take Quizzes, play the Speed Round, review Flashcards, and complete Daily Challenges!
            </p>
          </div>
        </Link>

      </section>
    </main>
  );
}
