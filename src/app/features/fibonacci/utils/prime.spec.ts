import { isPrime } from './prime';

describe('isPrime', () => {
  it('should return false for numbers less than 2', () => {
    expect(isPrime(0n)).toBeFalse();
    expect(isPrime(1n)).toBeFalse();
    expect(isPrime(-1n)).toBeFalse();
  });

  it('should return true for 2', () => {
    expect(isPrime(2n)).toBeTrue();
  });

  it('should return false for even numbers > 2', () => {
    expect(isPrime(4n)).toBeFalse();
    expect(isPrime(100n)).toBeFalse();
  });

  it('should return true for known primes', () => {
    expect(isPrime(3n)).toBeTrue();
    expect(isPrime(5n)).toBeTrue();
    expect(isPrime(7n)).toBeTrue();
    expect(isPrime(13n)).toBeTrue();
    expect(isPrime(89n)).toBeTrue();
  });

  it('should return false for composite odd numbers', () => {
    expect(isPrime(9n)).toBeFalse();
    expect(isPrime(15n)).toBeFalse();
    expect(isPrime(21n)).toBeFalse();
  });

  it('should handle large Fibonacci primes', () => {
    expect(isPrime(514229n)).toBeTrue();
  });
});
