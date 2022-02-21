import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TableColumnConfig } from 'src/app/table-data/types/table.types';

import { CandidateModel } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';

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

  constructor(private _dataService: CandidateService, private router: Router) {}

  ngOnInit() {
    this.tableDataSource$ = this._dataService.findAll().pipe(
      map((candidates) => {
        return candidates.getItems();
      })
    );
  }

  onRowClicked(entityRow: CandidateModel) {
    this.router.navigate(['candidates', entityRow.id]);
  }
}

export const CANDIDATES_LIST_TABLE_COLUMNS: TableColumnConfig[] = [
  {
    key: 'lastname',
    title: 'Lastname',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
    },
  },
  {
    key: 'firstname',
    title: 'Firstname',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
    },
  },
  {
    key: 'email',
    title: 'E-mail',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
    },
  },
];
