import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchFormControl: AbstractControl;
  dataSet$: BehaviorSubject<any[] | Observable<any[]>> = new BehaviorSubject<
    any[] | Observable<any[]>
  >([]);

  dataSetFiltered$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {}

  setupControl(formControl: AbstractControl) {
    this.searchFormControl = formControl;
  }

  setupData(dataSet: any[] | Observable<any[]>): void {
    this.dataSet$.next(dataSet);
  }

  controlOnChange() {
    combineLatest([
      this.dataSet$,
      this.searchFormControl.valueChanges,
    ]).subscribe(([dataSetRecords, searchTerm]) => {
      const dataSetArray = Object.values(dataSetRecords);
      let filteredRecords: any[];

      console.log(dataSetRecords);

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
  }
}
