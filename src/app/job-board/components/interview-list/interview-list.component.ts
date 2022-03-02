import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { InterviewCollection } from '../../models/interview.collection';
import { InterviewModel } from '../../models/interview.model';
import { JobApplicationModel } from '../../models/job-application.model';
import { InterviewService } from '../../services/interview.service';
import { InterviewOnTableList } from '../../types/interview.list.type';

// TODO: candidate and jobId are inside the jobApplication object but
// as the table component works, i cannot set two columns with the same key.
// So i need to create a new type for this.

@Component({
  selector: 'ahr-interview-list',
  template: `
    <div class="container-list">
      <ahr-interview-list-table
        [tableDataSource$]="tableDataSource$"
      ></ahr-interview-list-table>
    </div>
  `,
})
export class InterviewListComponent implements OnInit {
  @Input()
  currentApplication: JobApplicationModel;

  tableDataSource$: Observable<InterviewOnTableList[]>;

  constructor(private _dataService: InterviewService) {}

  ngOnInit(): void {
    if (this.currentApplication) {
      this._loadByApplicationId();
    } else {
      this._loadAll();
    }
  }

  _loadAll() {
    this.tableDataSource$ = this._dataService.findAll().pipe(
      map<InterviewCollection, InterviewModel[]>((collection) => {
        return collection.getItems();
      }),
      map<InterviewModel[], InterviewOnTableList[]>((interviews) => {
        return interviews.map((interview) => {
          return {
            id: interview.id,
            jobApplication: interview.jobApplication,
            candidate: interview.jobApplication.candidate,
            jobId: interview.jobApplication.jobId,
            status: interview.status,
            rating: interview.rating,
            scheduledAt: interview.scheduledAt,
            createdAt: interview.createdAt,
            updatedAt: interview.updatedAt,
          };
        });
      })
    );
  }

  _loadByApplicationId() {
    this.tableDataSource$ = this._dataService
      .findByJobApplication(this.currentApplication)
      .pipe(
        map<InterviewCollection, InterviewModel[]>((collection) => {
          return collection.getItems();
        }),
        map<InterviewModel[], InterviewOnTableList[]>((interviews) => {
          return interviews.map((interview) => {
            return {
              id: interview.id,
              jobApplication: interview.jobApplication,
              candidate: interview.jobApplication.candidate,
              jobId: interview.jobApplication.jobId,
              status: interview.status,
              rating: interview.rating,
              scheduledAt: interview.scheduledAt,
              createdAt: interview.createdAt,
              updatedAt: interview.updatedAt,
            };
          });
        })
      );
  }
}
