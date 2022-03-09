import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { JobApplicationModel } from '../../models/job-application.model';
import { InterviewRoundService } from '../../services/interview-round.service';
import { InterviewRoundOnListTable } from '../../types/interview.list.type';

// TODO: candidate and jobId are inside the jobApplication object but
// as the table component works, i cannot set two columns with the same key.
// So i need to create a new type for this.

@Component({
  selector: 'ahr-interview-rounds-list',
  template: `
    <div class="container-list">
      <ahr-interview-list-table
        [tableDataSource$]="tableDataSource$"
      ></ahr-interview-list-table>
    </div>
  `,
})
export class InterviewRoundsListComponent implements OnInit {
  @Input()
  currentApplication: JobApplicationModel;

  tableDataSource$: Observable<InterviewRoundOnListTable[]>;

  constructor(private _dataService: InterviewRoundService) {}

  ngOnInit(): void {
    if (this.currentApplication) {
      this._loadByApplicationId();
    } else {
      this._loadAll();
    }
  }

  _loadAll() {
    this.tableDataSource$ = this._dataService.getListOfAllInterviewRounds();
  }

  _loadByApplicationId() {
    this.tableDataSource$ =
      this._dataService.getListOfInterviewRoundsByJobApplication(
        this.currentApplication
      );
  }
}
