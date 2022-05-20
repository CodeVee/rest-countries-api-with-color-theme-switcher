import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  countries: Country[] = [];
  regionalCountries: Country[] = [];
  filteredCountries: Country[] = [];
  options: string[] = [];
  searchText = '';
  protected sub = new Subject();

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getAllCountries()
    .pipe(takeUntil(this.sub))
    .subscribe(res => {
      this.options = [ ...new Set(res.map(c => c.region)) ];
      this.countries = res.slice(0, 32);
      this.regionalCountries = [ ...this.countries ];
      this.filteredCountries = [ ...this.regionalCountries ];
    });
  }

  ngOnDestroy(): void {
    this.sub.next();
    this.sub.complete();
  }

  updateSearch(text: string): void {
    this.searchText = text.toLowerCase();
    this.filterCountries();
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

  private filterCountries(): void {
    this.filteredCountries = this.regionalCountries
    .filter(country => country.name.toLowerCase().includes(this.searchText));
  }

}
