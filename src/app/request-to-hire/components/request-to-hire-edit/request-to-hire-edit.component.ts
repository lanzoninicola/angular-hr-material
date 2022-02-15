import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';

import { RequestToHireModel } from '../../models/request-to-hire.model';
import { RequestToHireService } from '../../services/request-to-hire.service';

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

  constructor(
    private _dynamicForm: DynamicFormService,
    private _dataService: RequestToHireService
  ) {}

  ngOnInit() {
    console.log('init edit component');
    this.entityState = this._dataService.store.entityState;
    this.currentRequest = this._dataService.store.currentRequest;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onValueChanges(valueChanges: Observable<any>) {
    this.subs.add(
      valueChanges
        .pipe<any>(map((formData: any) => formData))
        .subscribe((userModel: any) => {
          console.log(userModel);
          // this.currentUser = userModel;
        })
    );
  }

  onStatusChanges(statusChanges: Observable<any>) {
    this.formStatus$ = statusChanges;
  }

  onSaveButtonClicked() {
    // TRANSFORM FORM DATA TO MODEL
    // if (this.entityState === 'create') {
    //   this._dataService.save(this.currentRequest);
    // }
    if (this.entityState === 'update') {
      console.log(this.currentRequest);

      // this._dataService.update(this.currentRequest);
    }
  }

  // TODO: Develop disable user
  onDisableButtonClicked() {}

  // TODO: Develop remove user
  onRemoveButtonClicked() {}
}
