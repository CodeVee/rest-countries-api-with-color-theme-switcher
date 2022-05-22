import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { Theme } from 'src/app/models/theme.enum';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent implements OnChanges {

  @Input() country!: Country;
  @Input() theme!: Theme;
  darkMode = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.darkMode = changes.theme.currentValue === Theme.Dark;
  }
}
