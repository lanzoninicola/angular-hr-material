import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { UserModel } from '../../types/user.type';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  readonly pageTitle: string = 'Users';
  private _usersSubscription: Subscription;
  tableDataSource$: BehaviorSubject<UserModel[]> = new BehaviorSubject<
    UserModel[]
  >([]);
  displayedColumns$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'lastname',
    'firstname',
    'email',
  ]);
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(5);
  dataOnPage$ = new BehaviorSubject<any[]>([]);

  constructor(private usersService: UsersService) {
    this._usersSubscription = this.usersService
      .getAllUsers()
      .subscribe(this.tableDataSource$);

    combineLatest([
      this.tableDataSource$,
      this.currentPage$,
      this.pageSize$,
    ]).subscribe(([allSources, currentPage, pageSize]) => {
      const startingIndex = (currentPage - 1) * pageSize;
      const onPage = allSources.slice(startingIndex, startingIndex + pageSize);
      this.dataOnPage$.next(onPage);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._usersSubscription.unsubscribe();
  }

  changePage(pageEvent: PageEvent) {
    const { pageIndex } = pageEvent;
    this.currentPage$.next(pageIndex + 1);
  }
}
