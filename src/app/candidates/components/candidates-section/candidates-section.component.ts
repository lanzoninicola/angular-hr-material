import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateModel } from '../../models/candidate.model';
import { CandidateStoreService } from '../../services/candidate-store.service';

@Component({
  selector: 'app-candidates-section',
  template: `
    <div class="container-section">
      <app-section-toolbar [title]="pageTitle">
        <ahr-search-control></ahr-search-control>
        <button mat-flat-button color="primary" (click)="addNewCandidate()">
          Add New Candidate
        </button>
      </app-section-toolbar>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class CandidatesSectionComponent implements OnInit {
  pageTitle: string = 'Candidates';
  constructor(private router: Router, private _store: CandidateStoreService) {}

  addNewCandidate() {
    this._store.currentCandidate = {} as CandidateModel;
    this.router.navigate(['candidates', 'new']);
    this.pageTitle = 'New Candidate';
  }

  ngOnInit(): void {
    this.router.navigate(['candidates', 'list']);
    this.pageTitle = 'Candidates';
  }
}
