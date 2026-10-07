import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TOPICS } from '../../../lib/topics';

// This is required for static export to know which paths to pre-render
export function generateStaticParams() {
  return TOPICS.map((topic) => ({
    topic: topic.id,
  }));
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const resolvedParams = await params;
  const topicId = resolvedParams.topic;
  
  const currentIndex = TOPICS.findIndex(t => t.id === topicId);
  if (currentIndex === -1) {
    notFound();
  }

  const topic = TOPICS[currentIndex];
  const prevTopic = currentIndex > 0 ? TOPICS[currentIndex - 1] : null;
  const nextTopic = currentIndex < TOPICS.length - 1 ? TOPICS[currentIndex + 1] : null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/learn" className="hover:text-blue-600 transition">Learn</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-200 font-medium">{topic.title}</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-4">
        <span>{topic.emoji}</span> {topic.title}
      </h1>

      <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
        {topic.desc}
      </p>

      {/* Content skeleton (Explanation, Rule, Example, Trick, Mistakes) */}
      <div className="space-y-12">
        
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Explanation</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Here goes the detailed explanation of {topic.title}. It explains the base, the digits used, and how it translates to decimal values.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Rule</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Golden Rule</h3>
            <p className="text-blue-700 dark:text-blue-400">
              When converting to decimal, multiply each digit by the base raised to the power of its position (starting from 0 on the right).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Worked Example</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 font-mono text-sm overflow-x-auto">
            <p className="mb-2">Example conversion goes here...</p>
            <p>1 × 2² + 0 × 2¹ + 1 × 2⁰ = 5</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Common Mistakes</h2>
          <ul className="list-disc pl-5 space-y-2 text-red-700 dark:text-red-400">
            <li>Forgetting that position indexing starts at 0 from the right.</li>
            <li>Using digits outside the allowed range (e.g., a '2' in Binary).</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
        <Link href={`/?from=${topic.id}#converter`} className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30">
          Try it in the Converter
        </Link>
      </div>

      {/* Prev/Next Navigation */}
      <div className="mt-16 flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-800">
        {prevTopic ? (
          <Link href={`/learn/${prevTopic.id}`} className="group flex items-center gap-3 text-left">
            <span className="text-2xl text-gray-400 group-hover:text-blue-600 transition">←</span>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Previous</div>
              <div className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition">{prevTopic.title}</div>
            </div>
          </Link>
        ) : <div></div>}

        {nextTopic ? (
          <Link href={`/learn/${nextTopic.id}`} className="group flex items-center gap-3 text-right">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Next</div>
              <div className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition">{nextTopic.title}</div>
            </div>
            <span className="text-2xl text-gray-400 group-hover:text-blue-600 transition">→</span>
          </Link>
        ) : <div></div>}
      </div>

    </div>
  );
}
