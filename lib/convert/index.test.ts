import { describe, it, expect } from 'vitest';
import { convertNumber, validateInput } from './index';

describe('Number System Converter', () => {
  describe('validateInput', () => {
    it('validates correct inputs', () => {
      expect(validateInput('1010', 2).valid).toBe(true);
      expect(validateInput('2D', 16).valid).toBe(true);
      expect(validateInput('-10.5', 10).valid).toBe(true);
    });

    it('rejects invalid inputs', () => {
      expect(validateInput('102', 2).valid).toBe(false);
      expect(validateInput('2G', 16).valid).toBe(false);
      expect(validateInput('10.5.2', 10).valid).toBe(false);
    });
  });

  describe('convertNumber Integer', () => {
    it('converts 45(dec) to other bases', () => {
      expect(convertNumber('45', 10, 2)).toBe('101101');
      expect(convertNumber('45', 10, 8)).toBe('55');
      expect(convertNumber('45', 10, 16)).toBe('2D');
    });

    it('converts 100(dec) to other bases', () => {
      expect(convertNumber('100', 10, 2)).toBe('1100100');
      expect(convertNumber('100', 10, 8)).toBe('144');
      expect(convertNumber('100', 10, 16)).toBe('64');
    });

    it('converts 745(oct) to other bases', () => {
      expect(convertNumber('745', 8, 2)).toBe('111100101');
      expect(convertNumber('745', 8, 10)).toBe('485');
      expect(convertNumber('745', 8, 16)).toBe('1E5');
    });

    it('converts 2F(hex) to other bases', () => {
      expect(convertNumber('2F', 16, 10)).toBe('47');
      expect(convertNumber('2F', 16, 8)).toBe('57');
      expect(convertNumber('2F', 16, 2)).toBe('101111');
    });

    it('handles zero and leading zeros', () => {
      expect(convertNumber('0', 10, 2)).toBe('0');
      expect(convertNumber('0045', 10, 16)).toBe('2D');
    });

    it('handles negative numbers', () => {
      expect(convertNumber('-45', 10, 2)).toBe('-101101');
    });

    it('handles very large numbers', () => {
      const largeDec = '123456789012345678901234567890';
      const hex = convertNumber(largeDec, 10, 16);
      const back = convertNumber(hex, 16, 10);
      expect(back).toBe(largeDec);
    });
  });

  describe('convertNumber Fractions', () => {
    it('converts 10.625(dec) to binary', () => {
      expect(convertNumber('10.625', 10, 2)).toBe('1010.101');
    });
    
    it('converts 1010.101(bin) to decimal', () => {
      // float inaccuracy might cause it to be 10.625 or 10.625000000
      const res = convertNumber('1010.101', 2, 10);
      expect(parseFloat(res)).toBeCloseTo(10.625);
    });
  });
});
