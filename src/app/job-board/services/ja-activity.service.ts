import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';

import { JobApplicationActivityCollection } from '../models/ja-activity.collection';
import { JobApplicationActivityModel } from '../models/ja-activity.model';
import { JobsApplicationsCollection } from '../models/job-application.collection';
import { JobApplicationModel } from '../models/job-application.model';
import { JobApplicationActivityDTO } from '../types/ja-activity.dto.type';
import { JobApplicationActivityFormData } from '../types/ja-activity.form.type';
import { JobApplicationActivityHttpService } from './ja-activity-http.service';
import { JobApplicationActivitySerializerService } from './ja-activity-serializer.service';
import { JobApplicationsService } from './job-applications.service';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationActivityService {
  stateActivities$ = new BehaviorSubject<JobApplicationActivityModel[]>([]);
  stateEntityState$ = new BehaviorSubject<EntityState>('idle');
  stateShowEditForm$ = new BehaviorSubject<boolean>(false);
  stateActivityEditable$ = new BehaviorSubject<number | null>(null);

  constructor(
    private _httpService: JobApplicationActivityHttpService,
    private _jobApplicationService: JobApplicationsService,
    private _picklistService: PicklistService,
    private _serializationService: JobApplicationActivitySerializerService
  ) {}

  findAll(): Observable<JobApplicationActivityCollection> {
    const records$: Observable<JobApplicationActivityDTO[]> =
      this._httpService.findAll();

    const jobApplications$: Observable<JobsApplicationsCollection> =
      this._jobApplicationService.findAll();

    const picklist$: Observable<PicklistModel> =
      this._picklistService.findByType('jobapplication-activity-type');

    return forkJoin([records$, jobApplications$, picklist$]).pipe(
      map(([records, jobApplications, picklist]) => {
        const activities = records.map((record) => {
          const jobApplication = jobApplications.findItemById(
            record.jobsapplicationsId
          );
          const picklistItem = picklist.findItemById(record.type);

          return this._serializationService.deserialize(record, {
            jobApplication,
            picklistItem,
          });
        });

        return new JobApplicationActivityCollection(activities);
      })
    );
  }

  findById(id: number): Observable<JobApplicationActivityModel> {
    // if (this._shouldCurrentCached(id)) {
    //   return of(this._currentCached());
    // }

    const record$: Observable<JobApplicationActivityDTO> =
      this._httpService.findById(id);

    const jobApplication$: Observable<JobApplicationModel> = record$.pipe(
      switchMap((record) => {
        return this._jobApplicationService.findById(record.id);
      })
    );

    const picklist$: Observable<PicklistItemModel> = record$.pipe(
      switchMap((record) => {
        return this._picklistService.findById(record.type);
      })
    );

    return forkJoin([record$, jobApplication$, picklist$]).pipe(
      map(([record, jobApplication, picklistItem]) => {
        return this._serializationService.deserialize(record, {
          jobApplication,
          picklistItem,
        });
      })
    );
  }

  findByJobApplication(
    jobApplication: JobApplicationModel
  ): Observable<JobApplicationActivityCollection> {
    const records$: Observable<JobApplicationActivityDTO[]> =
      this._httpService.findByParam(
        'jobsapplicationsId',
        String(jobApplication.getId())
      );

    const picklist$: Observable<PicklistModel> =
      this._picklistService.findByType('jobapplication-activity-type');

    return forkJoin([records$, picklist$]).pipe(
      map(([records, picklist]) => {
        const activities = records.map((record) => {
          const picklistItem = picklist.findItemById(record.type);

          return this._serializationService.deserialize(record, {
            jobApplication,
            picklistItem,
          });
        });

        return new JobApplicationActivityCollection(activities);
      })
    );
  }

  save(model: JobApplicationActivityModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.save(dto);
  }

  update(model: JobApplicationActivityModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.update(dto);
  }

  delete(id: number) {
    return this._httpService.delete(id);
  }

  getEntityModelFromFormData(
    formData: JobApplicationActivityFormData
  ): JobApplicationActivityModel {
    return new JobApplicationActivityModel(
      formData.id,
      formData.jobsapplicationsId,
      formData.date,
      formData.type,
      formData.description,
      formData.createdAt,
      formData.updatedAt
    );
  }
}
