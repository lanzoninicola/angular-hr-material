import { Component, OnInit } from '@angular/core';
import { map, Subscription, tap } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { InterviewFeedbackModel } from 'src/app/job-board/models/interview-feedback.model';
import { InterviewRoundModel } from 'src/app/job-board/models/interview-round.model';
import { InterviewFeedbackService } from 'src/app/job-board/services/interview-feedback.service';
import { InterviewRoundService } from 'src/app/job-board/services/interview-round.service';

@Component({
  selector: 'ahr-interview-feedback-list',
  templateUrl: './interview-feedback-list.component.html',
  styleUrls: ['./interview-feedback-list.component.scss'],
})
export class InterviewFeedbackListComponent implements OnInit {
  currentRound: InterviewRoundModel | null = null;

  entityState: EntityState = 'idle';

  showEditForm: boolean = false;

  feedbacks: InterviewFeedbackModel[] = [];

  sub: Subscription = new Subscription();

  constructor(
    private _interviewRound: InterviewRoundService,
    private _dataService: InterviewFeedbackService
  ) {}

  ngOnInit(): void {
    this._subscribeState();

    this._loadData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addFeedback() {
    const { stateEntityState$, stateShowEditForm$ } = this._dataService;

    stateShowEditForm$.next(true);
    stateEntityState$.next('create');
  }

  private _subscribeState() {
    const { stateInterviewRoundSelected$ } = this._interviewRound;

    const { stateFeedbacks$, stateEntityState$, stateShowEditForm$ } =
      this._dataService;

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
    this.sub.add(
      stateShowEditForm$.subscribe((showEditForm) => {
        this.showEditForm = showEditForm;
      })
    );
  }

  private _loadData() {
    const { stateFeedbacks$ } = this._dataService;

    if (this.currentRound) {
      this.sub.add(
        this._dataService
          .findByInterviewRound(this.currentRound)
          .pipe(
            map((feedbacks) => {
              return feedbacks.map((feedback) => feedback);
            }),
            tap((feedbacks) => stateFeedbacks$.next(feedbacks))
          )
          .subscribe()
      );
    }
  }

  deleteFeedback(index: number) {
    const { id } = this.feedbacks[index];
    const { stateFeedbacks$, stateEntityState$ } = this._dataService;

    this._dataService
      .delete(id)
      .pipe(
        tap(() => {
          this.feedbacks.splice(index, 1);
          stateFeedbacks$.next(this.feedbacks);
          stateEntityState$.next('idle');
        })
      )
      .subscribe();
  }

  editFeedback(index: number) {
    const { stateEntityState$, stateShowEditForm$, stateFeedbackEditable$ } =
      this._dataService;

    stateShowEditForm$.next(true);
    stateEntityState$.next('update');
    stateFeedbackEditable$.next(index);
  }
}
