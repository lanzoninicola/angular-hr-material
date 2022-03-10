import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { searchable } from 'src/app/shared/mixins/searchable.mixin';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchFormControl: AbstractControl;
  dataSetFiltered$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {}

  /**
   * @description
   * Provides the 'FormControl' instance responsible to handle the value to search.
   * Required to setup the search service
   *
   * @param FormControl
   */
  setupControl(formControl: AbstractControl) {
    this.searchFormControl = formControl;
  }

  /**
   * @source
   * https://medium.com/angular-in-depth/angular-cdk-tables-1537774d7c99
   *
   * @param dataset - It is the collection used to populate the table
   *
   * @return dataSetFiltered - Subscribe to it for updating the table content according to the search criteria
   */
  addListener(dataset: Observable<any[]>): BehaviorSubject<any[]> {
    if (this.searchFormControl === undefined) {
      throw 'SearchService: the formControl is undefined. \n\nMaybe you forgot to provide the FormControl instance through the .setupControl() method before performing a search with the .filter() method';
    }

    combineLatest([dataset, this.searchFormControl?.valueChanges]).subscribe(
      ([dataSetRecords, searchTerm]) => {
        let filteredRecords: any[] = [...dataSetRecords];

        const filteredResults = dataSetRecords.filter((item) => {
          // used mixin "searchable". It make available the isMatchingSearches() method to search content inside the object
          Object.assign(item, searchable);
          return item.isMatchingSearches(searchTerm);
        });

        filteredRecords = filteredResults;

        this.dataSetFiltered$.next(filteredRecords);
      }
    );

    return this.dataSetFiltered$;
  }
}
