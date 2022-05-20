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
  filteredCountries: Country[] = [];
  protected sub = new Subject();

  constructor(private themeService: ThemeService,
              private countryService: CountryService) { }

  ngOnInit(): void {
    this.themeService.currentTheme$.pipe(takeUntil(this.sub))
    .subscribe(theme => this.theme = theme);

    this.countryService.getAllCountries()
    .pipe(takeUntil(this.sub))
    .subscribe(res => {
      this.countries = res.slice(0, 4);
      this.filteredCountries = [ ...this.countries ];
    });
  }

  ngOnDestroy(): void {
    this.sub.next();
    this.sub.complete();
  }

  updateTheme(theme: Theme): void {
    this.themeService.changeTheme(theme);
  }

  filterCountries(text: string): void {
    this.filteredCountries = this.countries
    .filter(country => country.name.toLowerCase().includes(text.toLowerCase()));
  }
 }
