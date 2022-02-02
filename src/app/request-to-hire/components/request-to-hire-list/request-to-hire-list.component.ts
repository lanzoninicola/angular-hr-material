import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SearchService } from 'src/app/shared/services/search.service';
import { RequestToHireModule } from '../../request-to-hire.module';
import { RequestToHireService } from '../../services/request-to-hire.service';
import { RequestToHireModel } from '../../types/request-to-hire.type';

@Component({
  selector: 'ahr-request-to-hire-list',
  template: `
    <div class="container-list">
      <ahr-table-data
        [dataSource]="tableDataSource$"
        [columns]="columns"
        (onRowClicked)="handleTableRowClicked($event)"
      ></ahr-table-data>
    </div>
  `,
})
export class RequestToHireListComponent implements OnInit {
  requestList$: Observable<RequestToHireModel[]>;

  tableDataSource$: BehaviorSubject<RequestToHireModel[]> = new BehaviorSubject<
    RequestToHireModel[]
  >([]);

  tableDataSourceSubscription: Subscription;
  columns = [
    {
      title: 'Lastname',
      dsFieldName: 'lastname',
    },
    {
      title: 'Firstname',
      dsFieldName: 'firstname',
    },
    {
      title: 'Role',
      dsFieldName: 'recruitingRole',
    },
    {
      title: 'E-mail',
      dsFieldName: 'email',
    },
    {
      title: 'Department',
      dsFieldName: 'department',
    },
    {
      title: 'Level',
      dsFieldName: 'companyRoleLevel',
    },
  ];

  constructor(
    private _dataService: RequestToHireService,
    private router: Router,
    private _searchService: SearchService
  ) {}

  ngOnInit() {
    this.requestList$ = this._dataService.findAll();

    this._prepareTableDataSource();

    this._handleSearch();
  }

  handleTableRowClicked(requestRow: RequestToHireModel) {
    this.router.navigate(['request-to-hire', requestRow.id]);
  }

  ngOnDestroy() {
    this.tableDataSourceSubscription.unsubscribe();
  }

  private _prepareTableDataSource() {
    this.tableDataSourceSubscription = this.requestList$.subscribe(
      (entityData) => {
        this.tableDataSource$.next(entityData);
      }
    );
  }

  private _handleSearch(): void {
    this.tableDataSourceSubscription = this._searchService
      .setupData(this.requestList$)
      .subscribe((dataFiltered) => {
        this.tableDataSource$.next(dataFiltered);
      });
  }
}
