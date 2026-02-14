import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'fibonacci', pathMatch: 'full' },
  {
    path: 'fibonacci',
    loadComponent: () =>
      import('./features/fibonacci/fibonacci').then((m) => m.FibonacciComponent),
  },
  {
    path: 'country',
    loadComponent: () =>
      import('./features/country-detail/country-detail').then((m) => m.CountryDetailComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((m) => m.DashboardComponent),
  },
];
