import { format } from '../convert';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface PracticeQuestion {
  id: string;
  value: string; // The number in fromBase
  fromBase: number;
  toBase: number;
  answer: string; // The correct answer in toBase
  topicId: string;
}

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function createQuestion(difficulty: Difficulty, conversionType?: { from: number; to: number }): PracticeQuestion {
  const bases = [2, 8, 10, 16];
  let fromBase = conversionType?.from;
  let toBase = conversionType?.to;

  if (!fromBase || !toBase) {
    fromBase = bases[getRandomInt(bases.length)];
    toBase = bases[getRandomInt(bases.length)];
    while (fromBase === toBase) {
      toBase = bases[getRandomInt(bases.length)];
    }
  }

  let maxVal = 63;
  if (difficulty === 'medium') maxVal = 4095;
  if (difficulty === 'hard') maxVal = 65535;

  let intVal = BigInt(getRandomInt(maxVal + 1));
  let fracVal = 0;

  // Add fractions for hard difficulty sometimes
  if (difficulty === 'hard' && Math.random() > 0.5) {
    // 3 fractional bits means values like 0.125, 0.250, 0.375, etc (multiples of 1/8)
    const fractions = [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875];
    fracVal = fractions[getRandomInt(fractions.length)];
  }

  const parsedNum = {
    isNegative: false,
    intPart: intVal,
    fracPart: fracVal,
    originalBase: 10
  };

  const valueStr = format(parsedNum, fromBase);
  const answerStr = format(parsedNum, toBase);

  // Generate a topicId based on the conversion
  const topicId = `${fromBase}-to-${toBase}`;

  return {
    id: Math.random().toString(36).substring(2, 9),
    value: valueStr,
    fromBase,
    toBase,
    answer: answerStr,
    topicId
  };
}

export function generateMultipleChoiceOptions(correctAnswer: string, toBase: number): string[] {
  const options = new Set<string>();
  options.add(correctAnswer);

  // Helper to safely manipulate string
  const addOption = (opt: string) => {
    if (opt !== correctAnswer && opt.length > 0) options.add(opt);
  };

  // 1. Reversed digits
  addOption(correctAnswer.split('').reverse().join(''));

  // 2. Off by one character (e.g. A -> B, 1 -> 0)
  if (correctAnswer.length > 0) {
    const chars = correctAnswer.split('');
    const lastChar = chars[chars.length - 1];
    if (lastChar >= '0' && lastChar < '9') chars[chars.length - 1] = String.fromCharCode(lastChar.charCodeAt(0) + 1);
    else if (lastChar === '9') chars[chars.length - 1] = '8';
    addOption(chars.join(''));
  }

  // 3. Common grouping mistakes (missing leading/trailing zero in groups)
  addOption(correctAnswer + '0');
  if (correctAnswer.length > 1) {
    addOption(correctAnswer.slice(1));
  }

  // Fill the rest with random options of similar length
  const charSet = toBase === 2 ? '01' : toBase === 8 ? '01234567' : toBase === 10 ? '0123456789' : '0123456789ABCDEF';
  while (options.size < 4) {
    let rand = '';
    for (let i = 0; i < correctAnswer.length; i++) {
      rand += charSet[getRandomInt(charSet.length)];
    }
    addOption(rand);
  }

  // Shuffle options
  return Array.from(options).slice(0, 4).sort(() => Math.random() - 0.5);
}
