import { describe, it, expect } from 'vitest';
import { createQuestion, generateMultipleChoiceOptions } from './generator';
import { checkAnswer } from './checker';

describe('Practice Generator', () => {
  it('generates a valid question', () => {
    const q = createQuestion('easy', { from: 10, to: 2 });
    expect(q.fromBase).toBe(10);
    expect(q.toBase).toBe(2);
    expect(typeof q.value).toBe('string');
    expect(typeof q.answer).toBe('string');
    expect(q.topicId).toBe('10-to-2');
  });

  it('generates multiple choice options including the correct answer', () => {
    const options = generateMultipleChoiceOptions('1010', 2);
    expect(options.length).toBe(4);
    expect(options).toContain('1010');
  });
});

describe('Practice Checker', () => {
  it('marks correct answer as correct', () => {
    const res = checkAnswer(' 1010 ', '1010', 10, 2);
    expect(res.correct).toBe(true);
  });

  it('handles lowercase and spaces', () => {
    const res = checkAnswer('2d', '2D', 10, 16);
    expect(res.correct).toBe(true);
  });

  it('provides a smart hint for reversed string', () => {
    const res = checkAnswer('0101', '1010', 10, 2);
    expect(res.correct).toBe(false);
    expect(res.hint).toContain('bottom to top');
  });

  it('provides a smart hint for wrong bit grouping length', () => {
    const res = checkAnswer('010', '1010', 16, 2); // 4-bit expected
    expect(res.correct).toBe(false);
    expect(res.hint).toContain('4 bit');
  });
});
