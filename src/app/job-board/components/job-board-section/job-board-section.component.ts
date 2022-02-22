import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobBoardService } from '../../services/job-board.service';

@Component({
  selector: 'app-job-board-section',
  template: `
    <div class="container-section">
      <app-section-toolbar [title]="pageTitle">
        <ahr-search-control></ahr-search-control>
        <button mat-flat-button color="primary" (click)="addNewRequest()">
          Post a new job
        </button>
      </app-section-toolbar>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class JobBoardSectionComponent implements OnInit {
  pageTitle: string = 'Job Board';
  constructor(private router: Router, private _dataService: JobBoardService) {}

  addNewRequest() {
    this.router.navigate(['job-board', 'jobid', 'new']);
    this.pageTitle = 'New Job Id';
    this._dataService.store.currentJobIdReset();
  }

  ngOnInit(): void {
    this.router.navigate(['job-board', 'jobid', 'list']);
    this.pageTitle = 'Job Board';
  }
}
