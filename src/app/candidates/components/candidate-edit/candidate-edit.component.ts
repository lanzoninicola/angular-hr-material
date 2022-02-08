import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { CandidateModel } from '../../models/candidate.model';
import { CandidatesStoreService } from '../../services/candidates-store.service';
import { CandidatesService } from '../../services/candidates.service';
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

  formValues: CandidateModel = {} as CandidateModel;
  formState: FormState = 'idle';
  formStatus: string = 'invalid';

  constructor(
    private _store: CandidatesStoreService,
    private _candidatesService: CandidatesService
  ) {}

  ngOnInit() {
    this.entityState = this._store.entityState;
    this.currentCandidate = this._store.currentEntity;
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
    this.subs.add(
      valueChanges
        .pipe<CandidateModel>(
          map((userFormData: CandidateFormData) => {
            return {
              id: this.currentCandidate.id,
              firstname: userFormData['firstname'],
              lastname: userFormData['lastname'],
              email: userFormData['email'],
            };
          })
        )
        .subscribe((userModel: CandidateModel) => {
          this.formValues = { ...userModel };
        })
    );
  }

  onStatusChanges(statusChanges: Observable<any>) {
    this.subs.add(
      statusChanges.subscribe((formStatus) => (this.formStatus = formStatus))
    );
  }

  onSaveButtonClicked() {
    if (this.entityState === 'create') {
      this._candidatesService.save(this.formValues);
    }
    if (this.entityState === 'update') {
      this._candidatesService.update(this.formValues);
    }
  }

  // TODO: Develop disable user
  onDisableButtonClicked() {}

  // TODO: Develop remove user
  onRemoveButtonClicked() {}
}
