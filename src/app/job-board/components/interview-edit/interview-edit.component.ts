import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
} from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';

import { InterviewModel } from '../../models/interview.model';
import { InterviewRoundService } from '../../services/interview-round.service';
import { InterviewService } from '../../services/interview.service';
import { InterviewFormData } from '../../types/interview.form.type';

@Component({
  selector: 'ahr-interview-edit',
  templateUrl: './interview-edit.component.html',
  styleUrls: ['./interview-edit.component.scss'],
})
export class InterviewEditComponent implements OnInit {
  currentInterview$ = new BehaviorSubject<InterviewModel | null>(null);
  entityState$ = new BehaviorSubject<EntityState>('create');
  showJobIdDetails: boolean = false;

  formState$: Observable<FormState>;
  formStatus$: Observable<string>;

  mainFormState$ = new BehaviorSubject<FormState>('idle');
  mainFormStatus$ = new BehaviorSubject('valid');
  mainValueChanges$: BehaviorSubject<null | InterviewFormData> =
    new BehaviorSubject<null | InterviewFormData>(null);

  formData: any;

  private sub = new Subscription();

  constructor(
    private _interview: InterviewService,
    private _interviewRounds: InterviewRoundService
  ) {}

  ngOnInit(): void {
    this._loadInterviewRounds();

    this.currentInterview$ = this._interview.stateCurrentInterview$;
    this.entityState$ = this._interview.stateEntityState$;

    this.formStatus$ = this._getGlobalFormStatus();
    this.formState$ = this._getGlobalFormState();
  }

  private _loadInterviewRounds() {
    this.sub.add(
      this._interview.stateCurrentInterview$
        .pipe(
          switchMap((interview) => {
            return interview
              ? this._interviewRounds.findByInterview(interview)
              : of([]);
          })
        )
        .subscribe((interviewRounds) => {
          this._interviewRounds.stateCurrentInterviewRounds$.next(
            interviewRounds
          );
        })
    );
  }

  private _getGlobalFormStatus() {
    return combineLatest([this.mainFormStatus$]).pipe(
      map(([mainFormStatus]) => {
        if (mainFormStatus.toLowerCase() === 'invalid') {
          return 'invalid';
        }

        return 'valid';
      })
    );
  }

  private _getGlobalFormState() {
    return combineLatest([this.mainFormState$]).pipe(
      map(([mainFormState]) => {
        if (mainFormState === 'changed') {
          return 'changed';
        }

        if (mainFormState === 'submitted') {
          return 'submitted';
        }

        return 'idle';
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onValueChanges(valueChanges: InterviewFormData) {
    this.mainValueChanges$.next(valueChanges);
  }

  onStatusChanges(formStatus: string) {
    this.mainFormStatus$.next(formStatus);
  }

  onStateChanges(formState: FormState) {
    this.mainFormState$.next(formState);
  }

  onSaveButtonClicked() {
    // if (this.mainValueChanges$.value) {
    //   const currentInterview = this._jaService.getEntityModelFromFormData(
    //     this.mainValueChanges$.value
    //   );
    //   this._jaService
    //     .update(currentInterview)
    //     .subscribe(() => (this.currentInterview = currentInterview));
    // }
  }

  onShowJobIdDetails() {
    this.showJobIdDetails = !this.showJobIdDetails;
  }
}
