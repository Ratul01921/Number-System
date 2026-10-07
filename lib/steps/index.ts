import { ParsedNumber, format, CHARS } from '../convert';

export type StepType = 
  | 'division-table' 
  | 'multiplication-table' 
  | 'positional-weight' 
  | 'grouping' 
  | 'ungrouping'
  | 'two-stage'
  | 'identity';

export interface StepResult {
  type: StepType;
  titleKey: string;
  data: any;
}

export function generateSteps(input: string, parsed: ParsedNumber, fromBase: number, toBase: number): StepResult[] {
  const steps: StepResult[] = [];
  if (fromBase === toBase) {
    steps.push({ type: 'identity', titleKey: 'step_identity', data: null });
    return steps;
  }

  // Base to Decimal
  if (fromBase !== 10 && toBase === 10) {
    steps.push(generatePositionalWeightSteps(input, parsed, fromBase));
    return steps;
  }

  // Decimal to Base
  if (fromBase === 10 && toBase !== 10) {
    if (parsed.intPart > 0n || (parsed.intPart === 0n && parsed.fracPart === 0)) {
      steps.push(generateDivisionSteps(parsed.intPart, toBase));
    }
    if (parsed.fracPart > 0) {
      steps.push(generateMultiplicationSteps(parsed.fracPart, toBase));
    }
    return steps;
  }

  // Binary to Octal / Hex
  if (fromBase === 2 && (toBase === 8 || toBase === 16)) {
    steps.push(generateGroupingSteps(input, parsed, toBase));
    return steps;
  }

  // Octal / Hex to Binary
  if ((fromBase === 8 || fromBase === 16) && toBase === 2) {
    steps.push(generateUngroupingSteps(input, parsed, fromBase));
    return steps;
  }

  // Octal to Hex or Hex to Octal
  if ((fromBase === 8 && toBase === 16) || (fromBase === 16 && toBase === 8)) {
    steps.push({
      type: 'two-stage',
      titleKey: 'step_two_stage',
      data: {
        stage1: generateUngroupingSteps(input, parsed, fromBase), // to Binary
        stage2: generateGroupingSteps(format(parsed, 2), parsed, toBase) // Binary to Target
      }
    });
    return steps;
  }

  // Other bases (Any to Any via Decimal)
  steps.push({
    type: 'two-stage',
    titleKey: 'step_any_to_any',
    data: {
      stage1: generatePositionalWeightSteps(input, parsed, fromBase),
      stage2: generateDivisionSteps(parsed.intPart, toBase) // Simplifying for other bases (ignoring fractions for now)
    }
  });

  return steps;
}

function generateDivisionSteps(intPart: bigint, toBase: number): StepResult {
  const rows: { num: string, div: number, quot: string, rem: string }[] = [];
  let current = intPart;
  const bigBase = BigInt(toBase);
  
  if (current === 0n) {
    rows.push({ num: '0', div: toBase, quot: '0', rem: '0' });
  } else {
    while (current > 0n) {
      const quot = current / bigBase;
      const rem = current % bigBase;
      rows.push({
        num: current.toString(),
        div: toBase,
        quot: quot.toString(),
        rem: CHARS[Number(rem)]
      });
      current = quot;
    }
  }

  return {
    type: 'division-table',
    titleKey: 'step_division',
    data: { rows }
  };
}

function generateMultiplicationSteps(fracPart: number, toBase: number): StepResult {
  const rows: { current: string, mult: number, resultStr: string, intPart: string, fracPart: string }[] = [];
  let current = fracPart;
  for (let i = 0; i < 6; i++) { // Limit steps
    if (current === 0) break;
    const res = current * toBase;
    const intP = Math.floor(res);
    const fracP = res - intP;
    rows.push({
      current: current.toString(),
      mult: toBase,
      resultStr: res.toString(),
      intPart: CHARS[intP],
      fracPart: fracP.toString()
    });
    current = fracP;
  }
  return {
    type: 'multiplication-table',
    titleKey: 'step_multiplication',
    data: { rows }
  };
}

function generatePositionalWeightSteps(input: string, parsed: ParsedNumber, fromBase: number): StepResult {
  const parts = input.toUpperCase().replace("-", "").split(".");
  const intStr = parts[0] || "0";
  const fracStr = parts[1] || "";
  
  const positions: { digit: string, pos: number, weight: string, value: string }[] = [];
  
  // Integer part
  let len = intStr.length;
  for (let i = 0; i < len; i++) {
    const d = intStr[i];
    const pos = len - 1 - i;
    const val = BigInt(CHARS.indexOf(d)) * (BigInt(fromBase) ** BigInt(pos));
    positions.push({
      digit: d,
      pos,
      weight: `${fromBase}^${pos}`,
      value: val.toString()
    });
  }
  
  // Fractional part
  for (let i = 0; i < fracStr.length; i++) {
    const d = fracStr[i];
    const pos = -(i + 1);
    const val = CHARS.indexOf(d) * (fromBase ** pos);
    positions.push({
      digit: d,
      pos,
      weight: `${fromBase}^${pos}`,
      value: val.toString() // Approximated
    });
  }

  return {
    type: 'positional-weight',
    titleKey: 'step_positional',
    data: { positions, sum: parsed.intPart.toString() + (parsed.fracPart > 0 ? (parsed.fracPart).toString().slice(1) : "") }
  };
}

function generateGroupingSteps(input: string, parsed: ParsedNumber, toBase: number): StepResult {
  const bitsPerGroup = toBase === 16 ? 4 : 3;
  const parts = input.replace("-", "").split(".");
  let intStr = parts[0] || "0";
  let fracStr = parts[1] || "";

  // Pad integer part with leading zeros
  while (intStr.length % bitsPerGroup !== 0) {
    intStr = "0" + intStr;
  }
  // Pad fractional part with trailing zeros
  while (fracStr.length % bitsPerGroup !== 0) {
    fracStr = fracStr + "0";
  }

  const intGroups: { bin: string, val: string }[] = [];
  for (let i = 0; i < intStr.length; i += bitsPerGroup) {
    const chunk = intStr.slice(i, i + bitsPerGroup);
    const val = parseInt(chunk, 2);
    intGroups.push({ bin: chunk, val: CHARS[val] });
  }

  const fracGroups: { bin: string, val: string }[] = [];
  for (let i = 0; i < fracStr.length; i += bitsPerGroup) {
    const chunk = fracStr.slice(i, i + bitsPerGroup);
    const val = parseInt(chunk, 2);
    fracGroups.push({ bin: chunk, val: CHARS[val] });
  }

  return {
    type: 'grouping',
    titleKey: 'step_grouping',
    data: { bitsPerGroup, intGroups, fracGroups }
  };
}

function generateUngroupingSteps(input: string, parsed: ParsedNumber, fromBase: number): StepResult {
  const bitsPerGroup = fromBase === 16 ? 4 : 3;
  const parts = input.toUpperCase().replace("-", "").split(".");
  const intStr = parts[0] || "0";
  const fracStr = parts[1] || "";

  const intGroups: { digit: string, bin: string }[] = [];
  for (const char of intStr) {
    const val = CHARS.indexOf(char);
    intGroups.push({ digit: char, bin: val.toString(2).padStart(bitsPerGroup, "0") });
  }

  const fracGroups: { digit: string, bin: string }[] = [];
  for (const char of fracStr) {
    const val = CHARS.indexOf(char);
    fracGroups.push({ digit: char, bin: val.toString(2).padStart(bitsPerGroup, "0") });
  }

  return {
    type: 'ungrouping',
    titleKey: 'step_ungrouping',
    data: { bitsPerGroup, intGroups, fracGroups }
  };
}
