import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';

import { JobIdModel } from '../../models/jobid.model';
import { JobBoardService } from '../../services/job-board.service';
import { JobIdFormData } from '../../types/jobid.form.type';

@Component({
  selector: 'app-jobid-edit',
  templateUrl: './jobid-edit.component.html',
  styleUrls: ['./jobid-edit.component.scss'],
})
export class JobidEditComponent implements OnInit {
  private subs = new Subscription();
  currentJobId: JobIdModel;
  entityState: EntityState = 'create';

  formState$: BehaviorSubject<FormState> = new BehaviorSubject<FormState>(
    'idle'
  );
  mainFormStatus$: Observable<any>;
  detailsFormStatus$: Observable<any>;
  formData: JobIdFormData;

  mainFormValueChanges$: Observable<any>;
  detailFormValueChanges$: Observable<any>;

  constructor(private _dataService: JobBoardService) {}

  ngOnInit() {
    this.entityState = this._dataService.store.entityState;
    this.currentJobId = this._dataService.store.currentJobId;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onFormMainValueChanges(valueChanges$: Observable<any>) {
    this.subs.add(
      valueChanges$.subscribe((formData: JobIdFormData) => {
        let nextFormData = { ...this.currentJobId };
        nextFormData = { ...nextFormData, ...formData };
        this.formData = nextFormData;
      })
    );
  }

  onFormDetailsValueChanges(valueChanges$: Observable<any>) {
    this.subs.add(
      valueChanges$.subscribe((formData: JobIdFormData) => {
        let nextFormData = { ...this.currentJobId };
        nextFormData = { ...nextFormData, ...formData };
        this.formData = nextFormData;
      })
    );
  }

  onFormMainStatusChanges(statusChanges$: Observable<any>) {
    this.mainFormStatus$ = statusChanges$;
  }

  onFormDetailsStatusChanges(statusChanges$: Observable<any>) {
    this.detailsFormStatus$ = statusChanges$;
  }

  onFormMainFormStateChanges(formState$: BehaviorSubject<FormState>) {
    if (formState$.value !== 'idle') {
      this.formState$ = formState$;
    }
  }

  onFormDetailsFormStateChanges(formState$: BehaviorSubject<FormState>) {
    if (formState$.value !== 'idle') {
      this.formState$ = formState$;
    }
  }

  onSaveButtonClicked() {
    const currentJobId = this._dataService.getEntityModelFromFormData(
      this.formData
    );

    if (this.entityState === 'create') {
      this._dataService.save(currentJobId);
    }
    if (this.entityState === 'update') {
      this._dataService.update(currentJobId);
    }
  }

  // TODO: Develop remove user
  onRemoveButtonClicked() {}
}
