import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TableColumnConfig } from 'src/app/table-data/types/table.types';

import { InterviewOnTableList } from '../../types/interview.list.type';
import { CandidateIdBadgeComponent } from '../candidate-id-badge/candidate-id-badge.component';
import { JobidBadgeComponent } from '../jobid-badge/jobid-badge.component';

@Component({
  selector: 'ahr-interview-list-table',
  template: `
    <ahr2-table-data
      [dataSource]="tableDataSource$"
      [columns]="columns"
      (onRowClicked)="onRowClicked($event)"
    >
    </ahr2-table-data>
  `,
})
export class InterviewListTableComponent implements OnInit {
  @Input()
  tableDataSource$: Observable<InterviewOnTableList[]>;

  columns = INTERVIEWS_TABLE_COLUMNS;

  constructor(private router: Router) {}

  ngOnInit() {
    this.tableDataSource$.subscribe((data) => {
      console.log(data);
    });
  }

  onRowClicked(entityRow: any) {
    this.router.navigate(['job-board', 'interviews', entityRow.id]);
  }
}

const INTERVIEWS_TABLE_COLUMNS: TableColumnConfig[] = [
  {
    key: 'scheduledAt',
    title: 'Scheduled at',
    type: 'date',
    sortable: false,
    headerStyle: {
      'min-width': '80px',
      'padding-inline': '0.5rem',
      'word-break': 'break-all',
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
    key: 'status',
    title: 'Status',
    objectProp: 'value',
    sortable: false,
    headerStyle: {
      'min-width': '80px',
    },
  },
  {
    key: 'rating',
    title: 'Rating',
    sortable: false,
    headerStyle: {
      'min-width': '80px',
      'text-align': 'center',
    },
    cellStyle: {
      'text-align': 'center',
    },
  },
];
