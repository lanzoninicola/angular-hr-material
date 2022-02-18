import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { CandidateModel } from 'src/app/candidates/models/candidate.model';
import { CandidatesService } from 'src/app/candidates/services/candidate.service';

import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { FormViewTemplate } from 'src/app/dynamic-form/types/template.types';

@Component({
  selector: 'ahr-candidate-edit-form',
  template: `
    <ahr-dynamic-form
      [model]="candidateEditForm"
      [view]="candidateEditFormView"
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

  candidateEditForm: FormGroup;
  candidateEditFormView: FormViewTemplate;

  constructor(
    private _dynamicForm: DynamicFormService,
    private _dataService: CandidatesService
  ) {}

  ngOnInit(): void {
    this._setFormControlsConfig();
    this._buildView();
    this._buildModel();
    this._setTemplatePropertyBinding();

    if (this._dataService.store.entityState === 'create') {
      this._initFormValuesEntityCreate();
    }

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

  private _buildView() {
    this._dynamicForm.view.build(
      { key: 'personalInfo', title: 'Personal Info' },
      this.PERSONAL_INFO_CONTROLS
    );
  }

  private _buildModel() {
    this._dynamicForm.model.build(this._dynamicForm.view.get());

    this._dynamicForm.load();
  }

  private _setTemplatePropertyBinding() {
    this.candidateEditForm = this._dynamicForm.model.get();
    this.candidateEditFormView = this._dynamicForm.view.get();
  }

  private _initFormValuesEntityUpdate(candidate: CandidateModel | null) {
    if (!candidate || Object.keys(candidate).length === 0) {
      return;
    }

    this._dynamicForm.setControlsValue('personalInfo', {
      firstname: candidate.firstname,
      lastname: candidate.lastname,
      email: candidate.email,
    });
  }
}

// TODO: async validation to verify if the email already exists in the process of creating the candidateEditForm
// localhost:3000/candidates/?lastname=Graham
