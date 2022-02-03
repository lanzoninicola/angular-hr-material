import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
  tableDataSource$: Observable<CandidateModel[]>;

  columns = CANDIDATES_LIST_TABLE_COLUMNS;

  constructor(
    private _dataService: CandidatesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tableDataSource$ = this._dataService.findAll();
  }

  onRowClicked(entityRow: CandidateModel) {
    this.router.navigate(['candidates', entityRow.id]);
  }
}
