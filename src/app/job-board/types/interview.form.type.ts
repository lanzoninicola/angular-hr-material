import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { UserModel } from 'src/app/users/models/user.model';
import { JobApplicationModel } from '../models/job-application.model';

export interface InterviewFormData {
  id: number;
  jobsapplicationsId: JobApplicationModel;
  status: PicklistItemModel;
  interviewers: UserModel[];
  notes: string;
  rating: number;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
