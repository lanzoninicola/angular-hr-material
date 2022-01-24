import { Injectable, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {
  searchFormControl: FormControl;
  dataSet$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  dataSetFiltered$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {}

  setupControl(formControl: FormControl) {
    this.searchFormControl = formControl;
  }

  setupData(dataSet: any[]) {
    this.dataSet$.next(dataSet);
  }

  ngOnInit(): void {
    combineLatest([
      this.dataSet$,
      this.searchFormControl.valueChanges,
    ]).subscribe(([dataSetRecords, searchTerm]) => {
      const dataSetArray = Object.values(dataSetRecords);
      let filteredRecords: any[];

      if (!searchTerm) {
        filteredRecords = dataSetArray;
      } else {
        const filteredResults = dataSetArray.filter((item) => {
          return Object.values(item).reduce((prev, curr) => {
            return (
              prev ||
              curr.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
          }, false);
        });
        filteredRecords = filteredResults;
      }

      this.dataSetFiltered$.next(filteredRecords);
    });

    this.searchFormControl.setValue('');
  }
}
