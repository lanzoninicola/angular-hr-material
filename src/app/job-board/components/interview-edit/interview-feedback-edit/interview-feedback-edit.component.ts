import { Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { InterviewFeedbackModel } from 'src/app/job-board/models/interview-feedback.model';
import { InterviewRoundModel } from 'src/app/job-board/models/interview-round.model';
import { InterviewFeedbackService } from 'src/app/job-board/services/interview-feedback.service';
import { InterviewRoundService } from 'src/app/job-board/services/interview-round.service';
import { InterviewFeedbackFormData } from 'src/app/job-board/types/interview-feedback.form.type';

@Component({
  selector: 'ahr-interview-feedback-edit',
  templateUrl: './interview-feedback-edit.component.html',
  styleUrls: ['./interview-feedback-edit.component.scss'],
})
export class InterviewFeedbackEditComponent implements OnInit {
  currentRound: InterviewRoundModel | null;

  entityState: EntityState;

  feedbacks: InterviewFeedbackModel[] = [];
  currentFeedbackIdx: number | null;

  formState: FormState = 'idle';
  formData: InterviewFeedbackFormData;
  formStatus: string = 'invalid';
  sliderStatus: string = 'invalid';

  sub = new Subscription();

  constructor(
    private _interviewRound: InterviewRoundService,
    private _dataService: InterviewFeedbackService
  ) {}

  ngOnInit(): void {
    this._subscribeState();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  saveFeedback() {
    const { entityState } = this;

    if (entityState === 'create') {
      this._createFeedback();
    }

    if (entityState === 'update') {
      this._updateFeedback();
    }
  }

  close() {
    const { stateShowEditForm$, stateEntityState$ } = this._dataService;

    stateShowEditForm$.next(false);
    stateEntityState$.next('idle');
  }

  onStateChanges(formState: FormState) {
    this.formState = formState;
  }

  onValueChanges(formData: InterviewFeedbackFormData) {
    this.formData = formData;
  }

  onStatusChanges(formStatus: string) {
    this.formStatus = formStatus;
  }

  onSliderStatusChanges(sliderStatus: string) {
    this.sliderStatus = sliderStatus;
  }

  private _subscribeState() {
    const { stateInterviewRoundSelected$ } = this._interviewRound;

    const {
      stateFeedbacks$,
      stateEntityState$,
      stateShowEditForm$,
      stateFeedbackEditable$,
    } = this._dataService;

    this.sub.add(
      stateInterviewRoundSelected$.subscribe((round) => {
        this.currentRound = round;
      })
    );

    this.sub.add(
      stateFeedbacks$.subscribe((feedbacks) => {
        this.feedbacks = [...feedbacks];
      })
    );
    this.sub.add(
      stateEntityState$.subscribe((entityState) => {
        this.entityState = entityState;
      })
    );
    this.sub.add(stateShowEditForm$.subscribe());

    this.sub.add(
      stateFeedbackEditable$.subscribe(
        (feedbackIdx) => (this.currentFeedbackIdx = feedbackIdx)
      )
    );
  }

  private _createFeedback() {
    const { stateFeedbacks$, stateShowEditForm$, stateEntityState$ } =
      this._dataService;

    const feedbackModel = this._dataService.getEntityModelFromFormData(
      this.formData
    );

    this._dataService
      .save(feedbackModel)
      .pipe(
        tap(() => {
          const nextFeedbacks = [...this.feedbacks];
          nextFeedbacks.splice(0, 0, feedbackModel);

          stateFeedbacks$.next(nextFeedbacks);
          stateShowEditForm$.next(false);
          stateEntityState$.next('idle');
        })
      )
      .subscribe();
  }

  private _updateFeedback() {
    const { stateFeedbacks$, stateShowEditForm$, stateEntityState$ } =
      this._dataService;

    const feedbackModel = this._dataService.getEntityModelFromFormData(
      this.formData
    );

    this._dataService
      .update(feedbackModel)
      .pipe(
        tap(() => {
          const nextFeedbacks = this.feedbacks.map((feedback) => {
            if (feedback.id === feedbackModel.id) {
              return feedbackModel;
            }

            return feedback;
          });

          stateFeedbacks$.next(nextFeedbacks);
          stateShowEditForm$.next(false);
          stateEntityState$.next('idle');
        })
      )
      .subscribe();
  }
}
