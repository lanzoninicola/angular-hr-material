// TODO: to delete

import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { BranchModel } from 'src/app/settings/models/branch.model';
import { DepartmentModel } from 'src/app/settings/models/department.model';
import { JobRoleModel } from 'src/app/settings/models/job-role.model';
import { PicklistModel } from 'src/app/settings/models/picklist.model';

// export interface RequestToHireFormData {
//   title: string;
//   department: number;
//   businessUnit: number;
//   requester: string;
//   jobRole: number;
//   roleTaskDescription: string; // long description
//   roleLevel: number;
//   highPriority: boolean;
//   jobLocationType: number;
//   jobLocation: number;
//   employmentStatus: number;
//   minimumQualifications: string;
//   preferredQualifications: string;
//   benefits: string;
//   budget: string;
//   specialCategoriesOpened: number;
//   additionalNotes: string;
//   status: number;
//   createdAt: string;
//   updatedAt: string;
// }

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
