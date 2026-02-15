import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { CountryService } from '../../core/services/country.service';
import { CountryCardComponent } from '../../shared/components/country-card/country-card';
import { Country, CountryWithWeather } from '../../shared/models/country.model';

type SortOption = 'name' | 'pop-asc' | 'pop-desc' | 'temp-asc' | 'temp-desc';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  imports: [FormsModule, CountryCardComponent],
})
export class DashboardComponent implements OnInit {
  countries = signal<CountryWithWeather[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  searchTerm = signal('');
  sortBy = signal<SortOption>('name');
  languageFilter = signal('');
  allLanguages = signal<string[]>([]);

  filteredCountries = computed(() => {
    let result = this.countries();

    const term = this.searchTerm();
    if (term) {
      const lower = term.toLowerCase();
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(lower)
      );
    }

    const lang = this.languageFilter();
    if (lang) {
      result = result.filter(
        (c) =>
          c.languages &&
          Object.values(c.languages).includes(lang)
      );
    }

    return this.sortCountries(result, this.sortBy());
  });

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getEuropeanCountries().pipe(take(1)).subscribe({
      next: (countries) => {
        this.countries.set(countries);
        this.allLanguages.set(this.extractLanguages(countries));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load countries. Please try again later.');
        this.loading.set(false);
      },
    });
  }

  private extractLanguages(countries: Country[]): string[] {
    const langSet = new Set<string>();
    countries.forEach((c) => {
      if (c.languages) {
        Object.values(c.languages).forEach((lang) => langSet.add(lang));
      }
    });
    return [...langSet].sort();
  }

  private sortCountries(list: CountryWithWeather[], sort: SortOption): CountryWithWeather[] {
    const sorted = [...list];
    switch (sort) {
      case 'name':
        return sorted.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
      case 'pop-asc':
        return sorted.sort((a, b) => a.population - b.population);
      case 'pop-desc':
        return sorted.sort((a, b) => b.population - a.population);
      case 'temp-asc':
        return sorted.sort(
          (a, b) =>
            (a.weather?.temperature ?? Infinity) -
            (b.weather?.temperature ?? Infinity)
        );
      case 'temp-desc':
        return sorted.sort(
          (a, b) =>
            (b.weather?.temperature ?? -Infinity) -
            (a.weather?.temperature ?? -Infinity)
        );
    }
  }
}
