import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { TableColumn } from 'src/app/shared/types/table.types';

import { UsersService } from '../../services/users.service';
import { UserModel } from '../../types/user.type';

@Component({
  selector: 'ahr-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnDestroy {
  private _usersSubscription: Subscription;
  // tableDataSource$: BehaviorSubject<UserModel[]> = new BehaviorSubject<
  //   UserModel[]
  // >([]);
  displayedColumns$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'lastname',
    'firstname',
    'email',
    'department',
    'companyRoleLevel',
  ]);

  columns$: BehaviorSubject<TableColumn[]> = new BehaviorSubject<TableColumn[]>(
    [
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
    ]
  );

  dataOnPage: any[] = [];

  userListTableConfig;

  constructor(private usersService: UsersService, private router: Router) {
    // this._usersSubscription = this.usersService
    //   .getAllUsers()
    //   .subscribe(this.tableDataSource$);

    let dataSource: any[] = [];
    this._usersSubscription = this.usersService
      .getAllUsers()
      .subscribe((users) => {
        console.log(users);
        dataSource = [...dataSource, ...users];
      });

    console.log(dataSource);

    this.userListTableConfig = {
      dataSource: dataSource,
      columns: [
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
      ],
      pageSize: 5,
    };
  }

  ngOnDestroy(): void {
    this._usersSubscription.unsubscribe();
  }

  handleTableRowClicked(userRow: UserModel) {
    this.router.navigate(['users', userRow.id]);
  }
}

// TODO: separate table in a its own definition
