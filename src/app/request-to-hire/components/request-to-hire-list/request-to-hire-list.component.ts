import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SearchService } from 'src/app/shared/services/search.service';
import { RTH_LIST_TABLE_COLUMNS } from '../../config/request-to-hire.config';
import { RequestToHireModule } from '../../request-to-hire.module';
import { RequestToHireService } from '../../services/request-to-hire.service';
import { RequestToHireModel } from '../../types/request-to-hire.type';

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
  tableDataSource$: BehaviorSubject<RequestToHireModel[]> = new BehaviorSubject<
    RequestToHireModel[]
  >([]);

  tableDataSourceSubscription: Subscription;
  columns = RTH_LIST_TABLE_COLUMNS;

  constructor(
    private _dataService: RequestToHireService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tableDataSourceSubscription = this._dataService
      .findAll()
      .subscribe((entities: RequestToHireModel[]) => {
        this.tableDataSource$.next(entities);
      });
  }

  onRowClicked(requestRow: RequestToHireModel) {
    this.router.navigate(['request-to-hire', requestRow.id]);
  }

  ngOnDestroy() {
    this.tableDataSourceSubscription.unsubscribe();
  }
}
