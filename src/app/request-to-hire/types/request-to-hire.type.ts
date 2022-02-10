import { PicklistValue } from 'src/app/core/types/picklist.type';
import { BranchModel } from 'src/app/settings/models/branch.model';
import { DepartmentModel } from 'src/app/settings/models/department.model';
import { JobRoleModel } from 'src/app/settings/models/job-role.model';
import { BranchDTO } from 'src/app/settings/types/branch.type';
import { DepartmentDTO } from 'src/app/settings/types/department.type';
import { JobRoleDTO } from 'src/app/settings/types/job-role.type';
import { UserModel } from 'src/app/users/models/user.model';
import { UserDTO } from 'src/app/users/types/user.type';

export interface RequestToHireDTO {
  id: number;
  title: string;
  department: DepartmentDTO;
  businessUnit: PicklistValue;
  requester: UserDTO;
  jobRole: JobRoleDTO;
  roleTaskDescription: string; // long description
  roleLevel: PicklistValue;
  highPriority: boolean;
  jobLocationType: PicklistValue;
  jobLocation: BranchDTO;
  employmentStatus: PicklistValue;
  minimumQualifications: string; // long description
  preferredQualifications: string; // long description
  benefits: string; // long description
  budget: string;
  specialCategoriesOpened: boolean;
  additionalNotes: string; // long description
  status: RTHStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RequestToHireHttpSerialized {
  id: number;
  title: string;
  department: DepartmentModel;
  businessUnit: PicklistValue;
  requester: UserModel;
  jobRole: JobRoleModel;
  roleTaskDescription: string; // long description
  roleLevel: PicklistValue;
  highPriority: boolean;
  jobLocationType: PicklistValue;
  jobLocation: BranchModel;
  employmentStatus: PicklistValue;
  minimumQualifications: string; // long description
  preferredQualifications: string; // long description
  benefits: string; // long description
  budget: string;
  specialCategoriesOpened: boolean;
  additionalNotes: string; // long description
  status: RTHStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type RTHStatus = 'new' | 'backlog' | 'in-progress' | 'pending' | 'done';
