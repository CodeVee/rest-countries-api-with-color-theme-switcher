import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  protected baseUrl = 'https://restcountries.com/v2/';
  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}all`);
  }

  getCountry(country: string): Observable<Country> {
    return this.http.get<Country[]>(`${this.baseUrl}name/${country}`)
    .pipe(map(res => res[0]));
  }
}
