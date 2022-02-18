import { RequestToHireDTO } from 'src/app/request-to-hire/types/request-to-hire.dto.type';
import { BranchDTO } from 'src/app/settings/models/branch.model';
import { BoardTemplateDTO } from 'src/app/settings/types/board-template.types';
import { JobRoleDTO } from 'src/app/settings/types/job-role.type';

export interface JobIdDTO {
  id: number;
  requestsId: number;
  boardtemplatesId: number;
  title: string;
  jobrolesId: number;
  roleLevel: number;
  roleTaskDescription: string;
  jobLocationType: number;
  jobLocation: number;
  employmentStatus: number;
  minimumQualifications: string;
  preferredQualifications: string;
  benefits: string;
  specialCategoriesOpened: boolean;
  status: number;
  createdAt: string;
  updatedAt: string;

  boardtemplates: BoardTemplateDTO;
  requests: RequestToHireDTO;
  jobroles: JobRoleDTO;
  branches: BranchDTO;
}

export type JobIdStatus = 'draft' | 'published' | 'closed';
