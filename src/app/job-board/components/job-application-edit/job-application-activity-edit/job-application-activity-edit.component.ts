import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { JobApplicationModel } from 'src/app/job-board/models/job-application.model';

@Component({
  selector: 'ahr-job-application-activity-edit',
  template: `
    <div class="activity-edit-container">
      <div class="activity-edit-content">
        <div class="activity-edit-form">
          <ahr-job-application-activity-form
            (formStateChanges)="onStateChanges($event)"
            (valueChanges)="onValueChanges($event)"
            (statusChanges)="onStatusChanges($event)"
          ></ahr-job-application-activity-form>
        </div>
        <div class="activity-edit-footer">
          <button mat-flat-button color="secondary" (click)="deleteActivity()">
            <mat-icon>delete</mat-icon>
            Remove
          </button>
          <button mat-flat-button color="primary" (click)="close()">
            <mat-icon>close</mat-icon>
            Close
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./job-application-activity-edit.component.scss'],
})
export class JobApplicationActivityEditComponent implements OnInit {
  @Input()
  currentApplication: JobApplicationModel;

  @Input()
  entityState: EntityState;

  constructor() {}

  ngOnInit(): void {}

  addActivity() {}

  deleteActivity() {}

  close() {}

  onStateChanges(event: FormState) {}

  onValueChanges(event: any) {}

  onStatusChanges(event: any) {}
}
