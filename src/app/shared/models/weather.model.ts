export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  condition: string;
  emoji: string;
}

export interface WeatherApiResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

export function mapWeatherCode(code: number): { condition: string; emoji: string } {
  if (code === 0) return { condition: 'Clear sky', emoji: '☀️' };
  if (code <= 3) return { condition: 'Partly cloudy', emoji: '⛅' };
  if (code <= 49) return { condition: 'Foggy', emoji: '🌫️' };
  if (code <= 59) return { condition: 'Drizzle', emoji: '🌦️' };
  if (code <= 69) return { condition: 'Rain', emoji: '🌧️' };
  if (code <= 79) return { condition: 'Snow', emoji: '🌨️' };
  if (code <= 82) return { condition: 'Rain showers', emoji: '🌧️' };
  if (code <= 86) return { condition: 'Snow showers', emoji: '🌨️' };
  if (code <= 99) return { condition: 'Thunderstorm', emoji: '⛈️' };
  return { condition: 'Unknown', emoji: '❓' };
}
