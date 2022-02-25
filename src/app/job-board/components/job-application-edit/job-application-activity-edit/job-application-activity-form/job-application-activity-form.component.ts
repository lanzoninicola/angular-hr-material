import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormModelBuilder } from 'src/app/dynamic-form/services/form-model-builder';
import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { JobApplicationModel } from 'src/app/job-board/models/job-application.model';
import { JobApplicationActivityFormData } from 'src/app/job-board/types/ja-activity.form.type';

@Component({
  selector: 'ahr-job-application-activity-form',
  template: `
    <ahr-dynamic-form
      [model]="formActivity.model"
      [settings]="formActivity.settings"
      [showSpinner]="showSpinner"
      [divider]="false"
    ></ahr-dynamic-form>
  `,
})
export class JobApplicationActivityFormComponent implements OnInit {
  @Input()
  currentApplication: JobApplicationModel;

  @Input()
  entityState: EntityState;

  @Input()
  showSpinner: boolean = false;

  formActivity: FormModelBuilder;
  get formControlsConfig(): FormControlConfig[] {
    return [
      {
        type: 'input',
        placeholder: '',
        label: 'id',
        key: 'id',
        readonly: true,
        hidden: true,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'id',
        key: 'jobsapplicationsId',
        readonly: true,
        hidden: true,
      },
      {
        type: 'select',
        key: 'type',
        label: 'Type',
        placeholder: '',
        whatToSelect: 'type',
        options: this._route.data.pipe(
          map((data) => data['formControlsData']['activityTypes'])
        ),
        syncValidators: [Validators.required],
        showOptionDescription: true,
      },
      {
        type: 'textarea',
        placeholder: '',
        label: 'Details',
        key: 'description',
        syncValidators: [Validators.required],
        style: {
          minHeight: '100px',
          lineHeight: '1.5',
        },
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Created At',
        key: 'createdAt',
        syncValidators: [],
        readonly: true,
        hidden: true,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Last Updated At',
        key: 'updatedAt',
        syncValidators: [],
        readonly: true,
        hidden: true,
      },
    ];
  }

  sub = new Subscription();

  @Output('formStateChanges')
  formStateEvent: EventEmitter<FormState> = new EventEmitter<FormState>();

  @Output('valueChanges')
  valueChangesEvent: EventEmitter<JobApplicationActivityFormData[]> =
    new EventEmitter<JobApplicationActivityFormData[]>();

  @Output('statusChanges')
  statusChangesEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _route: ActivatedRoute,
    private _dynamicForm: DynamicFormService
  ) {}

  ngOnInit(): void {
    this._setupForm();
    this._initFormValues();
    this._handleFormEvents();
  }

  private _setupForm() {
    this.formActivity = new FormModelBuilder();

    this.formActivity.setup({ key: 'formActivity' }, this.formControlsConfig);

    this._dynamicForm.load(this.formActivity);
  }

  private _initFormValues() {
    const { currentApplication } = this;

    const activityId = Math.floor(Math.random() * 100);

    this._dynamicForm.setControlsValue({
      id: activityId,
      jobsapplicationsId: currentApplication,
      createdAt: currentApplication.createdAt,
      updatedAt: new Date(),
    });
  }

  private _handleFormEvents() {
    const { formState$, formData$, formStatus$ } = this._dynamicForm;

    this.sub.add(
      formState$.subscribe((formState) => this.formStateEvent.emit(formState))
    );

    this.sub.add(
      formData$.subscribe((formData) => {
        this.valueChangesEvent.emit(formData);
      })
    );

    this.sub.add(
      formStatus$.subscribe((formStatus) => {
        this.statusChangesEvent.emit(formStatus);
      })
    );
  }
}
