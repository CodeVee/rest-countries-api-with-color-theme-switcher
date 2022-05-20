import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country } from './models/country.model';
import { Theme } from './models/theme.enum';
import { CountryService } from './services/country.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  theme!: Theme;
  countries: Country[] = [];
  regionalCountries: Country[] = [];
  filteredCountries: Country[] = [];
  options: string[] = [];
  searchText = '';
  protected sub = new Subject();

  constructor(private themeService: ThemeService,
              private countryService: CountryService) { }

  ngOnInit(): void {
    this.themeService.currentTheme$.pipe(takeUntil(this.sub))
    .subscribe(theme => this.theme = theme);

    this.countryService.getAllCountries()
    .pipe(takeUntil(this.sub))
    .subscribe(res => {
      this.options = [ ...new Set(res.map(c => c.region)) ];
      this.countries = res.slice(0, 12);
      this.regionalCountries = [ ...this.countries ];
      this.filteredCountries = [ ...this.regionalCountries ];
    });
  }

  ngOnDestroy(): void {
    this.sub.next();
    this.sub.complete();
  }

  updateTheme(theme: Theme): void {
    this.themeService.changeTheme(theme);
  }

  updateSearch(text: string): void {
    this.searchText = text.toLowerCase();
    this.filterCountries();
  }

  filterCountries(): void {
    this.filteredCountries = this.regionalCountries
    .filter(country => country.name.toLowerCase().includes(this.searchText));
  }

  filterByRegion(region: string): void {
    if (region === 'All') {
      this.regionalCountries = [ ...this.countries];

    } else {
      this.regionalCountries = this.countries
      .filter(country => country.region === region);
    }
    this.filterCountries();
  }
 }
