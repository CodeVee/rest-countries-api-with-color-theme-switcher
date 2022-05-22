import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Theme } from 'src/app/models/theme.enum';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnChanges {

  @Input() theme!: Theme;
  @Output() themeChanged = new EventEmitter<Theme>();
  darkMode = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.darkMode = changes.theme.currentValue === Theme.Dark;
  }

  switchTheme(): void {
    switch (this.theme) {
      case Theme.Dark:
        this.themeChanged.emit(Theme.Light);
        break;
      default:
        this.themeChanged.emit(Theme.Dark);
        break;
    }
  }

}
