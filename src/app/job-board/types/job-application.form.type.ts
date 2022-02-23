import { CandidateModel } from 'src/app/candidates/models/candidate.model';
import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { JobApplicationWorkingStatusModel } from '../models/ja-working-status.model';
import { JobIdModel } from '../models/jobid.model';

export interface JobApplicationEditFormData {
  id: number;
  jobId: JobIdModel;
  candidate: CandidateModel;
  status: JobApplicationWorkingStatusModel;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplicationFormControlsData {
  workingStatus: SelectOptionConfig[];
}
