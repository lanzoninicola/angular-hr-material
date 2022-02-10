import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { RequestToHireModel } from '../../models/request-to-hire.model';
import { RequestToHireStoreService } from '../../services/request-to-hire-store.service';
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

  formState: FormState = 'idle';
  formStatus: string = 'invalid';

  constructor(
    private _store: RequestToHireStoreService,
    private _dataService: RequestToHireService
  ) {}

  ngOnInit() {
    this.entityState = this._store.entityState;
    this.currentRequest = this._store.currentEntity;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onFormState(formState: BehaviorSubject<FormState>) {
    this.subs.add(
      formState.subscribe((formState: FormState) => {
        this.formState = formState;
      })
    );
  }

  onValueChanges(valueChanges: Observable<any>) {
    // this.subs.add(
    //   valueChanges
    //     .pipe<RequestToHireModel>(
    //       map((userFormData: UserFormData) => {
    //         return new RequestToHireModel(
    //           this.currentRequest.getId(),
    //           userFormData['firstname'],
    //           userFormData['lastname'],
    //           userFormData['email'],
    //           userFormData['recruitingRoles'],
    //           userFormData['departments'],
    //           userFormData['companyLevels'],
    //           userFormData['isAdmin']
    //         );
    //       })
    //     )
    //     .subscribe((userModel: RequestToHireModel) => {
    //       this.currentRequest = userModel;
    //     })
    // );
  }

  onStatusChanges(statusChanges: Observable<any>) {
    this.subs.add(
      statusChanges.subscribe((formStatus) => (this.formStatus = formStatus))
    );
  }

  onSaveButtonClicked() {
    if (this.entityState === 'create') {
      this._dataService.save(this.currentRequest);
    }
    if (this.entityState === 'update') {
      this._dataService.update(this.currentRequest);
    }
  }

  // TODO: Develop disable user
  onDisableButtonClicked() {}

  // TODO: Develop remove user
  onRemoveButtonClicked() {}
}
