import { Component, OnInit } from '@angular/core';
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
import { JobApplicationsService } from '../../services/job-applications.service';
import { JobBoardService } from '../../services/job-board.service';
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

  formData: any;

  private sub = new Subscription();

  constructor(
    private _dataService: JobBoardService,
    private _jaService: JobApplicationsService
  ) {}

  ngOnInit(): void {
    this.entityState = this._dataService.store.entityState;
    this.currentApplication = this._dataService.store.currentApplication;

    this.formStatus$ = this._getGlobalFormStatus();
    this.formState$ = this._getGlobalFormState();
  }

  private _getGlobalFormStatus() {
    return combineLatest([this.mainFormStatus$]).pipe(
      map(([mainFormStatus]) => {
        if (mainFormStatus.toLowerCase() === 'invalid') {
          return 'invalid';
        }

        return 'valid';
      })
    );
  }

  private _getGlobalFormState() {
    return combineLatest([this.mainFormState$]).pipe(
      map(([mainFormState]) => {
        if (mainFormState === 'changed') {
          return 'changed';
        }

        if (mainFormState === 'submitted') {
          return 'submitted';
        }

        return 'idle';
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onValueChanges(valueChanges: JobApplicationEditFormData) {
    this.mainValueChanges$.next(valueChanges);
  }

  onStatusChanges(formStatus: string) {
    this.mainFormStatus$.next(formStatus);
  }

  onStateChanges(formState: FormState) {
    this.mainFormState$.next(formState);
  }

  onSaveButtonClicked() {
    if (this.mainValueChanges$.value) {
      const currentApplication = this._jaService.getEntityModelFromFormData(
        this.mainValueChanges$.value
      );

      this._jaService
        .update(currentApplication)
        .subscribe(() => (this.currentApplication = currentApplication));
    }
  }

  onShowJobIdDetails() {
    this.showJobIdDetails = !this.showJobIdDetails;
  }
}
