import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestToHireService } from '../../services/request-to-hire.service';

@Component({
  selector: 'app-request-to-hire-section',
  template: `
    <div class="container-section">
      <app-section-toolbar [title]="pageTitle">
        <ahr-search-control></ahr-search-control>
        <button mat-flat-button color="primary" (click)="addNewRequest()">
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
    private _dataService: RequestToHireService
  ) {}

  addNewRequest() {
    this.router.navigate(['request-to-hire', 'new']);
    this.pageTitle = 'New Request';
    this._dataService.store.currentRequestReset();
  }

  ngOnInit(): void {
    this.router.navigate(['request-to-hire', 'list']);
    this.pageTitle = 'Request to Hire List';
  }
}
