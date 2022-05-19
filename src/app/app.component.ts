import { Component } from '@angular/core';
import { Theme } from './models/theme.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theme = Theme.Light;

  private changeTheme(theme: Theme): void {
    this.theme = theme;
  }
 }
