import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TableColumnConfig } from 'src/app/table-data/types/table.types';

import { JobApplicationModel } from '../../models/job-application.model';
import { CandidateIdBadgeComponent } from '../candidate-id-badge/candidate-id-badge.component';
import { JobidBadgeComponent } from '../jobid-badge/jobid-badge.component';

@Component({
  selector: 'ahr-job-application-list-table',
  template: `
    <ahr2-table-data
      [dataSource]="tableDataSource$"
      [columns]="columns"
      (onRowClicked)="onRowClicked($event)"
    >
    </ahr2-table-data>
  `,
})
export class JobApplicationListTableComponent implements OnInit {
  @Input()
  tableDataSource$: Observable<JobApplicationModel[]>;

  columns = JA_LIST_TABLE_COLUMNS;

  constructor(private router: Router) {}

  ngOnInit() {}

  onRowClicked(entityRow: any) {
    this.router.navigate(['job-board', 'applications', entityRow.id]);
  }
}

const JA_LIST_TABLE_COLUMNS: TableColumnConfig[] = [
  {
    key: 'jobId',
    title: 'Job ID',
    viewType: 'component',
    component: {
      key: JobidBadgeComponent,
    },
    sortable: false,
    headerStyle: {
      'min-width': '80px',
    },
  },
  {
    key: 'candidate',
    title: 'Candidate name',
    viewType: 'component',
    component: {
      key: CandidateIdBadgeComponent,
    },
    sortable: false,
    headerStyle: {
      'min-width': '80px',
    },
  },

  {
    key: 'status',
    title: 'Status',
    objectProp: ['status', 'value'],
    sortable: false,
    headerStyle: {
      'min-width': '80px',
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
