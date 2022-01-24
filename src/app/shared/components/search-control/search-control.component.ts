import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'ahr-search-control',
  template: `
    <div class="ahr-search-control">
      <input
        matInput
        type="text"
        placeholder="Search..."
        [(ngModel)]="searchValue"
      />
      <div class="ahr-search-input-icons">
        <mat-icon *ngIf="!searchValue">search</mat-icon>

        <button
          *ngIf="searchValue"
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="searchValue = ''"
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./search-control.component.scss'],
})
export class SearchControlComponent implements OnInit {
  @Input()
  dataSet$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  @Output()
  dataSetFilteredEvent: EventEmitter<any> = new EventEmitter();

  searchValue: string = '';
  searchFormControl: FormControl = new FormControl();

  constructor() {}

  ngOnInit(): void {
    // combineLatest([
    //   this.dataSet$,
    //   this.searchFormControl.valueChanges,
    // ]).subscribe(([dataSetRecords, searchTerm]) => {
    //   const dataSetArray = Object.values(dataSetRecords);
    //   let filteredRecords: any[];
    //   if (!searchTerm) {
    //     filteredRecords = dataSetArray;
    //   } else {
    //     const filteredResults = dataSetArray.filter((item) => {
    //       return Object.values(item).reduce((prev, curr) => {
    //         return (
    //           prev ||
    //           curr.toString().toLowerCase().includes(searchTerm.toLowerCase())
    //         );
    //       }, false);
    //     });
    //     filteredRecords = filteredResults;
    //   }
    //   this.dataSetFilteredEvent.emit(filteredRecords);
    // });
    // this.searchFormControl.setValue('');
  }
}
