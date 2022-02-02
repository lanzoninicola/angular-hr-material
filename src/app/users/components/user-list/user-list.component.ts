import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

import { USERS_LIST_TABLE_COLUMNS } from '../../config/users.config';
import { UsersService } from '../../services/users.service';
import { UserModel } from '../../types/user.type';

@Component({
  selector: 'ahr-user-list',
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
export class UserListComponent implements OnInit {
  tableDataSource$: BehaviorSubject<UserModel[]> = new BehaviorSubject<
    UserModel[]
  >([]);

  tableDataSourceSubscription: Subscription;
  columns = USERS_LIST_TABLE_COLUMNS;

  constructor(private _dataService: UsersService, private router: Router) {}

  ngOnInit() {
    this.tableDataSourceSubscription = this._dataService
      .findAll()
      .subscribe((entities: UserModel[]) => {
        this.tableDataSource$.next(entities);
      });
  }

  onRowClicked(entityRow: UserModel) {
    this.router.navigate(['users', entityRow.id]);
  }

  ngOnDestroy() {
    this.tableDataSourceSubscription.unsubscribe();
  }
}
