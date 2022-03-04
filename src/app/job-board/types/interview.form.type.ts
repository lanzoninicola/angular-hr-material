import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { UserModel } from 'src/app/users/models/user.model';
import { JobApplicationModel } from '../models/job-application.model';

export interface InterviewFormData {
  id: number;
  jobsapplicationsId: JobApplicationModel;
  stage: PicklistItemModel;
  interviewers: UserModel[];
  notes: string;
  rating: number;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface InterviewFormControlsData {
  interviewStages: SelectOptionConfig[];
}
