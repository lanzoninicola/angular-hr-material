import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TableColumns } from 'src/app/table-data/types/table.types';

import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

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
  tableDataSource$: Observable<User[]>;

  columns = USERS_LIST_TABLE_COLUMNS;

  constructor(private _dataService: UsersService, private router: Router) {}

  ngOnInit() {
    this.tableDataSource$ = this._dataService.findAll();
  }

  onRowClicked(entityRow: User) {
    this.router.navigate(['users', entityRow.id]);
  }
}

const USERS_LIST_TABLE_COLUMNS: TableColumns = {
  lastname: 'Lastname',
  firstname: 'Firstname',
  email: 'E-mail',
  recruitingRole: 'Role',
  department: 'Department',
  companyRoleLevel: 'Level',
};
