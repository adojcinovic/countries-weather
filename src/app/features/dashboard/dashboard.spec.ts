import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard';
import { Country } from '../../shared/models/country.model';

const mockCountries: Country[] = [
  {
    name: { common: 'Slovenia', official: 'Republic of Slovenia' },
    capital: ['Ljubljana'],
    population: 2100126,
    region: 'Europe',
    subregion: 'Central Europe',
    languages: { slv: 'Slovene' },
    flags: { png: 'si.png', svg: 'si.svg' },
    latlng: [46, 15],
    capitalInfo: { latlng: [46.05, 14.51] },
  },
  {
    name: { common: 'Germany', official: 'Federal Republic of Germany' },
    capital: ['Berlin'],
    population: 83240000,
    region: 'Europe',
    subregion: 'Western Europe',
    languages: { deu: 'German' },
    flags: { png: 'de.png', svg: 'de.svg' },
    latlng: [51, 9],
    capitalInfo: { latlng: [52.52, 13.4] },
  },
  {
    name: { common: 'Austria', official: 'Republic of Austria' },
    capital: ['Vienna'],
    population: 9006398,
    region: 'Europe',
    subregion: 'Central Europe',
    languages: { deu: 'German' },
    flags: { png: 'at.png', svg: 'at.svg' },
    latlng: [47.33, 13.33],
    capitalInfo: { latlng: [48.21, 16.37] },
  },
];

const europeUrl =
  'https://restcountries.com/v3.1/region/europe?fields=name,capital,population,region,subregion,languages,flags,latlng,capitalInfo';

describe('DashboardComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function createAndLoad() {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    httpMock.expectOne(europeUrl).flush(mockCountries);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    httpMock.expectOne(europeUrl).flush([]);
  });

  it('should show loading state initially', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.status')?.textContent).toContain('Loading');
    httpMock.expectOne(europeUrl).flush([]);
  });

  it('should display countries after loading', () => {
    const fixture = createAndLoad();
    const cards = fixture.nativeElement.querySelectorAll('app-country-card');
    expect(cards.length).toBe(3);
  });

  it('should show error on API failure', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    httpMock.expectOne(europeUrl).error(new ProgressEvent('error'));
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.error')?.textContent).toContain('Failed to load');
  });

  it('should filter countries by search term', () => {
    const fixture = createAndLoad();
    const component = fixture.componentInstance;

    component.searchTerm.set('slov');
    expect(component.filteredCountries().length).toBe(1);
    expect(component.filteredCountries()[0].name.common).toBe('Slovenia');
  });

  it('should filter countries by language', () => {
    const fixture = createAndLoad();
    const component = fixture.componentInstance;

    component.languageFilter.set('German');
    const result = component.filteredCountries();
    expect(result.length).toBe(2);
    expect(result.map((c) => c.name.common)).toContain('Germany');
    expect(result.map((c) => c.name.common)).toContain('Austria');
  });

  it('should sort countries by name', () => {
    const fixture = createAndLoad();
    const component = fixture.componentInstance;

    component.sortBy.set('name');
    const names = component.filteredCountries().map((c) => c.name.common);
    expect(names).toEqual(['Austria', 'Germany', 'Slovenia']);
  });

  it('should sort countries by population ascending', () => {
    const fixture = createAndLoad();
    const component = fixture.componentInstance;

    component.sortBy.set('pop-asc');
    const pops = component.filteredCountries().map((c) => c.population);
    expect(pops).toEqual([2100126, 9006398, 83240000]);
  });

  it('should sort countries by population descending', () => {
    const fixture = createAndLoad();
    const component = fixture.componentInstance;

    component.sortBy.set('pop-desc');
    const pops = component.filteredCountries().map((c) => c.population);
    expect(pops).toEqual([83240000, 9006398, 2100126]);
  });

  it('should extract unique languages sorted alphabetically', () => {
    const fixture = createAndLoad();
    const component = fixture.componentInstance;
    expect(component.allLanguages()).toEqual(['German', 'Slovene']);
  });

  it('should show no-match message when filter returns empty', () => {
    const fixture = createAndLoad();
    fixture.componentInstance.searchTerm.set('zzzzzzz');
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('No countries match');
  });

  it('should sort by temperature ascending with missing weather', () => {
    const fixture = createAndLoad();
    const component = fixture.componentInstance;
    component.sortBy.set('temp-asc');
    // All weather is undefined, so order is stable
    expect(component.filteredCountries().length).toBe(3);
  });

  it('should sort by temperature descending', () => {
    const fixture = createAndLoad();
    const component = fixture.componentInstance;
    component.sortBy.set('temp-desc');
    expect(component.filteredCountries().length).toBe(3);
  });
});
