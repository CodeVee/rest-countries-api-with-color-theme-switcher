import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Country, CountryBucket } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  protected baseUrl = 'https://restcountries.com/v2/';
  private countries: Country[] = [];
  private countriesBucket: CountryBucket = {};
  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    if (this.countries.length) {
      return of(this.countries);
    }
    return this.http.get<Country[]>(`${this.baseUrl}all`).pipe(tap(countries => this.countries = countries));
  }

  getCountry(country: string): Observable<Country> {
    if (this.countriesBucket.hasOwnProperty(country)) {
      return of(this.countriesBucket[country]);
    }
    return this.http.get<Country[]>(`${this.baseUrl}name/${country}`)
    .pipe(tap(res => this.countriesBucket[country] = res[0]), map(res => res[0]));
  }
}
