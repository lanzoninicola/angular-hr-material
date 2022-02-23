import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { JobApplicationModel } from '../../models/job-application.model';
import { JobApplicationsService } from '../../services/job-applications.service';
import { JobBoardService } from '../../services/job-board.service';
import { JobApplicationEditFormData } from '../../types/job-application.form.type';

@Component({
  selector: 'ahr-job-application-edit',
  templateUrl: './job-application-edit.component.html',
  styleUrls: ['./job-application-edit.component.scss'],
})
export class JobApplicationEditComponent implements OnInit {
  currentApplication: JobApplicationModel;
  entityState: EntityState = 'create';
  showJobIdDetails: boolean = false;

  formState$: BehaviorSubject<FormState> = new BehaviorSubject<FormState>(
    'idle'
  );
  formStatus$: Observable<any>;
  formValueChanges$: Observable<any>;

  formData: any;

  private subs = new Subscription();

  constructor(
    private _dataService: JobBoardService,
    private _jobApplicationService: JobApplicationsService
  ) {}

  ngOnInit(): void {
    this.entityState = this._dataService.store.entityState;
    this.currentApplication = this._dataService.store.currentApplication;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onValueChanges(valueChanges$: Observable<any>) {
    this.subs.add(
      valueChanges$.subscribe((formData: JobApplicationEditFormData) => {
        let nextFormData = { ...this.currentApplication };
        nextFormData = { ...nextFormData, ...formData };
        this.formData = nextFormData;
      })
    );
  }

  onStatusChanges(statusChanges$: Observable<any>) {
    this.formStatus$ = statusChanges$;
  }

  onStateChanges(formState$: BehaviorSubject<FormState>) {
    this.formState$ = formState$;
  }

  onSaveButtonClicked() {
    const currentApplication =
      this._jobApplicationService.getEntityModelFromFormData(this.formData);

    this._jobApplicationService.update(currentApplication);
  }

  onShowJobIdDetails() {
    this.showJobIdDetails = !this.showJobIdDetails;
  }
}
