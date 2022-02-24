import { Component, OnInit } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';

import { JobApplicationModel } from '../../models/job-application.model';
import { JobApplicationActivityService } from '../../services/ja-activity.service';
import { JobApplicationsService } from '../../services/job-applications.service';
import { JobBoardService } from '../../services/job-board.service';
import { JobApplicationActivityFormData } from '../../types/ja-activity.form.type';
import { JobApplicationEditFormData } from '../../types/job-application.form.type';

// TODO: sub-routing navigating through the tabs (Activities, Interviews)

@Component({
  selector: 'ahr-job-application-edit',
  templateUrl: './job-application-edit.component.html',
  styleUrls: ['./job-application-edit.component.scss'],
})
export class JobApplicationEditComponent implements OnInit {
  currentApplication: JobApplicationModel;
  entityState: EntityState = 'create';
  showJobIdDetails: boolean = false;

  formState$: Observable<FormState>;
  formStatus$: Observable<string>;

  mainFormState$ = new BehaviorSubject<FormState>('idle');
  mainFormStatus$ = new BehaviorSubject('valid');
  mainValueChanges$: BehaviorSubject<null | JobApplicationEditFormData> =
    new BehaviorSubject<null | JobApplicationEditFormData>(null);

  activitiesFormState$ = new BehaviorSubject<FormState>('idle');
  activitiesFormStatus$ = new BehaviorSubject('valid');
  activitiesValueChanges$: BehaviorSubject<
    null | JobApplicationActivityFormData[]
  > = new BehaviorSubject<null | JobApplicationActivityFormData[]>(null);

  formData: any;

  private subs = new Subscription();

  constructor(
    private _dataService: JobBoardService,
    private _jaService: JobApplicationsService,
    private _jaActivityService: JobApplicationActivityService
  ) {}

  ngOnInit(): void {
    this.entityState = this._dataService.store.entityState;
    this.currentApplication = this._dataService.store.currentApplication;

    this.formStatus$ = this._getGlobalFormStatus();
    this.formState$ = this._getGlobalFormState();
  }

  private _getGlobalFormStatus() {
    return combineLatest([
      this.mainFormStatus$,
      this.activitiesFormStatus$,
    ]).pipe(
      map(([mainFormStatus, activitiesFormStatus]) => {
        if (
          mainFormStatus.toLowerCase() === 'invalid' ||
          activitiesFormStatus.toLowerCase() === 'invalid'
        ) {
          return 'invalid';
        }

        return 'valid';
      })
    );
  }

  private _getGlobalFormState() {
    return combineLatest([this.mainFormState$, this.activitiesFormState$]).pipe(
      map(([mainFormState, activitiesFormState]) => {
        if (mainFormState === 'changed' || activitiesFormState === 'changed') {
          return 'changed';
        }

        if (
          mainFormState === 'submitted' ||
          activitiesFormState === 'submitted'
        ) {
          return 'submitted';
        }

        return 'idle';
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onValueChanges(valueChanges: JobApplicationEditFormData) {
    console.log(valueChanges);
    this.mainValueChanges$.next(valueChanges);
  }

  onStatusChanges(formStatus: string) {
    this.mainFormStatus$.next(formStatus);
  }

  onStateChanges(formState: FormState) {
    this.mainFormState$.next(formState);
  }

  onActivitiesFormStateChanged(formState: FormState) {
    this.activitiesFormState$.next(formState);
  }

  onActivitiesValueChanges(valueChanges: JobApplicationActivityFormData[]) {
    this.activitiesValueChanges$.next(valueChanges);
  }

  onActivitiesStatusChanges(formStatus: FormControlStatus) {
    this.activitiesFormStatus$.next(formStatus);
  }

  onSaveButtonClicked() {
    if (this.mainValueChanges$.value) {
      const currentApplication = this._jaService.getEntityModelFromFormData(
        this.mainValueChanges$.value
      );

      this._jaService.update(currentApplication);
    }

    if (this.activitiesValueChanges$.value) {
      this.activitiesValueChanges$.value.forEach((activity) => {
        const activityModel =
          this._jaActivityService.getEntityModelFromFormData(activity);

        this._jaActivityService.save(activityModel);
      });
    }
  }

  onShowJobIdDetails() {
    this.showJobIdDetails = !this.showJobIdDetails;
  }
}
