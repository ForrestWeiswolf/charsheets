import { formatModifier, modFromAbilityScore } from './utils';

describe('modFromAbilityScore', () => {
  it('returns 0 for scores of 10', () => {
    expect(modFromAbilityScore(10)).toBe(0);
  });

  it('returns half the difference from 10 for even scores', () => {
    expect(modFromAbilityScore(18)).toBe(4);
    expect(modFromAbilityScore(6)).toBe(-2);
  });

  it('returns half the difference from 10, rounded down, for odd scores', () => {
    expect(modFromAbilityScore(17)).toBe(3);
    expect(modFromAbilityScore(9)).toBe(-1);
  });

  it('returns 0 for scores of null', () => {
    expect(modFromAbilityScore(null)).toBe(0);
  });
});

describe('format modifier', () => {
  it('prepends a + to positive numbers', () => {
    expect(formatModifier(1)).toBe('+1');
  });

  it('prepends a - to negative numbers', () => {
    expect(formatModifier(-3)).toBe('-3');
  });

  it('prepends a + to 0', () => {
    expect(formatModifier(0)).toBe('+0');
  });
});
