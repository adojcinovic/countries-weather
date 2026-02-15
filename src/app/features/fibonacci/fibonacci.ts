import { Component } from '@angular/core';
import { generateFibonacci } from './utils/fibonacci';
import { isPrime } from './utils/prime';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.html',
  styleUrl: './fibonacci.scss',
})
export class FibonacciComponent {
  numbers: { value: bigint; isPrime: boolean }[] = [];
  generated = false;

  generate(): void {
    const fibs = generateFibonacci(50);
    this.numbers = fibs.map((value) => ({
      value,
      isPrime: isPrime(value),
    }));
    this.generated = true;
  }
}
