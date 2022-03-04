import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormModelBuilder } from 'src/app/dynamic-form/services/form-model-builder';
import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { InterviewModel } from 'src/app/job-board/models/interview.model';

@Component({
  selector: 'ahr-interview-status-form',
  template: `
    <ahr-dynamic-form
      [model]="form.model"
      [settings]="form.settings"
      [showSpinner]="showSpinner"
      [divider]="false"
    ></ahr-dynamic-form>
  `,
  providers: [DynamicFormService],
})
export class InterviewStatusFormComponent implements OnInit {
  @Input()
  currentInterview: InterviewModel | null;

  @Input()
  entityState: EntityState | null;

  @Input()
  showSpinner: boolean = false;

  sub = new Subscription();

  @Output('formStateChanges')
  formStateEvent: EventEmitter<FormState> = new EventEmitter<FormState>();

  @Output('valueChanges')
  valueChangesEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output('statusChanges')
  statusChangesEvent: EventEmitter<string> = new EventEmitter<string>();

  form: FormModelBuilder;
  get formControlConfigs(): FormControlConfig[] {
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
        label: 'jobsapplicationsId',
        key: 'jobsapplicationsId',
        readonly: true,
        hidden: true,
      },
      {
        type: 'select',
        key: 'stage',
        label: 'Interview Stage',
        placeholder: '',
        whatToSelect: 'stage',
        options: this._route.data.pipe(
          map((data) => data['formControlsData']['interviewStages'])
        ),
        syncValidators: [Validators.required],
        showOptionDescription: true,
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

  constructor(
    private _route: ActivatedRoute,
    private _dynamicForm: DynamicFormService
  ) {}

  ngOnInit(): void {
    const { formState$, formData$, formStatus$ } = this._dynamicForm;
    this.form = new FormModelBuilder();
    this._setupForm();

    if (this.entityState === 'update') {
      this._initFormValuesEntityUpdate();
    }

    this.sub.add(
      formState$.subscribe((formState) => this.formStateEvent.emit(formState))
    );

    this.sub.add(
      formData$.subscribe((formData) => this.valueChangesEvent.emit(formData))
    );

    this.sub.add(
      formStatus$.subscribe((formStatus) =>
        this.statusChangesEvent.emit(formStatus)
      )
    );
  }

  ngOnDestroy() {
    this._dynamicForm.destroy();
    this.sub.unsubscribe();
  }

  private _setupForm() {
    const { form } = this;
    const config = this.formControlConfigs;

    form.setup({ key: 'iwMainInfo' }, config);

    this._dynamicForm.load(form);
  }

  private _initFormValuesEntityUpdate() {
    const { currentInterview } = this;

    if (currentInterview) {
      this._dynamicForm.setControlsValue({
        id: currentInterview.id,
        jobsapplicationsId: currentInterview.getJobApplication(),
        stage: currentInterview.getStage(),
        createdAt: currentInterview.getCreatedAt(),
      });
    }
  }
}
