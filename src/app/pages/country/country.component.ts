import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  country$!: Observable<Country>;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private countryService: CountryService,
              private  title: Title) { }

  ngOnInit(): void {
    this.country$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const country = params.get('country')!;
        this.title.setTitle(`Countries: ${country}`);
        return this.countryService.getCountry(country);
      })
    );
  }

  returnHome(): void {
    this.router.navigate(['/']);
  }

}
