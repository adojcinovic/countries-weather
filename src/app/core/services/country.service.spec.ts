import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CountryService } from './country.service';
import { Country } from '../../shared/models/country.model';

const mockCountry: Country = {
  name: { common: 'Slovenia', official: 'Republic of Slovenia' },
  capital: ['Ljubljana'],
  population: 2100126,
  region: 'Europe',
  subregion: 'Central Europe',
  languages: { slv: 'Slovene' },
  flags: { png: 'flag.png', svg: 'flag.svg' },
  latlng: [46, 15],
  capitalInfo: { latlng: [46.05, 14.51] },
};

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCountryByName', () => {
    it('should fetch country by name', () => {
      service.getCountryByName('Slovenia').subscribe((countries) => {
        expect(countries.length).toBe(1);
        expect(countries[0].name.common).toBe('Slovenia');
      });

      const req = httpMock.expectOne(
        'https://restcountries.com/v3.1/name/Slovenia?fullText=true'
      );
      expect(req.request.method).toBe('GET');
      req.flush([mockCountry]);
    });

    it('should return cached data on second call', () => {
      // First call
      service.getCountryByName('Slovenia').subscribe();
      httpMock.expectOne('https://restcountries.com/v3.1/name/Slovenia?fullText=true').flush([mockCountry]);

      // Second call — should use cache, no HTTP request
      service.getCountryByName('Slovenia').subscribe((countries) => {
        expect(countries[0].name.common).toBe('Slovenia');
      });

      httpMock.expectNone('https://restcountries.com/v3.1/name/Slovenia?fullText=true');
    });
  });

  describe('getEuropeanCountries', () => {
    const url =
      'https://restcountries.com/v3.1/region/europe?fields=name,capital,population,region,subregion,languages,flags,latlng,capitalInfo';

    it('should fetch European countries', () => {
      service.getEuropeanCountries().subscribe((countries) => {
        expect(countries.length).toBe(1);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush([mockCountry]);
    });

    it('should return cached data on second call', () => {
      service.getEuropeanCountries().subscribe();
      httpMock.expectOne(url).flush([mockCountry]);

      service.getEuropeanCountries().subscribe((countries) => {
        expect(countries.length).toBe(1);
      });

      httpMock.expectNone(url);
    });
  });
});
