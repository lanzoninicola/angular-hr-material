import { CandidateModel } from 'src/app/candidates/models/candidate.model';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { JobIdModel } from './jobid.model';

export class JobApplicationModel {
  id: number;
  jobId: JobIdModel;
  candidate: CandidateModel;
  status: PicklistItemModel;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    jobId: JobIdModel,
    candidate: CandidateModel,
    status: PicklistItemModel,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.jobId = jobId;
    this.candidate = candidate;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getJobsId(): JobIdModel {
    return this.jobId;
  }

  getCandidate(): CandidateModel {
    return this.candidate;
  }

  getStatus(): PicklistItemModel {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
