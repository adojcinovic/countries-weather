export function generateFibonacci(n: number): bigint[] {
  if (n <= 0) return [];
  if (n === 1) return [0n];

  const result: bigint[] = [0n, 1n];
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
}
