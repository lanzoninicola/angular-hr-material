import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { UsersStoreService } from '../../services/user-store.service';

@Component({
  selector: 'ahr-users-section',
  template: `
    <div class="container-section">
      <app-section-toolbar [title]="pageTitle">
        <ahr-search-control></ahr-search-control>
        <button mat-flat-button color="primary" (click)="addNewUser()">
          Add New User
        </button>
      </app-section-toolbar>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class UsersSectionComponent implements OnInit {
  pageTitle: string = 'Users';
  constructor(private router: Router, private _store: UsersStoreService) {}

  addNewUser() {
    this._store.currentEntity = {} as User;
    this.router.navigate(['users', 'new']);
    this.pageTitle = 'New User';
  }

  ngOnInit(): void {
    this.router.navigate(['users', 'list']);
    this.pageTitle = 'Users';
  }
}
