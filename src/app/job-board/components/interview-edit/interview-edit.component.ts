import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { InterviewModel } from '../../models/interview.model';
import { InterviewService } from '../../services/interview.service';
import { InterviewFormData } from '../../types/interview.form.type';

@Component({
  selector: 'ahr-interview-edit',
  templateUrl: './interview-edit.component.html',
  styleUrls: ['./interview-edit.component.scss'],
})
export class InterviewEditComponent implements OnInit {
  currentInterview: InterviewModel | null;
  entityState: EntityState = 'create';
  showJobIdDetails: boolean = false;

  formState$: Observable<FormState>;
  formStatus$: Observable<string>;

  mainFormState$ = new BehaviorSubject<FormState>('idle');
  mainFormStatus$ = new BehaviorSubject('valid');
  mainValueChanges$: BehaviorSubject<null | InterviewFormData> =
    new BehaviorSubject<null | InterviewFormData>(null);

  formData: any;

  private sub = new Subscription();

  constructor(private _dataService: InterviewService) {}

  ngOnInit(): void {
    this.sub.add(
      this._dataService.stateCurrentInterview$.subscribe((currentInterview) => {
        this.currentInterview = currentInterview;
      })
    );

    this.sub.add(
      this._dataService.stateEntityState$.subscribe((entityState) => {
        this.entityState = entityState;
      })
    );

    this.formStatus$ = this._getGlobalFormStatus();
    this.formState$ = this._getGlobalFormState();

    console.log(this.currentInterview);
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
