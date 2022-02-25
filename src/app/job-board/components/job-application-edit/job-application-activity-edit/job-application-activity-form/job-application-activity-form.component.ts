import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, of, Subscription, switchMap, tap } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormModelBuilder } from 'src/app/dynamic-form/services/form-model-builder';
import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { JobApplicationActivityModel } from 'src/app/job-board/models/ja-activity.model';
import { JobApplicationModel } from 'src/app/job-board/models/job-application.model';
import { JobApplicationActivityService } from 'src/app/job-board/services/ja-activity.service';
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
  providers: [DynamicFormService],
})
export class JobApplicationActivityFormComponent implements OnInit, OnDestroy {
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
        type: 'date',
        placeholder: '',
        label: 'Date',
        key: 'date',
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
  valueChangesEvent: EventEmitter<JobApplicationActivityFormData> = new EventEmitter<JobApplicationActivityFormData>();

  @Output('statusChanges')
  statusChangesEvent: EventEmitter<string> = new EventEmitter<string>();

  currentActivity: JobApplicationActivityModel | null;

  constructor(
    private _route: ActivatedRoute,
    private _dynamicForm: DynamicFormService,
    private _dataService: JobApplicationActivityService
  ) {}

  ngOnInit(): void {
    this._subscribeState();
    this._setupForm();
    this._initFormValues();
    this._handleFormEvents();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private _setupForm() {
    this.formActivity = new FormModelBuilder();

    this.formActivity.setup({ key: 'formActivity' }, this.formControlsConfig);

    this._dynamicForm.load(this.formActivity);
  }

  private _initFormValues() {
    if (this.entityState === 'create') {
      this._onCreateInitFormValues();
    }

    if (this.entityState === 'update') {
      this._onUpdateInitFormValues();
    }
  }

  private _onCreateInitFormValues() {
    const { currentApplication } = this;

    const activityId = Math.floor(Math.random() * 100);

    this._dynamicForm.setControlsValue({
      id: activityId,
      jobsapplicationsId: currentApplication,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  private _onUpdateInitFormValues() {
    const { currentActivity } = this;

    console.log(currentActivity);

    this._dynamicForm.setControlsValue({
      id: currentActivity?.getId(),
      jobsapplicationsId: currentActivity?.getJobsapplicationsId(),
      type: currentActivity?.getType(),
      date: currentActivity?.getDate(),
      description: currentActivity?.getDescription(),
      createdAt: currentActivity?.getCreatedAt(),
      updatedAt: currentActivity?.getUpdatedAt(),
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

  private _subscribeState() {
    const { stateActivityEditable$, stateActivities$ } = this._dataService;

    this.sub.add(
      stateActivityEditable$
        .pipe(
          switchMap((activityIdx) => {
            if (activityIdx === null) {
              return of(null);
            }

            return stateActivities$.pipe(
              map((activities) => activities[activityIdx])
            );
          })
        )
        .subscribe((activity) => (this.currentActivity = activity))
    );
  }
}
