import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { JobApplicationModel } from '../../models/job-application.model';
import { JobBoardService } from '../../services/job-board.service';

@Component({
  selector: 'ahr-job-application-edit',
  templateUrl: './job-application-edit.component.html',
  styleUrls: ['./job-application-edit.component.scss'],
})
export class JobApplicationEditComponent implements OnInit {
  private subs = new Subscription();
  currentApplication: JobApplicationModel;
  entityState: EntityState = 'create';

  formState$: BehaviorSubject<FormState> = new BehaviorSubject<FormState>(
    'idle'
  );
  formStatus$: Observable<any>;
  formValueChanges$: Observable<any>;

  formData: any;

  constructor(private _dataService: JobBoardService) {}

  ngOnInit(): void {
    this.entityState = this._dataService.store.entityState;
    this.currentApplication = this._dataService.store.currentApplication;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onValueChanges(valueChanges$: Observable<any>) {
    valueChanges$.subscribe((value) => console.log(value));
  }

  onStatusChanges(statusChanges$: Observable<any>) {}

  onStateChanges(formState$: BehaviorSubject<FormState>) {}

  onSaveButtonClicked() {}
}
