import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { CandidateModel } from '../../models/candidate.model';
import { CandidateStoreService } from '../../services/candidate-store.service';
import { CandidateService } from '../../services/candidate.service';

import { CandidateFormData } from '../../types/candidates.types';

@Component({
  selector: 'ahr-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.scss'],
})
export class CandidateEditComponent implements OnInit {
  private subs = new Subscription();
  currentCandidate: CandidateModel = {} as CandidateModel;
  entityState: EntityState = 'create';

  formState$ = this._dynamicForm.formState$;
  formStatus$: Observable<any>;
  formData: CandidateFormData;

  constructor(
    private _store: CandidateStoreService,
    private _dataService: CandidateService,
    private _dynamicForm: DynamicFormService
  ) {}

  ngOnInit() {
    this.entityState = this._store.entityState;
    this.currentCandidate = this._store.currentCandidate;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onValueChanges(valueChanges: Observable<any>) {
    this.subs.add(
      valueChanges.subscribe((formData: CandidateFormData) => {
        this.formData = formData;
      })
    );
  }

  onStatusChanges(statusChanges: Observable<any>) {
    this.formStatus$ = statusChanges;
  }

  onSaveButtonClicked() {
    this.currentCandidate = this._dataService.getEntityModelFromFormData(
      this.formData
    );

    if (this.entityState === 'create') {
      this._dataService.save(this.currentCandidate);
    }
    if (this.entityState === 'update') {
      this._dataService.update(this.currentCandidate);
    }
  }

  // TODO: Develop disable user
  onDisableButtonClicked() {}

  // TODO: Develop remove user
  onRemoveButtonClicked() {}
}
