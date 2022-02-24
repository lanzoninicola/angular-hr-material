import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControlStatus,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscriber, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormModelBuilder } from 'src/app/dynamic-form/services/form-model-builder';
import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { JobApplicationModel } from '../../models/job-application.model';
import { JobApplicationActivityService } from '../../services/ja-activity.service';
import { JobApplicationActivityFormData } from '../../types/ja-activity.form.type';

@Component({
  selector: 'ahr-job-application-activity-new',
  template: `
    <button mat-flat-button color="primary" (click)="addActivity()">
      Add Activity
    </button>
    <ng-container formArrayName="formActivities">
      <ng-container
        *ngFor="let formActivity of formActivities.controls; let i = index"
      >
        <div class="activity-row">
          <ahr-dynamic-form
            [model]="formActivityBuilder.model"
            [settings]="formActivityBuilder.settings"
            [showSpinner]="showSpinner"
            [divider]="false"
          ></ahr-dynamic-form>

          <button mat-flat-button color="secondary" (click)="removeActivity(i)">
            <mat-icon>delete</mat-icon>
            Remove
          </button>
        </div>
        <mat-divider></mat-divider>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./job-application-activity-new.component.scss'],
  providers: [DynamicFormService],
})
export class JobApplicationActivityNewComponent implements OnInit {
  @Input()
  currentApplication: JobApplicationModel;

  @Input()
  entityState: EntityState;

  @Input()
  showSpinner: boolean = false;

  sub = new Subscription();

  @Output('formStateChanges')
  formStateEvent: EventEmitter<FormState> = new EventEmitter<FormState>();

  @Output('valueChanges')
  valueChangesEvent: EventEmitter<JobApplicationActivityFormData[]> =
    new EventEmitter<JobApplicationActivityFormData[]>();

  @Output('statusChanges')
  statusChangesEvent: EventEmitter<FormControlStatus> = new EventEmitter<FormControlStatus>();

  JA_ACTIVITY: FormControlConfig[] = [];

  formActivities: FormArray = new FormArray([]);
  formActivityBuilder: FormModelBuilder;

  constructor(
    private _route: ActivatedRoute,
    private _dynamicForm: DynamicFormService,
    private _dataService: JobApplicationActivityService
  ) {}

  ngOnInit(): void {
    this.formActivityBuilder = new FormModelBuilder();
    this._setFormControlsConfig();
    this._setupForm();
    this._handleForms();

    this._loadActivities();

    this._handleFormEvents();
  }

  ngOnDestroy() {
    this._dynamicForm.destroy();

    this.sub.unsubscribe();
  }

  addActivity() {
    this._initFormNewActivity();

    this.formActivities.insert(0, this.formActivityBuilder.model, {
      emitEvent: true,
    });
  }

  removeActivity(index: number) {
    this.formActivities.removeAt(index);
  }

  private _setFormControlsConfig() {
    this.JA_ACTIVITY = [
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

  private _setupForm() {
    const { formActivityBuilder } = this;

    formActivityBuilder.setup({ key: 'formActivity' }, this.JA_ACTIVITY);
  }

  private _handleForms() {
    this._dynamicForm.load(this.formActivityBuilder);
  }

  private _loadActivities() {
    const activities = this._dataService.findByJobApplication(
      this.currentApplication
    );

    console.log(activities);
  }

  private _initFormNewActivity() {
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
    const { formState$ } = this._dynamicForm;
    const { valueChanges, statusChanges } = this.formActivities;

    this.sub.add(
      formState$.subscribe((formState) => this.formStateEvent.emit(formState))
    );

    this.sub.add(
      valueChanges.subscribe((formData) => {
        const nextFormData = formData.map(
          (item: { [key: string]: JobApplicationActivityFormData }) => {
            return item['formActivity'];
          }
        );

        this.valueChangesEvent.emit(nextFormData);
      })
    );

    this.sub.add(
      statusChanges.subscribe((formStatus) =>
        this.statusChangesEvent.emit(formStatus)
      )
    );
  }
}
