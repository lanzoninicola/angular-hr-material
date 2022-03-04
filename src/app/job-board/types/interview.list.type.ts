import { CandidateModel } from 'src/app/candidates/models/candidate.model';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { JobApplicationModel } from '../models/job-application.model';
import { JobIdModel } from '../models/jobid.model';

export interface InterviewRoundOnListTable {
  interviewId: number;
  roundId: number;
  jobApplication: JobApplicationModel;
  candidate: CandidateModel;
  jobId: JobIdModel;
  roundName: string;
  stage: PicklistItemModel;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
