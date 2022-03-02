import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { CandidateModel } from 'src/app/candidates/models/candidate.model';
import { CandidatesCollection } from 'src/app/candidates/models/candidates.collection';
import { CandidateService } from 'src/app/candidates/services/candidate.service';
import { PicklistType } from 'src/app/settings/types/picklist-item.type';

import { JobApplicationWorkingStatusCollection } from '../models/ja-working-status.collection';
import { JobApplicationWorkingStatusModel } from '../models/ja-working-status.model';
import { JobsApplicationsCollection } from '../models/job-application.collection';
import { JobApplicationModel } from '../models/job-application.model';
import { JobIdModel } from '../models/jobid.model';
import { JobsCollection } from '../models/jobs.collection';
import { JobApplicationDTO } from '../types/job-application.dto.type';
import {
  JobApplicationEditFormData,
  JobApplicationFormControlsData,
} from '../types/job-application.form.type';
import { JobApplicationWorkingStatusService } from './ja-working-status.service';
import { JobApplicationsHttpService } from './job-applications-http.service';
import { JobApplicationsSerializerService } from './job-applications-serializer.service';
import { JobBoardStoreService } from './job-board-store.service';
import { JobBoardService } from './job-board.service';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationsService {
  requiredPicklistTypes: PicklistType[] = [];

  relations: string[] = [];

  constructor(
    private _httpService: JobApplicationsHttpService,
    private _jobBoardService: JobBoardService,
    private _candidateService: CandidateService,
    private _jaWorkingStatus: JobApplicationWorkingStatusService,
    private _serializationService: JobApplicationsSerializerService,
    private _store: JobBoardStoreService
  ) {}

  get store() {
    return this._store;
  }

  findAll(): Observable<JobsApplicationsCollection> {
    const records$: Observable<JobApplicationDTO[]> =
      this._httpService.findAll();

    const jobs$: Observable<JobsCollection> = this._jobBoardService.findAll();

    const candidates$: Observable<CandidatesCollection> =
      this._candidateService.findAll();

    const workingStatuses$: Observable<JobApplicationWorkingStatusCollection> =
      this._jaWorkingStatus.findAll();

    return forkJoin([records$, jobs$, candidates$, workingStatuses$]).pipe(
      map(([records, jobs, candidates, workingStatuses]) => {
        const jobApplication = records.map((record) => {
          const jobId = jobs.findItemById(record.jobsId);
          const candidate = candidates.findItemById(record.candidatesId);
          const workingStatus = workingStatuses.findItemById(
            record.jaworkingstatusesId
          );

          return this._serializationService.deserialize(record, {
            jobId,
            candidate,
            workingStatus,
          });
        });

        return new JobsApplicationsCollection(jobApplication);
      })
    );
  }

  findById(id: number): Observable<JobApplicationModel> {
    // if (this._shouldCurrentCached(id)) {
    //   return of(this._currentCached());
    // }

    const record$: Observable<JobApplicationDTO> =
      this._httpService.findById(id);

    const jobId$: Observable<JobIdModel> = record$.pipe(
      switchMap((record) => {
        return this._jobBoardService.findById(record.jobsId);
      })
    );

    const candidate$: Observable<CandidateModel> = record$.pipe(
      switchMap((record) => {
        return this._candidateService.findById(record.candidatesId);
      })
    );

    const workingStatus$: Observable<JobApplicationWorkingStatusModel> =
      record$.pipe(
        switchMap((record) => {
          return this._jaWorkingStatus.findById(record.jaworkingstatusesId);
        })
      );

    return forkJoin([record$, jobId$, candidate$, workingStatus$]).pipe(
      map(([record, jobId, candidate, workingStatus]) => {
        return this._serializationService.deserialize(record, {
          jobId,
          candidate,
          workingStatus,
        });
      })
    );
  }

  findByJobId(jobId: JobIdModel): Observable<JobsApplicationsCollection> {
    const records$: Observable<JobApplicationDTO[]> =
      this._httpService.findByParam('jobsid', String(jobId.getId()));

    const candidates$: Observable<CandidatesCollection> =
      this._candidateService.findAll();

    const workingStatuses$: Observable<JobApplicationWorkingStatusCollection> =
      this._jaWorkingStatus.findAll();

    return forkJoin([records$, candidates$, workingStatuses$]).pipe(
      map(([records, candidates, workingStatuses]) => {
        const jobApplication = records.map((record) => {
          const candidate = candidates.findItemById(record.candidatesId);
          const workingStatus = workingStatuses.findItemById(
            record.jaworkingstatusesId
          );

          return this._serializationService.deserialize(record, {
            jobId,
            candidate,
            workingStatus,
          });
        });

        return new JobsApplicationsCollection(jobApplication);
      })
    );
  }

  findByCandidate(
    candidate: CandidateModel
  ): Observable<JobsApplicationsCollection> {
    const records$: Observable<JobApplicationDTO[]> =
      this._httpService.findByParam('candidatesId', String(candidate.getId()));

    const jobs$: Observable<JobsCollection> = this._jobBoardService.findAll();

    const workingStatuses$: Observable<JobApplicationWorkingStatusCollection> =
      this._jaWorkingStatus.findAll();

    return forkJoin([records$, jobs$, workingStatuses$]).pipe(
      map(([records, jobs, workingStatuses]) => {
        const jobApplication = records.map((record) => {
          const jobId = jobs.findItemById(record.candidatesId);
          const workingStatus = workingStatuses.findItemById(
            record.jaworkingstatusesId
          );

          return this._serializationService.deserialize(record, {
            jobId,
            candidate,
            workingStatus,
          });
        });

        return new JobsApplicationsCollection(jobApplication);
      })
    );
  }

  save(model: JobApplicationModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.save(dto);
  }

  update(model: JobApplicationModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.update(dto);
  }

  getEntityModelFromFormData(
    formData: JobApplicationEditFormData
  ): JobApplicationModel {
    const createdAt =
      this.store.entityState === 'update' ? formData.createdAt : new Date();
    const updatedAt = new Date();

    return new JobApplicationModel(
      formData.id,
      formData.jobId,
      formData.candidate,
      formData.status,
      createdAt,
      updatedAt
    );
  }
}
