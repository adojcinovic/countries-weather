import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherApiResponse, WeatherData, mapWeatherCode } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<WeatherData> {
    return this.http
      .get<WeatherApiResponse>(this.baseUrl, {
        params: {
          latitude: lat.toString(),
          longitude: lon.toString(),
          current:
            'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
        },
      })
      .pipe(
        map((res) => {
          const c = res.current;
          const { condition, emoji } = mapWeatherCode(c.weather_code);
          return {
            temperature: c.temperature_2m,
            feelsLike: c.apparent_temperature,
            humidity: c.relative_humidity_2m,
            windSpeed: c.wind_speed_10m,
            weatherCode: c.weather_code,
            condition,
            emoji,
          };
        })
      );
  }
}
