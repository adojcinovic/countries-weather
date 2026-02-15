import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CountryDetailComponent } from './country-detail';
import { Country } from '../../shared/models/country.model';

const mockCountry: Country = {
  name: { common: 'Slovenia', official: 'Republic of Slovenia' },
  capital: ['Ljubljana'],
  population: 2100126,
  region: 'Europe',
  subregion: 'Central Europe',
  languages: { slv: 'Slovene', eng: 'English' },
  flags: { png: 'flag.png', svg: 'flag.svg', alt: 'Slovenian flag' },
  latlng: [46, 15],
  capitalInfo: { latlng: [46.05, 14.51] },
};

const apiUrl = 'https://restcountries.com/v3.1/name/Slovenia?fullText=true';

describe('CountryDetailComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryDetailComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CountryDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    httpMock.expectOne(apiUrl).flush([mockCountry]);
  });

  it('should display loading state initially', () => {
    const fixture = TestBed.createComponent(CountryDetailComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.loading')?.textContent).toContain('Loading');
    httpMock.expectOne(apiUrl).flush([mockCountry]);
  });

  it('should display country data after loading', () => {
    const fixture = TestBed.createComponent(CountryDetailComponent);
    fixture.detectChanges();

    httpMock.expectOne(apiUrl).flush([mockCountry]);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Slovenia');
    expect(el.querySelector('.flag')).toBeTruthy();
  });

  it('should display error on API failure', () => {
    const fixture = TestBed.createComponent(CountryDetailComponent);
    fixture.detectChanges();

    httpMock.expectOne(apiUrl).error(new ProgressEvent('error'));
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.error')?.textContent).toContain('Failed to load');
  });

  it('should format languages as comma-separated list', () => {
    const fixture = TestBed.createComponent(CountryDetailComponent);
    fixture.detectChanges();
    httpMock.expectOne(apiUrl).flush([mockCountry]);

    expect(fixture.componentInstance.getLanguages(mockCountry)).toBe('Slovene, English');
  });

  it('should return empty string for country without languages', () => {
    const fixture = TestBed.createComponent(CountryDetailComponent);
    fixture.detectChanges();
    httpMock.expectOne(apiUrl).flush([mockCountry]);

    const noLang = { ...mockCountry, languages: undefined } as unknown as Country;
    expect(fixture.componentInstance.getLanguages(noLang)).toBe('');
  });
});
