import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Country } from '../../shared/models/country.model';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly baseUrl = 'https://restcountries.com/v3.1';
  private europeanCountriesCache: Country[] | null = null;
  private countryByNameCache = new Map<string, Country[]>();

  constructor(private http: HttpClient) {}

  getCountryByName(name: string): Observable<Country[]> {
    const cached = this.countryByNameCache.get(name);
    if (cached) {
      return of(cached);
    }

    return this.http
      .get<Country[]>(`${this.baseUrl}/name/${name}?fullText=true`)
      .pipe(tap((countries) => this.countryByNameCache.set(name, countries)));
  }

  getEuropeanCountries(): Observable<Country[]> {
    if (this.europeanCountriesCache) {
      return of(this.europeanCountriesCache);
    }

    return this.http
      .get<Country[]>(
        `${this.baseUrl}/region/europe?fields=name,capital,population,region,subregion,languages,flags,latlng,capitalInfo`
      )
      .pipe(tap((countries) => (this.europeanCountriesCache = countries)));
  }
}
