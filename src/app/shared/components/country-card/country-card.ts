import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PopulationPipe } from '../../pipes/population.pipe';
import { CountryWithWeather } from '../../models/country.model';
import { WeatherService } from '../../../core/services/weather.service';
import { WeatherData } from '../../models/weather.model';
import { Observable, of, catchError, shareReplay } from 'rxjs';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.html',
  styleUrl: './country-card.scss',
  imports: [AsyncPipe, PopulationPipe],
})
export class CountryCardComponent {
  @Input({ required: true }) country!: CountryWithWeather;

  hovered = false;
  weather$: Observable<WeatherData | null> | null = null;

  constructor(private weatherService: WeatherService) {}

  onHover(): void {
    this.hovered = true;
    if (!this.weather$) {
      this.fetchWeather();
    }
  }

  private fetchWeather(): void {
    const coords = this.country.capitalInfo?.latlng;
    if (!coords || coords.length < 2) {
      this.weather$ = of(null);
      return;
    }

    this.weather$ = this.weatherService.getWeather(coords[0], coords[1]).pipe(
      catchError(() => of(null)),
      shareReplay(1)
    );
  }
}
