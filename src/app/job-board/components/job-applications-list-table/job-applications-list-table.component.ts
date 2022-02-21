import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TableColumnConfig } from 'src/app/table-data/types/table.types';

import { JobApplicationModel } from '../../models/job-application.model';

@Component({
  selector: 'ahr-job-applications-list-table',
  template: `
    <div class="container-list">
      <ahr2-table-data
        [dataSource]="tableDataSource$"
        [columns]="columns"
        (onRowClicked)="onRowClicked($event)"
      >
      </ahr2-table-data>
    </div>
  `,
})
export class JobApplicationsListTableComponent implements OnInit {
  @Input()
  tableDataSource$: Observable<JobApplicationModel[]>;

  columns = JA_LIST_TABLE_COLUMNS;

  constructor(private router: Router) {}

  ngOnInit() {}

  onRowClicked(entityRow: any) {
    this.router.navigate(['job-application', entityRow.id]);
  }
}

const JA_LIST_TABLE_COLUMNS: TableColumnConfig[] = [
  {
    key: 'candidatesId',
    title: 'Lastname',
    objectProp: 'lastname',
    sortable: false,
    headerStyle: {
      'min-width': '80px',
      'text-align': 'center',
    },
  },
  {
    key: 'candidatesId',
    title: 'Firstname',
    objectProp: 'firstname',
    sortable: false,
    headerStyle: {
      'min-width': '80px',
      'text-align': 'center',
    },
  },
  {
    key: 'jaworkingstatusesId',
    title: 'Status',
    objectProp: 'value',
    sortable: false,
    headerStyle: {
      'min-width': '80px',
      'text-align': 'center',
    },
  },
  {
    key: 'createdAt',
    title: 'Created at',
    type: 'date',
    sortable: false,
    headerStyle: {
      'min-width': '80px',
      'text-align': 'center',
      'padding-inline': '0.5rem',
      'word-break': 'break-all',
    },
    cellStyle: {
      'text-align': 'center',
    },
  },
  {
    key: 'updatedAt',
    title: 'Updated at',
    type: 'date',
    sortable: false,
    headerStyle: {
      'min-width': '80px',
      'text-align': 'center',
      'padding-inline': '0.5rem',
    },
    cellStyle: {
      'text-align': 'center',
    },
  },
];
