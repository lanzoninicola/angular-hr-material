import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestToHireStoreService } from '../../services/request-to-hire-store.service';
import { RequestToHireModel } from '../../types/request-to-hire.type';

@Component({
  selector: 'app-request-to-hire-section',
  template: `
    <div class="container-section">
      <app-section-toolbar [title]="pageTitle">
        <ahr-search-control></ahr-search-control>
        <button mat-flat-button color="primary" (click)="addNewUser()">
          Add New Request
        </button>
      </app-section-toolbar>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class RequestToHireSectionComponent implements OnInit {
  pageTitle: string = 'Request to Hire';
  constructor(
    private router: Router,
    private _store: RequestToHireStoreService
  ) {}

  addNewUser() {
    this._store.currentEntity = {} as RequestToHireModel;
    this.router.navigate(['request-to-hire', 'new']);
    this.pageTitle = 'New Request';
  }

  ngOnInit(): void {
    this.router.navigate(['request-to-hire', 'list']);
    this.pageTitle = 'Request to Hire List';
  }
}
