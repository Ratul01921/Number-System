export interface CheckerResult {
  correct: boolean;
  expected: string;
  hint?: string;
}

export function checkAnswer(userInput: string, expectedAnswer: string, fromBase: number, toBase: number): CheckerResult {
  // Normalize
  const normUser = userInput.trim().replace(/[_ ]/g, '').toUpperCase().replace(/^0+(?=\d)/, '');
  const normExpected = expectedAnswer.trim().toUpperCase().replace(/^0+(?=\d)/, '');

  if (normUser === normExpected) {
    return { correct: true, expected: normExpected };
  }

  // Generate Hints
  let hint = 'Wrong answer. Try again.';

  if (normUser === normExpected.split('').reverse().join('')) {
    hint = 'Remainder bottom to top porte bhule gecho? (Did you forget to read remainders from bottom to top?)';
  } else if (userInput.trim().replace(/[_ ]/g, '').toUpperCase() === expectedAnswer.trim().toUpperCase().split('').reverse().join('')) {
    hint = 'Remainder bottom to top porte bhule gecho? (Did you forget to read remainders from bottom to top?)';
  } else if ((fromBase === 2 && toBase === 8) || (fromBase === 8 && toBase === 2)) {
    if (normUser.length !== normExpected.length) {
      hint = 'Group 3 bit kore hoy, 4 bit na. (Octal uses 3-bit groups, not 4).';
    }
  } else if ((fromBase === 2 && toBase === 16) || (fromBase === 16 && toBase === 2)) {
    if (normUser.length !== normExpected.length) {
      hint = 'Group 4 bit kore hoy, 3 bit na. (Hexadecimal uses 4-bit groups).';
    }
  } else if (normUser.length === normExpected.length + 1 && normUser.startsWith('0')) {
    hint = 'No need for leading zeros unless it\'s part of a fraction.';
  }

  return { correct: false, expected: normExpected, hint };
}
