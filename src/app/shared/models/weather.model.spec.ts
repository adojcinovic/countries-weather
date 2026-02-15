import { mapWeatherCode } from './weather.model';

describe('mapWeatherCode', () => {
  it('should return Clear sky for code 0', () => {
    expect(mapWeatherCode(0)).toEqual({ condition: 'Clear sky', emoji: '☀️' });
  });

  it('should return Partly cloudy for codes 1-3', () => {
    expect(mapWeatherCode(1).condition).toBe('Partly cloudy');
    expect(mapWeatherCode(3).condition).toBe('Partly cloudy');
  });

  it('should return Foggy for codes 4-49', () => {
    expect(mapWeatherCode(45).condition).toBe('Foggy');
    expect(mapWeatherCode(48).condition).toBe('Foggy');
  });

  it('should return Drizzle for codes 50-59', () => {
    expect(mapWeatherCode(51).condition).toBe('Drizzle');
    expect(mapWeatherCode(59).condition).toBe('Drizzle');
  });

  it('should return Rain for codes 60-69', () => {
    expect(mapWeatherCode(61).condition).toBe('Rain');
    expect(mapWeatherCode(69).condition).toBe('Rain');
  });

  it('should return Snow for codes 70-79', () => {
    expect(mapWeatherCode(71).condition).toBe('Snow');
    expect(mapWeatherCode(79).condition).toBe('Snow');
  });

  it('should return Rain showers for codes 80-82', () => {
    expect(mapWeatherCode(80).condition).toBe('Rain showers');
    expect(mapWeatherCode(82).condition).toBe('Rain showers');
  });

  it('should return Snow showers for codes 83-86', () => {
    expect(mapWeatherCode(83).condition).toBe('Snow showers');
    expect(mapWeatherCode(86).condition).toBe('Snow showers');
  });

  it('should return Thunderstorm for codes 87-99', () => {
    expect(mapWeatherCode(95).condition).toBe('Thunderstorm');
    expect(mapWeatherCode(99).condition).toBe('Thunderstorm');
  });

  it('should return Unknown for codes >= 100', () => {
    expect(mapWeatherCode(100)).toEqual({ condition: 'Unknown', emoji: '❓' });
  });
});
