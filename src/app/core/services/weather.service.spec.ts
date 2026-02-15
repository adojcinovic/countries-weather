import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';

const mockApiResponse = {
  current: {
    temperature_2m: 15.5,
    apparent_temperature: 13.2,
    relative_humidity_2m: 65,
    wind_speed_10m: 12.3,
    weather_code: 0,
  },
};

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and map weather data', () => {
    service.getWeather(46.05, 14.51).subscribe((data) => {
      expect(data.temperature).toBe(15.5);
      expect(data.feelsLike).toBe(13.2);
      expect(data.humidity).toBe(65);
      expect(data.windSpeed).toBe(12.3);
      expect(data.weatherCode).toBe(0);
      expect(data.condition).toBe('Clear sky');
      expect(data.emoji).toBe('☀️');
    });

    const req = httpMock.expectOne(
      (r) => r.url === 'https://api.open-meteo.com/v1/forecast'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('latitude')).toBe('46.05');
    expect(req.request.params.get('longitude')).toBe('14.51');
    req.flush(mockApiResponse);
  });

  it('should map cloudy weather code correctly', () => {
    service.getWeather(0, 0).subscribe((data) => {
      expect(data.condition).toBe('Partly cloudy');
    });

    const req = httpMock.expectOne(
      (r) => r.url === 'https://api.open-meteo.com/v1/forecast'
    );
    req.flush({
      current: { ...mockApiResponse.current, weather_code: 2 },
    });
  });
});
