export type ParsedNumber = {
  isNegative: boolean;
  intPart: bigint;
  fracPart: number; // Stored as a decimal fraction between 0 and 1
  originalBase: number;
};

export const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Validates if a character is valid for a given base.
 */
export function isValidCharForBase(char: string, base: number): boolean {
  if (base < 2 || base > 36) return false;
  const upperChar = char.toUpperCase();
  const charIdx = CHARS.indexOf(upperChar);
  return charIdx !== -1 && charIdx < base;
}

/**
 * Validates an entire string against a base.
 */
export function validateInput(input: string, base: number): { valid: boolean; error?: string } {
  if (!input) return { valid: true }; // empty is fine
  
  let checkStr = input.toUpperCase();
  if (checkStr.startsWith("-")) {
    checkStr = checkStr.slice(1);
  }

  const parts = checkStr.split(".");
  if (parts.length > 2) {
    return { valid: false, error: "Only one decimal point is allowed." };
  }

  for (let i = 0; i < parts.length; i++) {
    for (let j = 0; j < parts[i].length; j++) {
      const char = parts[i][j];
      if (!isValidCharForBase(char, base)) {
        return { valid: false, error: `'${char}' is not allowed in Base ${base}.` };
      }
    }
  }

  return { valid: true };
}

/**
 * Parses a string from a given base to our internal representation.
 */
export function parse(input: string, fromBase: number): ParsedNumber | null {
  if (!input) return null;
  
  let str = input.trim().toUpperCase();
  if (str === "" || str === "-" || str === ".") return null;

  let isNegative = false;
  if (str.startsWith("-")) {
    isNegative = true;
    str = str.slice(1);
  }

  const parts = str.split(".");
  const intStr = parts[0] || "0";
  const fracStr = parts[1] || "";

  // Parse Integer Part using BigInt
  let intPart = BigInt(0);
  const bigBase = BigInt(fromBase);
  for (let i = 0; i < intStr.length; i++) {
    const val = BigInt(CHARS.indexOf(intStr[i]));
    intPart = intPart * bigBase + val;
  }

  // Parse Fractional Part using Number
  let fracPart = 0;
  if (fracStr.length > 0) {
    let multiplier = 1 / fromBase;
    for (let i = 0; i < fracStr.length; i++) {
      const val = CHARS.indexOf(fracStr[i]);
      fracPart += val * multiplier;
      multiplier /= fromBase;
    }
  }

  return {
    isNegative,
    intPart,
    fracPart,
    originalBase: fromBase
  };
}

/**
 * Formats an internal representation to a given base string.
 */
export function format(parsed: ParsedNumber | null, toBase: number, maxFractionDigits: number = 10): string {
  if (!parsed) return "";

  let result = parsed.isNegative && (parsed.intPart !== BigInt(0) || parsed.fracPart !== 0) ? "-" : "";

  // Format Integer Part
  result += parsed.intPart.toString(toBase).toUpperCase();

  // Format Fractional Part
  if (parsed.fracPart > 0) {
    result += ".";
    let currentFrac = parsed.fracPart;
    for (let i = 0; i < maxFractionDigits; i++) {
      currentFrac *= toBase;
      const intVal = Math.floor(currentFrac);
      result += CHARS[intVal];
      currentFrac -= intVal;
      // Handle floating point imprecision
      if (currentFrac < 1e-10 || currentFrac > 1 - 1e-10) {
        break;
      }
    }
  }

  return result;
}

/**
 * Convenience function to convert a string directly.
 */
export function convertNumber(input: string, fromBase: number, toBase: number): string {
  if (!validateInput(input, fromBase).valid) return "Invalid";
  const parsed = parse(input, fromBase);
  return format(parsed, toBase);
}
