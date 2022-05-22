import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Country } from 'src/app/models/country.model';
import { Theme } from 'src/app/models/theme.enum';
import { CountryService } from 'src/app/services/country.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {

  country$!: Observable<Country>;
  theme!: Theme;
  darkMode = false;
  protected sub = new Subject();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private countryService: CountryService,
              private  title: Title,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.currentTheme$.pipe(takeUntil(this.sub))
    .subscribe(theme => {
      this.theme = theme;
      this.darkMode = this.theme === Theme.Dark;
    });

    this.country$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const country = params.get('country')!;
        this.title.setTitle(`Countries: ${country}`);
        return this.countryService.getCountry(country);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.next();
    this.sub.complete();
  }

  returnHome(): void {
    this.router.navigate(['/']);
  }

}
