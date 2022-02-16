import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TableColumnConfig } from 'src/app/table-data/types/table.types';

import { RequestToHireService } from '../../services/request-to-hire.service';
import { HighPriorityIconComponent } from '../high-priority-icon/high-priority-icon.component';
import { RequestStatusChipComponent } from '../request-status-chip/request-status-chip.component';

@Component({
  selector: 'ahr-request-to-hire-list',
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
export class RequestToHireListComponent implements OnInit {
  tableDataSource$: Observable<any[]>;

  columns = RTH_LIST_TABLE_COLUMNS;

  constructor(
    private _dataService: RequestToHireService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tableDataSource$ = this._dataService.findAll();
  }

  onRowClicked(entityRow: any) {
    this.router.navigate(['request-to-hire', entityRow.id]);
  }
}

const RTH_LIST_TABLE_COLUMNS: TableColumnConfig[] = [
  {
    key: 'title',
    title: 'Title',
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
    key: 'status',
    title: 'Status',
    objectProp: 'value',
    viewType: 'component',
    component: {
      key: RequestStatusChipComponent,
    },
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
  {
    key: 'highPriority',
    title: 'High Priority',
    viewType: 'component',
    component: {
      key: HighPriorityIconComponent,
      inputs: [{ icon: 'error' }, { label: 'high' }, { color: 'red' }],
    },
    headerStyle: {
      'min-width': '80px',
      'text-align': 'center',
      'padding-inline': '0.5rem',
    },
    cellStyle: {
      'text-align': 'center',
    },
    sortable: false,
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
    key: 'businessUnit',
    title: 'Business Unit',
    objectProp: 'value',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
    },
  },
  {
    key: 'requester',
    title: 'Requester',
    objectProp: 'lastname',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
    },
  },
];
