import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { RequestToHireModel } from 'src/app/request-to-hire/models/request-to-hire.model';
import { BoardTemplateModel } from 'src/app/settings/models/board-template.model';
import { BranchModel } from 'src/app/settings/models/branch.model';
import { JobRoleModel } from 'src/app/settings/models/job-role.model';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';

export interface JobIdFormData {
  id: number;
  requestToHire: RequestToHireModel;
  boardTemplate: BoardTemplateModel;
  title: string;
  jobRole: JobRoleModel;
  roleTaskDescription: string;
  roleLevel: PicklistItemModel;
  jobLocationType: PicklistItemModel;
  jobLocation: BranchModel;
  employmentStatus: PicklistItemModel;
  minimumQualifications: string;
  preferredQualifications: string;
  benefits: string;
  specialCategoriesOpened: boolean;
  status: PicklistItemModel;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobIdFormControlsData {
  picklist: {
    workingStatus: SelectOptionConfig[];
    employmentStatus: SelectOptionConfig[];
    roleLevel: SelectOptionConfig[];
    jobLocationType: SelectOptionConfig[];
  };
  branches: SelectOptionConfig[];
  jobRoles: SelectOptionConfig[];
}
