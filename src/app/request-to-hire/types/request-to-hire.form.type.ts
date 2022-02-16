import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { BranchModel } from 'src/app/settings/models/branch.model';
import { DepartmentModel } from 'src/app/settings/models/department.model';
import { JobRoleModel } from 'src/app/settings/models/job-role.model';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { UserModel } from 'src/app/users/models/user.model';

export interface RequestToHireFormData {
  id: number;
  title: string;
  department: DepartmentModel;
  businessUnit: PicklistItemModel;
  requester: UserModel;
  jobRole: JobRoleModel;
  roleTaskDescription: string;
  roleLevel: PicklistItemModel;
  highPriority: boolean;
  jobLocationType: PicklistItemModel;
  jobLocation: BranchModel;
  employmentStatus: PicklistItemModel;
  minimumQualifications: string;
  preferredQualifications: string;
  benefits: string;
  budget: string;
  specialCategoriesOpened: boolean;
  additionalNotes: string;
  status: PicklistItemModel;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestToHireFormControlsData {
  picklist: {
    workingStatus: SelectOptionConfig[];
    businessUnit: SelectOptionConfig[];
    employmentStatus: SelectOptionConfig[];
    roleLevel: SelectOptionConfig[];
    jobLocationType: SelectOptionConfig[];
  };
  departments: SelectOptionConfig[];
  branches: SelectOptionConfig[];
  jobRoles: SelectOptionConfig[];
}
