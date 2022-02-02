import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SearchService } from 'src/app/shared/services/search.service';
import { CANDIDATES_LIST_TABLE_COLUMNS } from '../../config/candidates.config';
import { CandidatesService } from '../../services/candidates.service';
import { CandidateModel } from '../../types/candidates.types';

@Component({
  selector: 'ahr-candidates-list',
  template: `
    <div class="container-list">
      <ahr2-table-data
        [dataSource]="tableDataSource$"
        [columns]="columns"
        (onRowClicked)="onRowClicked($event)"
      ></ahr2-table-data>
    </div>
  `,
})
export class CandidatesListComponent implements OnInit {
  tableDataSource$: BehaviorSubject<CandidateModel[]> = new BehaviorSubject<
    CandidateModel[]
  >([]);

  tableDataSourceSubscription: Subscription;
  columns = CANDIDATES_LIST_TABLE_COLUMNS;

  constructor(
    private _dataService: CandidatesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tableDataSourceSubscription = this._dataService
      .findAll()
      .subscribe((entities: CandidateModel[]) => {
        this.tableDataSource$.next(entities);
      });
  }

  onRowClicked(entityRow: CandidateModel) {
    this.router.navigate(['candidates', entityRow.id]);
  }

  ngOnDestroy() {
    this.tableDataSourceSubscription.unsubscribe();
  }
}
