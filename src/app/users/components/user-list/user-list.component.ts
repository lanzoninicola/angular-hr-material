import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/shared/services/search.service';

import { UsersService } from '../../services/users.service';
import { UserModel } from '../../types/user.type';

@Component({
  selector: 'ahr-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList$: Observable<UserModel[]>;
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
  pageSize = 10;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private _searchService: SearchService
  ) {}

  ngOnInit() {
    this.userList$ = this.usersService.getAllUsers();
    this._searchService.setupData(this.userList$);
  }

  handleTableRowClicked(userRow: UserModel) {
    this.router.navigate(['users', userRow.id]);
  }
}

// TODO: separate table in a its own definition
