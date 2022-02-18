import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JobBoardService } from 'src/app/job-board/services/job-board.service';
import { TableColumnConfig } from 'src/app/table-data/types/table.types';

@Component({
  selector: 'app-jobid-applications',
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
export class JobidApplicationsComponent implements OnInit {
  tableDataSource$: Observable<any[]>;

  columns = JBA_LIST_TABLE_COLUMNS;

  constructor(private _dataService: JobBoardService, private router: Router) {}

  ngOnInit() {
    this.tableDataSource$ = this._dataService.findAll();
  }

  onRowClicked(entityRow: any) {
    // TODO: navigatio to ... ???
    //this.router.navigate(['job-board', entityRow.id]);
  }
}

const JBA_LIST_TABLE_COLUMNS: TableColumnConfig[] = [
  {
    key: 'title',
    title: 'Title',
    sortable: false,
    headerStyle: {
      'min-width': '180px',
    },
  },
];
