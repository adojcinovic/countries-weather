import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getCountryByName(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.baseUrl}/name/${name}?fullText=true`
    );
  }

  getEuropeanCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.baseUrl}/region/europe?fields=name,capital,population,region,subregion,languages,flags,latlng,capitalInfo`
    );
  }
}
