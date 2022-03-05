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
import { InterviewFeedbackModel } from 'src/app/job-board/models/interview-feedback.model';
import { InterviewRoundModel } from 'src/app/job-board/models/interview-round.model';
import { InterviewFeedbackService } from 'src/app/job-board/services/interview-feedback.service';
import { InterviewRoundService } from 'src/app/job-board/services/interview-round.service';
import { InterviewFeedbackFormData } from 'src/app/job-board/types/interview-feedback.form.type';

@Component({
  selector: 'ahr-interview-feedback-edit-form',
  template: `
    <ahr-dynamic-form
      [model]="formFeedback.model"
      [settings]="formFeedback.settings"
      [showSpinner]="showSpinner"
      [divider]="false"
    ></ahr-dynamic-form>
  `,
  providers: [DynamicFormService],
})
export class InterviewFeedbackEditFormComponent implements OnInit, OnDestroy {
  currentRound: InterviewRoundModel | null;

  @Input()
  entityState: EntityState;

  @Input()
  showSpinner: boolean = false;

  formFeedback: FormModelBuilder;
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
        key: 'interviewsroundsId',
        readonly: true,
        hidden: true,
      },

      {
        type: 'input',
        placeholder: '',
        label: 'interviewattendeesId',
        key: 'interviewattendeesId',
        readonly: true,
        hidden: true,
      },
      {
        type: 'date',
        placeholder: '',
        label: 'Date',
        key: 'createdAt',
        readonly: true,
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
  valueChangesEvent: EventEmitter<InterviewFeedbackFormData> = new EventEmitter<InterviewFeedbackFormData>();

  @Output('statusChanges')
  statusChangesEvent: EventEmitter<string> = new EventEmitter<string>();

  currentFeedback: InterviewFeedbackModel | null;

  constructor(
    private _dynamicForm: DynamicFormService,
    private _dataService: InterviewFeedbackService,
    private _interviewRoundService: InterviewRoundService
  ) {}

  ngOnInit(): void {
    // TODO: miss the rating and the current user

    this._subscribeState();
    this._setupForm();
    this._initFormValues();
    this._handleFormEvents();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private _setupForm() {
    this.formFeedback = new FormModelBuilder();

    this.formFeedback.setup({ key: 'formFeedback' }, this.formControlsConfig);

    this._dynamicForm.load(this.formFeedback);
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
    const { currentRound } = this;

    const feedbackId = Math.floor(Math.random() * 100);

    this._dynamicForm.setControlsValue({
      id: feedbackId,
      interviewsroundsId: currentRound,
      interviewattendeesId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  private _onUpdateInitFormValues() {
    const { currentFeedback } = this;

    this._dynamicForm.setControlsValue({
      id: currentFeedback?.getId(),
      interviewsroundsId: currentFeedback?.getInterviewRound(),
      interviewattendeesId: currentFeedback?.getAttendee(),
      description: currentFeedback?.getDescription(),
      createdAt: currentFeedback?.getCreatedAt(),
      updatedAt: currentFeedback?.getUpdatedAt(),
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
    const { stateFeedbackEditable$, stateFeedbacks$ } = this._dataService;
    const { stateInterviewRoundSelected$ } = this._interviewRoundService;

    this.sub.add(
      stateInterviewRoundSelected$.subscribe((currentRound) => {
        this.currentRound = currentRound;
      })
    );

    this.sub.add(
      stateFeedbackEditable$
        .pipe(
          switchMap((feedbackIdx) => {
            if (feedbackIdx === null) {
              return of(null);
            }

            return stateFeedbacks$.pipe(
              map((feedbacks) => feedbacks[feedbackIdx])
            );
          })
        )
        .subscribe((feedback) => (this.currentFeedback = feedback))
    );
  }
}
