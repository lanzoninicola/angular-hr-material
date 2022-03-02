import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TableColumnConfig } from 'src/app/table-data/types/table.types';
import { JobIdModel } from '../../models/jobid.model';
import { JobBoardService } from '../../services/job-board.service';
import { JobidStatusChipComponent } from '../jobid-status-chip/jobid-status-chip.component';

@Component({
  selector: 'ahr-job-board',
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
export class JobidListComponent implements OnInit {
  tableDataSource$: Observable<JobIdModel[]>;

  columns = JB_LIST_TABLE_COLUMNS;

  constructor(private _dataService: JobBoardService, private router: Router) {}

  ngOnInit() {
    this.tableDataSource$ = this._dataService.findAll().pipe(
      map((jobBoard) => {
        return jobBoard.getItems();
      })
    );
  }

  onRowClicked(entityRow: any) {
    this.router.navigate(['job-board', 'jobid', entityRow.id]);
  }
}

const JB_LIST_TABLE_COLUMNS: TableColumnConfig[] = [
  {
    key: 'title',
    title: 'Title',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
    },
  },
  {
    key: 'status',
    title: 'Status',
    viewType: 'component',
    component: {
      key: JobidStatusChipComponent,
    },
    sortable: false,
    headerStyle: {
      'min-width': '80px',
      'text-align': 'center',
    },
  },
  {
    key: 'department',
    title: 'Department',
    objectProp: 'name',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
    },
  },
  {
    key: 'requester',
    title: 'Requester',
    objectProp: 'fullname',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
    },
  },
  {
    key: 'jobRole',
    title: 'Job Role',
    objectProp: 'name',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
    },
  },
  {
    key: 'roleLevel',
    title: 'Level',
    objectProp: 'value',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
    },
  },
  {
    key: 'jobLocation',
    title: 'Branch Office',
    objectProp: 'name',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
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
