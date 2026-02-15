import { PopulationPipe } from './population.pipe';

describe('PopulationPipe', () => {
  let pipe: PopulationPipe;

  beforeEach(() => {
    pipe = new PopulationPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format numbers with thousands separators', () => {
    expect(pipe.transform(1234567)).toBe('1,234,567');
  });

  it('should format small numbers without separators', () => {
    expect(pipe.transform(100)).toBe('100');
  });

  it('should return empty string for null', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should return empty string for undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should handle zero', () => {
    expect(pipe.transform(0)).toBe('0');
  });
});
