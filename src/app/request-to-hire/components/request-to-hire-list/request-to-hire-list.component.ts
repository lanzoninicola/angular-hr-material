import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IconBadgeComponent } from 'src/app/shared/components/icon-badge/icon-badge.component';
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
  title: { title: 'Title' },
  jobRole: { title: 'Job Role', field: 'name' },
  status: { title: 'Status' },
  createdAt: { title: 'Created In' },
  updatedAt: { title: 'Last Update' },
  highPriority: { title: 'High Priority', component: IconBadgeComponent },
  department: { title: 'Department', field: 'name' },
  businessUnit: { title: 'Business Unit' },
  requester: { title: 'Requester', field: 'fullname' },
};
