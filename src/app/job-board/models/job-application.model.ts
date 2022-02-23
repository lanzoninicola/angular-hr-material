import { CandidateModel } from 'src/app/candidates/models/candidate.model';

import { JobApplicationWorkingStatusModel } from './ja-working-status.model';
import { JobIdModel } from './jobid.model';

export class JobApplicationModel {
  id: number;
  jobId: JobIdModel;
  candidate: CandidateModel;
  status: JobApplicationWorkingStatusModel;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    jobId: JobIdModel,
    candidate: CandidateModel,
    status: JobApplicationWorkingStatusModel,
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

  getStatus(): JobApplicationWorkingStatusModel {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
