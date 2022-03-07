import { JobRoleModel } from './job-role.model';
import { PicklistItemModel } from './picklist-item.model';

export interface JobRoleQuestionModel {
  id: number;
  jobRole: JobRoleModel;
  roleLevel: PicklistItemModel;
  question: string;
}
