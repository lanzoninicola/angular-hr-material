import { Component, Input, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { JobApplicationActivityModel } from 'src/app/job-board/models/ja-activity.model';
import { JobApplicationModel } from 'src/app/job-board/models/job-application.model';
import { JobApplicationActivityService } from 'src/app/job-board/services/ja-activity.service';

@Component({
  selector: 'ahr-job-application-activity-list',
  template: `
    <div>
      <button mat-flat-button color="primary" (click)="addActivity()">
        Add Activity
      </button>
      <div *ngIf="showEditForm">
        <ahr-job-application-activity-edit></ahr-job-application-activity-edit>
      </div>
      <div class="container-activities">
        <div class="activity-items" *ngFor="let activity of activities">
          <div class="activity-item">
            <div class="activity-data">
              <div class="activity-dates">
                <span
                  ><strong>Created </strong><br />{{
                    activity.createdAt | date: 'dd/MM/yyyy'
                  }}</span
                >
                <span
                  ><strong>Last Update </strong><br />{{
                    activity.createdAt | date: 'dd/MM/yyyy HH:mm'
                  }}</span
                >
              </div>
              <div class="activity-details">
                <span
                  ><strong>Type</strong><br />{{ activity.type.value }}</span
                >
                <span
                  ><strong>Description</strong><br />{{
                    activity.description
                  }}</span
                >
              </div>
            </div>

            <div class="activity-actions">
              <button
                mat-mini-fab
                color="primary"
                aria-label="Example icon button with a filter list icon"
                (click)="editActivity()"
              >
                <mat-icon>edit</mat-icon>
              </button>
              <button
                mat-mini-fab
                color="primary"
                aria-label="Example icon button with a filter list icon"
                (click)="deleteActivity()"
              >
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./job-application-activity-list.component.scss'],
})
export class JobApplicationActivityListComponent implements OnInit {
  @Input()
  currentApplication: JobApplicationModel;

  entityState: EntityState;

  showEditForm: boolean = false;

  activities: JobApplicationActivityModel[] = [];

  constructor(private _dataService: JobApplicationActivityService) {}

  ngOnInit(): void {
    this._dataService.jobApplicationActivities$.subscribe((activities) => {
      this.activities = [...activities];
    });

    this._loadData();

    console.log(this.activities);
  }

  addActivity() {}

  private _loadData() {
    this._dataService
      .findByJobApplication(this.currentApplication)
      .pipe(
        map((activityCollection) => {
          return activityCollection.getItems().map((activity) => activity);
        }),
        tap((activities) =>
          this._dataService.jobApplicationActivities$.next(activities)
        )
      )
      .subscribe();
  }

  deleteActivity() {}

  editActivity() {}
}
