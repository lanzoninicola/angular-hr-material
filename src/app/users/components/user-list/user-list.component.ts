import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
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
  userListSubscription: Subscription;
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
    this.userListSubscription = this.usersService
      .getAllUsers()
      .subscribe(this.userList$);

    this._handleSearch();
  }

  handleTableRowClicked(userRow: UserModel) {
    this.router.navigate(['users', userRow.id]);
  }

  ngOnDestroy() {
    this.userListSubscription.unsubscribe();
  }

  private _handleSearch(): void {
    const foo = this._searchService.setupData(this.userList$);

    foo.subscribe((data) => {
      console.log(data);
      this.userList$.next(data);
    });
  }
}
