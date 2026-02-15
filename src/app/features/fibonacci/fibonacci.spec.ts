import { TestBed } from '@angular/core/testing';
import { FibonacciComponent } from './fibonacci';

describe('FibonacciComponent', () => {
  let component: FibonacciComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FibonacciComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(FibonacciComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with empty numbers and generated = false', () => {
    expect(component.numbers).toEqual([]);
    expect(component.generated).toBeFalse();
  });

  it('should generate 50 Fibonacci numbers with prime flags', () => {
    component.generate();

    expect(component.generated).toBeTrue();
    expect(component.numbers.length).toBe(50);
    expect(component.numbers[0]).toEqual({ value: 0n, isPrime: false });
    expect(component.numbers[1]).toEqual({ value: 1n, isPrime: false });
    expect(component.numbers[3]).toEqual({ value: 2n, isPrime: true });
    expect(component.numbers[7]).toEqual({ value: 13n, isPrime: true });
  });

  it('should render the generate button', () => {
    const fixture = TestBed.createComponent(FibonacciComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Generate Fibonacci');
  });

  it('should render numbers after generate is clicked', () => {
    const fixture = TestBed.createComponent(FibonacciComponent);
    fixture.componentInstance.generate();
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(50);
  });

  it('should disable button after generation', () => {
    const fixture = TestBed.createComponent(FibonacciComponent);
    fixture.componentInstance.generate();
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
    expect(button.textContent).toContain('Generated');
  });

  it('should add prime class to prime numbers', () => {
    const fixture = TestBed.createComponent(FibonacciComponent);
    fixture.componentInstance.generate();
    fixture.detectChanges();
    const primeItems = fixture.nativeElement.querySelectorAll('li.prime');
    expect(primeItems.length).toBeGreaterThan(0);
  });
});
