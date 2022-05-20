import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Theme } from 'src/app/models/theme.enum';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnChanges {

  @Input() theme!: Theme;
  @Output() themeChanged = new EventEmitter<Theme>();
  lightMode = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.lightMode = changes.theme.currentValue === Theme.Light;
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
