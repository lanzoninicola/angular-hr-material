import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { JobApplicationModel } from '../models/job-application.model';

export interface JobApplicationActivityFormData {
  id: number;
  type: PicklistItemModel;
  jobsapplicationsId: JobApplicationModel;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
