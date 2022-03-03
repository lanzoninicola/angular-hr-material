import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';
import { InterviewCollection } from '../models/interview.collection';
import { InterviewModel } from '../models/interview.model';
import { JobsApplicationsCollection } from '../models/job-application.collection';
import { JobApplicationModel } from '../models/job-application.model';
import { InterviewDTO } from '../types/interview.dto.type';
import { InterviewFormData } from '../types/interview.form.type';
import { InterviewHttpService } from './interview-http.service';
import { InterviewSerializerService } from './interview-serializer.service';
import { JobApplicationsService } from './job-applications.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  stateCurrentInterview$ = new BehaviorSubject<InterviewModel | null>(null);
  stateEntityState$ = new BehaviorSubject<EntityState>('idle');

  constructor(
    private _httpService: InterviewHttpService,
    private _jobApplicationService: JobApplicationsService,
    private _picklistService: PicklistService,
    private _serializationService: InterviewSerializerService
  ) {}

  findAll(): Observable<InterviewCollection> {
    const records$: Observable<InterviewDTO[]> = this._httpService.findAll();

    const jobApplications$: Observable<JobsApplicationsCollection> =
      this._jobApplicationService.findAll();

    const picklist$: Observable<PicklistModel> =
      this._picklistService.findByType('interview-stage');

    return forkJoin([records$, jobApplications$, picklist$]).pipe(
      map(([records, jobApplications, picklist]) => {
        const interviews = records.map((record) => {
          const jobApplication = jobApplications.findItemById(
            record.jobsapplicationsId
          );
          const picklistItem = picklist.findItemById(record.stage);

          return this._serializationService.deserialize(record, {
            jobApplication,
            picklistItem,
          });
        });

        return new InterviewCollection(interviews);
      })
    );
  }

  findById(id: number): Observable<InterviewModel> {
    // if (this._shouldCurrentCached(id)) {
    //   return of(this._currentCached());
    // }

    const record$: Observable<InterviewDTO> = this._httpService.findById(id);

    const jobApplication$: Observable<JobApplicationModel> = record$.pipe(
      switchMap((record) => {
        return this._jobApplicationService.findById(record.id);
      })
    );

    const picklist$: Observable<PicklistItemModel> = record$.pipe(
      switchMap((record) => {
        return this._picklistService.findById(record.stage);
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
  ): Observable<InterviewCollection> {
    const records$: Observable<InterviewDTO[]> = this._httpService.findByParam(
      'jobsapplicationsId',
      String(jobApplication.getId())
    );

    const picklist$: Observable<PicklistModel> =
      this._picklistService.findByType('interview-stage');

    return forkJoin([records$, picklist$]).pipe(
      map(([records, picklist]) => {
        const interviews = records.map((record) => {
          const picklistItem = picklist.findItemById(record.stage);

          return this._serializationService.deserialize(record, {
            jobApplication,
            picklistItem,
          });
        });

        return new InterviewCollection(interviews);
      })
    );
  }

  save(model: InterviewModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.save(dto);
  }

  update(model: InterviewModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.update(dto);
  }

  delete(id: number) {
    return this._httpService.delete(id);
  }

  getEntityModelFromFormData(formData: InterviewFormData): InterviewModel {
    return new InterviewModel(
      formData.id,
      formData.jobsapplicationsId,
      formData.stage,
      formData.createdAt,
      formData.updatedAt
    );
  }
}
