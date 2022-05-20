import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from './models/theme.enum';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  theme!: Theme;
  protected sub = new Subject();
  osapa = ''

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.currentTheme$.pipe(takeUntil(this.sub))
    .subscribe(theme => this.theme = theme);
  }

  ngOnDestroy(): void {
    this.sub.next();
    this.sub.complete();
  }

  updateTheme(theme: Theme): void {
    this.themeService.changeTheme(theme);
  }
 }
