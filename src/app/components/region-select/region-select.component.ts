import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Theme } from 'src/app/models/theme.enum';

@Component({
  selector: 'app-region-select',
  templateUrl: './region-select.component.html',
  styleUrls: ['./region-select.component.scss']
})
export class RegionSelectComponent implements OnChanges {

  showOptions = false;
  option = 'All';
  darkMode = false;
  @Input() options: string[] = [];
  @Input() theme!: Theme;
  @Output() optionChanged = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    this.darkMode = changes.theme.currentValue === Theme.Dark;
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  optionSelected(option: string): void {
    this.showOptions = false;
    this.option = option;
    this.optionChanged.emit(option);
  }

}
