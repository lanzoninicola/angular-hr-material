import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { JobApplicationModel } from '../models/job-application.model';

export interface JobApplicationActivityFormData {
  id: number;
  jobsapplicationsId: JobApplicationModel;
  date: Date;
  type: PicklistItemModel;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
