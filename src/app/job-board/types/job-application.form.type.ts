import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';

export interface JobApplicationEditFormData {
  id: number;
  title: string;
  department: string;
  role: string;
  roleLevel: string;
  requester: string;
  fullname: string;
  status: PicklistItemModel;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplicationFormControlsData {
  workingStatus: SelectOptionConfig[];
}
