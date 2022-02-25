import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { map, Subscription, tap } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { JobApplicationActivityModel } from 'src/app/job-board/models/ja-activity.model';
import { JobApplicationModel } from 'src/app/job-board/models/job-application.model';
import { JobApplicationActivityService } from 'src/app/job-board/services/ja-activity.service';
import { JobBoardService } from 'src/app/job-board/services/job-board.service';

@Component({
  selector: 'ahr-job-application-activity-list',
  templateUrl: './job-application-activity-list.component.html',
  styleUrls: ['./job-application-activity-list.component.scss'],
})
export class JobApplicationActivityListComponent implements OnInit, OnDestroy {
  currentApplication: JobApplicationModel;

  entityState: EntityState = 'idle';

  showEditForm: boolean = false;

  activities: JobApplicationActivityModel[] = [];

  sub: Subscription = new Subscription();

  constructor(
    private _jobBoardService: JobBoardService,
    private _dataService: JobApplicationActivityService
  ) {}

  ngOnInit(): void {
    this.currentApplication = this._jobBoardService.store.currentApplication;

    this._subscribeState();

    this._loadData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addActivity() {
    const { stateEntityState$, stateShowEditForm$ } = this._dataService;

    stateShowEditForm$.next(true);
    stateEntityState$.next('create');
  }

  private _subscribeState() {
    const { stateActivities$, stateEntityState$, stateShowEditForm$ } =
      this._dataService;

    this.sub.add(
      stateActivities$.subscribe((activities) => {
        this.activities = [...activities];
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
    const { stateActivities$ } = this._dataService;

    this._dataService
      .findByJobApplication(this.currentApplication)
      .pipe(
        map((activityCollection) => {
          return activityCollection.getItems().map((activity) => activity);
        }),
        tap((activities) => stateActivities$.next(activities))
      )
      .subscribe();
  }

  deleteActivity(index: number) {
    const { id } = this.activities[index];
    const { stateActivities$, stateEntityState$ } = this._dataService;

    this._dataService
      .delete(id)
      .pipe(
        tap(() => {
          this.activities.splice(index, 1);
          stateActivities$.next(this.activities);
          stateEntityState$.next('idle');
        })
      )
      .subscribe();
  }

  editActivity(index: number) {
    const { stateEntityState$, stateShowEditForm$, stateActivityEditable$ } =
      this._dataService;

    stateShowEditForm$.next(true);
    stateEntityState$.next('update');
    stateActivityEditable$.next(index);
  }
}
