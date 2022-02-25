import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { JobApplicationActivityModel } from 'src/app/job-board/models/ja-activity.model';
import { JobApplicationModel } from 'src/app/job-board/models/job-application.model';
import { JobApplicationActivityService } from 'src/app/job-board/services/ja-activity.service';
import { JobApplicationActivityFormData } from 'src/app/job-board/types/ja-activity.form.type';

@Component({
  selector: 'ahr-job-application-activity-edit',
  templateUrl: './job-application-activity-edit.component.html',
  styleUrls: ['./job-application-activity-edit.component.scss'],
})
export class JobApplicationActivityEditComponent implements OnInit, OnDestroy {
  @Input()
  currentApplication: JobApplicationModel;

  entityState: EntityState;

  activities: JobApplicationActivityModel[] = [];

  formState: FormState = 'idle';
  formData: JobApplicationActivityFormData;
  formStatus: string = 'invalid';

  currentActivityIdx: number | null;

  sub = new Subscription();

  constructor(private _dataService: JobApplicationActivityService) {}

  ngOnInit(): void {
    this._subscribeState();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  saveActivity() {
    const { entityState } = this;
    const { stateActivities$, stateShowEditForm$, stateEntityState$ } =
      this._dataService;

    const activityModel = this._dataService.getEntityModelFromFormData(
      this.formData
    );

    if (entityState === 'create') {
      this._dataService
        .save(activityModel)
        .pipe(
          tap(() => {
            const nextActivities = [...this.activities];
            nextActivities.splice(0, 0, activityModel);

            stateActivities$.next(nextActivities);
            stateShowEditForm$.next(false);
            stateEntityState$.next('idle');
          })
        )
        .subscribe();
    }

    if (entityState === 'update') {
      this._dataService
        .update(activityModel)
        .pipe(
          tap(() => {
            const nextActivities = this.activities.map((activity) => {
              if (activity.id === activityModel.id) {
                return activityModel;
              }

              return activity;
            });

            stateActivities$.next(nextActivities);
            stateShowEditForm$.next(false);
            stateEntityState$.next('idle');
          })
        )
        .subscribe();
    }
  }

  close() {
    const { stateShowEditForm$, stateEntityState$ } = this._dataService;

    stateShowEditForm$.next(false);
    stateEntityState$.next('idle');
  }

  onStateChanges(formState: FormState) {
    this.formState = formState;
  }

  onValueChanges(formData: JobApplicationActivityFormData) {
    this.formData = formData;
  }

  onStatusChanges(formStatus: string) {
    console.log(formStatus);
    this.formStatus = formStatus;
  }

  private _subscribeState() {
    const {
      stateActivities$,
      stateEntityState$,
      stateShowEditForm$,
      stateActivityEditable$,
    } = this._dataService;

    this.sub.add(
      stateActivities$.subscribe((activities) => {
        this.activities = [...activities];
      })
    );
    this.sub.add(
      stateEntityState$.subscribe((entityState) => {
        this.entityState = entityState;
      })
    );
    this.sub.add(stateShowEditForm$.subscribe());

    this.sub.add(
      stateActivityEditable$.subscribe(
        (activityIdx) => (this.currentActivityIdx = activityIdx)
      )
    );
  }
}
