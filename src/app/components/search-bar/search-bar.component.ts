import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from 'src/app/models/theme.enum';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy, OnChanges {

  textCtrl = new FormControl('');
  darkMode = false;
  @Input() theme!: Theme;
  @Output() textChanged = new EventEmitter<string>();
  protected sub = new Subject();

  ngOnInit(): void {
    this.textCtrl.valueChanges.pipe(takeUntil(this.sub))
    .subscribe(val => this.textChanged.emit(val));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.darkMode = changes.theme.currentValue === Theme.Dark;
  }

  ngOnDestroy(): void {
    this.sub.next();
    this.sub.complete();
  }

}
