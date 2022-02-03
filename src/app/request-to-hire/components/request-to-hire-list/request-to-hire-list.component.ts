import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TableColumns } from 'src/app/table-data/types/table.types';

import { RequestToHireService } from '../../services/request-to-hire.service';

@Component({
  selector: 'ahr-request-to-hire-list',
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

const RTH_LIST_TABLE_COLUMNS: TableColumns = {
  title: 'Title',
  jobRole: 'Job Role',
  status: 'Status',
  createdDate: 'Created In',
  updatedDate: 'Last Update',
  highPriority: 'High Priority',
  department: 'Department',
  businessUnit: 'Business Unit',
  requester: 'Requester',
};
