import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CountryService } from '../../core/services/country.service';
import { Country } from '../../shared/models/country.model';
import { Observable, catchError, map, of } from 'rxjs';

interface CountryDetailState {
  country: Country | null;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.scss',
  imports: [AsyncPipe],
})
export class CountryDetailComponent {
  state$: Observable<CountryDetailState>;

  constructor(private countryService: CountryService) {
    this.state$ = this.countryService.getCountryByName('Slovenia').pipe(
      map((data) => ({ country: data[0], loading: false, error: null })),
      catchError(() =>
        of({ country: null, loading: false, error: 'Failed to load country data. Please try again later.' })
      )
    );
  }

  getLanguages(country: Country): string {
    if (!country.languages) return '';
    return Object.values(country.languages).join(', ');
  }
}
