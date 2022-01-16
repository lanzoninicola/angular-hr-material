import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { UserModel } from '../../types/user.type';

@Component({
  selector: 'ahr-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
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

  constructor(private usersService: UsersService, private router: Router) {
    this.userList$ = this.usersService.getAllUsers();
  }

  handleTableRowClicked(userRow: UserModel) {
    this.router.navigate(['users', userRow.id]);
  }
}

// TODO: separate table in a its own definition
