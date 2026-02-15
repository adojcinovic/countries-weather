import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CountryCardComponent } from './country-card';
import { CountryWithWeather } from '../../models/country.model';

const mockCountry: CountryWithWeather = {
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

const mockWeatherResponse = {
  current: {
    temperature_2m: 15.5,
    apparent_temperature: 13.2,
    relative_humidity_2m: 65,
    wind_speed_10m: 12.3,
    weather_code: 0,
  },
};

describe('CountryCardComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryCardComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function createComponent() {
    const fixture = TestBed.createComponent(CountryCardComponent);
    fixture.componentInstance.country = mockCountry;
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display country name and capital', () => {
    const fixture = createComponent();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Slovenia');
    expect(el.textContent).toContain('Ljubljana');
  });

  it('should display formatted population', () => {
    const fixture = createComponent();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('2,100,126');
  });

  it('should start with hovered = false and no weather$', () => {
    const fixture = createComponent();
    const component = fixture.componentInstance;
    expect(component.hovered).toBeFalse();
    expect(component.weather$).toBeNull();
  });

  it('should fetch weather on hover', () => {
    const fixture = createComponent();
    const component = fixture.componentInstance;

    component.onHover();
    fixture.detectChanges(); // async pipe subscribes here

    expect(component.hovered).toBeTrue();
    expect(component.weather$).toBeTruthy();

    httpMock.expectOne((r) => r.url.includes('open-meteo.com')).flush(mockWeatherResponse);
  });

  it('should not re-fetch weather on second hover', () => {
    const fixture = createComponent();
    const component = fixture.componentInstance;

    component.onHover();
    fixture.detectChanges();
    const firstWeather$ = component.weather$;

    httpMock.expectOne((r) => r.url.includes('open-meteo.com')).flush(mockWeatherResponse);
    fixture.detectChanges();

    component.hovered = false;
    fixture.detectChanges();

    component.onHover();
    fixture.detectChanges();

    expect(component.weather$).toBe(firstWeather$);
    // No new HTTP request thanks to shareReplay
  });

  it('should handle country without capital coordinates', () => {
    const fixture = TestBed.createComponent(CountryCardComponent);
    fixture.componentInstance.country = {
      ...mockCountry,
      capitalInfo: {},
    };
    fixture.detectChanges();

    fixture.componentInstance.onHover();
    fixture.detectChanges();

    expect(fixture.componentInstance.weather$).toBeTruthy();
    // No HTTP request — weather$ emits null via of(null)
  });

  it('should handle API error gracefully', () => {
    const fixture = createComponent();
    const component = fixture.componentInstance;

    component.onHover();
    fixture.detectChanges();

    httpMock.expectOne((r) => r.url.includes('open-meteo.com')).error(new ProgressEvent('error'));
    fixture.detectChanges();

    // catchError returns of(null), async pipe gets null (falsy)
    // hovered is true and weather$ exists, so loading spinner shows
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.card-loading') || el.querySelector('.card-default')).toBeTruthy();
  });

  it('should show weather overlay when hovered and weather loaded', () => {
    const fixture = createComponent();
    const component = fixture.componentInstance;

    component.onHover();
    fixture.detectChanges();

    httpMock.expectOne((r) => r.url.includes('open-meteo.com')).flush(mockWeatherResponse);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.overlay')).toBeTruthy();
    expect(el.textContent).toContain('15.5°C');
    expect(el.textContent).toContain('Clear sky');
  });
});
