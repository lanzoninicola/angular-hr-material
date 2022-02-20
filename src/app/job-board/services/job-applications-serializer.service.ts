import { Injectable } from '@angular/core';
import { CandidateModel } from 'src/app/candidates/models/candidate.model';
import { DateService } from 'src/app/core/services/date.service';
import { JobApplicationWorkingStatusModel } from '../models/ja-working-status.model';
import { JobApplicationModel } from '../models/job-application.model';
import { JobIdModel } from '../models/job-id.model';
import { JobApplicationDTO } from '../types/job-application.dto.type';
import { JobIdDTO } from '../types/jobid.dto.type';
import { JobApplicationWorkingStatusSerializerService } from './ja-working-status-serializer.service';
import { JobBoardSerializerService } from './job-board-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationsSerializerService {
  constructor(
    private _dateService: DateService,
    private _jaWorkingStatusSerializer: JobApplicationWorkingStatusSerializerService
  ) {}

  deserialize(
    dto: JobApplicationDTO,
    relatedModels: {
      jobId: JobIdModel;
      candidate: CandidateModel;
      workingStatus: JobApplicationWorkingStatusModel;
    }
  ): JobApplicationModel {
    const { jobId, candidate, workingStatus } = relatedModels;

    return new JobApplicationModel(
      dto.id,
      jobId,
      candidate,
      workingStatus.getStatus(),
      this._dateService.ISOToFullDate(dto.createdAt),
      this._dateService.ISOToFullDate(dto.updatedAt)
    );
  }

  serialize(model: JobApplicationModel): void {
    // return {
    //   id: model.id,
    //   jobsId: model.jobId.getId(),
    //   candidatesId: model.candidate.getId(),
    //   status: model.status.getId(),
    //   createdAt: this._dateService.dateToISOString(model.createdAt),
    //   updatedAt: this._dateService.dateToISOString(model.updatedAt),
    //   jobs: null,
    //   candidates: null,
    // };
  }

  // getJobId(dto: JobIdDTO): number {
  //   return new JobIdModel(
  //     dto.id,
  //     this._jobBoardSerializer.deserialize(dto.jobs, ),

  //   )
  // }
}
