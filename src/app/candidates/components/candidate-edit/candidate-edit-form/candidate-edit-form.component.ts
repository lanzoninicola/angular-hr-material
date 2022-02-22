import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CandidateService } from 'src/app/candidates/services/candidate.service';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormModelBuilder } from 'src/app/dynamic-form/services/form-model-builder';

import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';

@Component({
  selector: 'ahr-candidate-edit-form',
  template: `
    <ahr-dynamic-form
      [model]="candidateEditForm.model"
      [settings]="candidateEditForm.settings"
      [showSpinner]="showSpinner"
    ></ahr-dynamic-form>
  `,
  styleUrls: ['./candidate-edit-form.component.scss'],
})
export class CandidateEditFormComponent implements OnInit {
  @Input()
  showSpinner: boolean = false;

  @Output('valueChanges')
  valueChangesEvent: EventEmitter<Observable<any>> = new EventEmitter<
    Observable<any>
  >();

  @Output('statusChanges')
  statusChangesEvent: EventEmitter<Observable<any>> = new EventEmitter<
    Observable<any>
  >();

  PERSONAL_INFO_CONTROLS: FormControlConfig[] = [];

  candidateEditForm: FormModelBuilder;

  constructor(
    private _dynamicForm: DynamicFormService,
    private _dataService: CandidateService
  ) {}

  ngOnInit(): void {
    this.candidateEditForm = new FormModelBuilder();
    this._setFormControlsConfig();
    this._setupForm();
    this._handleForms();

    if (this._dataService.store.entityState === 'update') {
      this._initFormValuesEntityUpdate();
    }

    this.valueChangesEvent.emit(this._dynamicForm.formData$);
    this.statusChangesEvent.emit(this._dynamicForm.formStatus$);
  }

  ngOnDestroy() {
    this._dynamicForm.destroy();
  }

  private _setFormControlsConfig() {
    this.PERSONAL_INFO_CONTROLS = [
      {
        type: 'input',
        placeholder: '',
        label: 'Lastname',
        key: 'lastname',
        syncValidators: [Validators.required],
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Firstname',
        key: 'firstname',
        syncValidators: [Validators.required],
      },
      {
        type: 'input',
        placeholder: '',
        label: 'E-mail',
        key: 'email',
        syncValidators: [Validators.required, Validators.email],
      },
    ];
  }

  private _setupForm() {
    const { candidateEditForm } = this;

    candidateEditForm.setup(
      { key: 'jbMainInfo', title: 'Main Information' },
      this.PERSONAL_INFO_CONTROLS
    );
  }

  private _handleForms() {
    const { candidateEditForm } = this;

    this._dynamicForm.load(candidateEditForm);
  }

  private _initFormValuesEntityUpdate() {
    const { currentCandidate } = this._dataService.store;

    this._dynamicForm.setControlsValue({
      firstname: currentCandidate.getFirstname(),
      lastname: currentCandidate.getLastname(),
      email: currentCandidate.getEmail(),
    });
  }
}

// TODO: async validation to verify if the email already exists in the process of creating the candidateEditForm
// localhost:3000/candidates/?lastname=Graham
