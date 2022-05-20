import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-region-select',
  templateUrl: './region-select.component.html',
  styleUrls: ['./region-select.component.scss']
})
export class RegionSelectComponent {

  showOptions = false;
  option = 'All';
  @Input() options: string[] = [];
  @Output() optionChanged = new EventEmitter<string>();

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  optionSelected(option: string): void {
    this.showOptions = false;
    this.option = option;
    this.optionChanged.emit(option);
  }

}
