import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';

import { RequestToHireModel } from '../../models/request-to-hire.model';
import { RequestToHireService } from '../../services/request-to-hire.service';
import { RequestToHireFormData } from '../../types/request-to-hire.form.type';

@Component({
  selector: 'app-request-to-hire-edit',
  templateUrl: './request-to-hire-edit.component.html',
  styleUrls: ['./request-to-hire-edit.component.scss'],
})
export class RequestToHireEditComponent implements OnInit {
  private subs = new Subscription();
  currentRequest: RequestToHireModel;
  entityState: EntityState = 'create';

  formState$ = this._dynamicForm.formState$;
  formStatus$: Observable<any>;
  formData: RequestToHireFormData;

  constructor(
    private _dynamicForm: DynamicFormService,
    private _dataService: RequestToHireService
  ) {}

  ngOnInit() {
    this.entityState = this._dataService.store.entityState;
    this.currentRequest = this._dataService.store.currentRequest;

    console.log(this._dataService.store.dispatcher);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onValueChanges(valueChanges: Observable<any>) {
    this.subs.add(
      valueChanges.subscribe((formData: RequestToHireFormData) => {
        this.formData = formData;
      })
    );
  }

  onStatusChanges(statusChanges: Observable<any>) {
    this.formStatus$ = statusChanges;
  }

  onSaveButtonClicked() {
    this._createModel();

    if (this.entityState === 'create') {
      this._dataService.save(this.currentRequest);
    }
    if (this.entityState === 'update') {
      this._dataService.update(this.currentRequest);
    }
  }

  // TODO: Develop remove user
  onRemoveButtonClicked() {}

  private _createModel() {
    const createdAt =
      this.entityState === 'update' ? this.formData.createdAt : new Date();
    const updatedAt = new Date();

    this.currentRequest = new RequestToHireModel(
      this.formData.id,
      this.formData.title,
      this.formData.department,
      this.formData.businessUnit,
      this.formData.requester,
      this.formData.jobRole,
      this.formData.roleTaskDescription,
      this.formData.roleLevel,
      this.formData.highPriority,
      this.formData.jobLocationType,
      this.formData.jobLocation,
      this.formData.employmentStatus,
      this.formData.minimumQualifications,
      this.formData.preferredQualifications,
      this.formData.benefits,
      this.formData.budget,
      this.formData.specialCategoriesOpened,
      this.formData.additionalNotes,
      this.formData.status,
      createdAt,
      updatedAt
    );
  }
}
