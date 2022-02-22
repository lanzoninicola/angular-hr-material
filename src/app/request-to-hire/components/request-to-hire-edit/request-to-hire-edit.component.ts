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
    this.currentRequest = this._dataService.getEntityModelFromFormData(
      this.formData
    );

    if (this.entityState === 'create') {
      this._dataService.save(this.currentRequest);
    }
    if (this.entityState === 'update') {
      this._dataService.update(this.currentRequest);
    }
  }

  // TODO: Develop remove user
  onRemoveButtonClicked() {}
}
