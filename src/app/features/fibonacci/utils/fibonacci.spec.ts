import { generateFibonacci } from './fibonacci';

describe('generateFibonacci', () => {
  it('should return empty array for n <= 0', () => {
    expect(generateFibonacci(0)).toEqual([]);
    expect(generateFibonacci(-5)).toEqual([]);
  });

  it('should return [0n] for n = 1', () => {
    expect(generateFibonacci(1)).toEqual([0n]);
  });

  it('should return first 2 numbers', () => {
    expect(generateFibonacci(2)).toEqual([0n, 1n]);
  });

  it('should return first 10 Fibonacci numbers', () => {
    const result = generateFibonacci(10);
    expect(result).toEqual([0n, 1n, 1n, 2n, 3n, 5n, 8n, 13n, 21n, 34n]);
  });

  it('should return 50 numbers when asked', () => {
    const result = generateFibonacci(50);
    expect(result.length).toBe(50);
    expect(result[0]).toBe(0n);
    expect(result[1]).toBe(1n);
    // Verify each number is sum of previous two
    for (let i = 2; i < 50; i++) {
      expect(result[i]).toBe(result[i - 1] + result[i - 2]);
    }
  });
});
