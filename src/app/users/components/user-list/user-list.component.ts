import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { SearchService } from 'src/app/shared/services/search.service';

import { UsersService } from '../../services/users.service';
import { UserModel } from '../../types/user.type';

@Component({
  selector: 'ahr-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList$: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>(
    []
  );
  tableDataSource$: BehaviorSubject<UserModel[]> = new BehaviorSubject<
    UserModel[]
  >([]);
  userListSubscription: Subscription;
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
    private _usersService: UsersService,
    private router: Router,
    private _searchService: SearchService
  ) {}

  ngOnInit() {
    this.userList$ = this._usersService.getAllUsers();

    this._prepareTableDataSource();

    this._handleSearch();
  }

  handleTableRowClicked(userRow: UserModel) {
    this.router.navigate(['users', userRow.id]);
  }

  ngOnDestroy() {
    this.tableDataSourceSubscription.unsubscribe();
  }

  private _prepareTableDataSource() {
    this.tableDataSourceSubscription = this.userList$.subscribe((usersData) => {
      this.tableDataSource$.next(usersData);
    });
  }

  private _handleSearch(): void {
    this.tableDataSourceSubscription = this._searchService
      .setupData(this.userList$)
      .subscribe((dataFiltered) => {
        this.tableDataSource$.next(dataFiltered);
      });
  }
}
