import { Component, Input, OnInit } from '@angular/core';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormModelBuilder } from 'src/app/dynamic-form/services/form-model-builder';
import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';
import { JobApplicationModel } from 'src/app/job-board/models/job-application.model';

@Component({
  selector: 'ahr-job-application-candidate',
  template: `
    <ahr-dynamic-form
      [model]="form.model"
      [settings]="form.settings"
      [showSpinner]="showSpinner"
    ></ahr-dynamic-form>
  `,
  providers: [DynamicFormService],
})
export class JobApplicationCandidateComponent implements OnInit {
  @Input()
  currentApplication: JobApplicationModel;

  @Input()
  showSpinner: boolean = false;

  JA_CANDIDATE_INFO: FormControlConfig[] = [];

  form: FormModelBuilder;

  constructor(private _dynamicForm: DynamicFormService) {}

  ngOnInit(): void {
    this.form = new FormModelBuilder();
    this._setFormControlsConfig();
    this._setupForm();
    this._handleForms();

    this._initFormValues();
  }

  ngOnDestroy() {
    this._dynamicForm.destroy();
  }

  private _setFormControlsConfig() {
    this.JA_CANDIDATE_INFO = [
      {
        type: 'input',
        placeholder: '',
        label: 'Name',
        key: 'candidateName',
        readonly: true,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'E-mail',
        key: 'candidateEmail',
        readonly: true,
      },
    ];
  }

  private _setupForm() {
    const { form } = this;

    form.setup(
      { key: 'jaCandidateInfo', title: 'Candidate' },
      this.JA_CANDIDATE_INFO
    );
  }

  private _handleForms() {
    this._dynamicForm.load(this.form);
  }

  private _initFormValues() {
    const { currentApplication } = this;

    this._dynamicForm.setControlsValue({
      candidateName: currentApplication.candidate.getFullName(),
      candidateEmail: currentApplication.candidate.getEmail(),
    });
  }
}
