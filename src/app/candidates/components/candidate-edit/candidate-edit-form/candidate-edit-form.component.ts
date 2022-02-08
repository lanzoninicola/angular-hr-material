import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { CandidateModel } from 'src/app/candidates/models/candidate.model';

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
  @Input('candidate')
  candidate: CandidateModel | null = {} as CandidateModel;

  @Input()
  showSpinner: boolean = false;

  @Output('formState')
  formStateEvent: EventEmitter<BehaviorSubject<FormState>> = new EventEmitter<
    BehaviorSubject<FormState>
  >();

  @Output('valueChanges')
  valueChangesEvent: EventEmitter<Observable<any>> = new EventEmitter<
    Observable<any>
  >();

  @Output('statusChanges')
  statusChangesEvent: EventEmitter<Observable<any>> = new EventEmitter<
    Observable<any>
  >();

  candidateEditForm: FormGroup;
  candidateEditFormView: FormViewTemplate;

  constructor(private _dynamicForm: DynamicFormService) {}

  ngOnInit(): void {
    this._buildForm();
    this._setTemplatePropertyBinding();
    this._initFormValues(this.candidate);

    this.formStateEvent.emit(this._dynamicForm.formState$);
    this.valueChangesEvent.emit(this._dynamicForm.valueChanges$);
    this.statusChangesEvent.emit(this._dynamicForm.statusChanges$);
  }

  ngOnDestroy() {
    this._dynamicForm.destroy();
  }

  private _buildForm() {
    this._dynamicForm.view.build(
      { key: 'personalInfo', title: 'Personal Information' },
      PERSONAL_INFO_CONTROLS
    );

    this._dynamicForm.model.build(this._dynamicForm.view.get());

    this._dynamicForm.load();
  }

  private _setTemplatePropertyBinding() {
    this.candidateEditForm = this._dynamicForm.model.get();
    this.candidateEditFormView = this._dynamicForm.view.get();
  }

  private _initFormValues(candidate: CandidateModel | null) {
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
const PERSONAL_INFO_CONTROLS: FormControlConfig[] = [
  {
    type: 'input',
    placeholder: '',
    label: 'Lastname',
    key: 'lastname',
    value: '',
    syncValidators: [Validators.required],
  },
  {
    type: 'input',
    placeholder: '',
    label: 'Firstname',
    key: 'firstname',
    value: '',
    syncValidators: [Validators.required],
  },
  {
    type: 'input',
    placeholder: '',
    label: 'E-mail',
    key: 'email',
    value: '',
    syncValidators: [Validators.required, Validators.email],
  },
];
