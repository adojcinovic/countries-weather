import { WeatherData } from './weather.model';

export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  languages: Record<string, string>;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  latlng: number[];
  capitalInfo: {
    latlng?: number[];
  };
}

export interface CountryWithWeather extends Country {
  weather?: WeatherData | null; // undefined = loading, null = failed, WeatherData = loaded
}
