import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  textCtrl = new FormControl('');
  @Output() textChanged = new EventEmitter<string>();
  protected sub = new Subject();

  ngOnInit(): void {
    this.textCtrl.valueChanges.pipe(takeUntil(this.sub))
    .subscribe(val => this.textChanged.emit(val));
  }

  ngOnDestroy(): void {
    this.sub.next();
    this.sub.complete();
  }

}
