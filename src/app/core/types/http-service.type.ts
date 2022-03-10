import { Observable } from 'rxjs';
import { CandidateDTO } from 'src/app/pages/candidates/types/candidate.dto.type';
import { JobIdDTO } from 'src/app/pages/job-board/types/jobid.dto.type';
import { RequestToHireDTO } from 'src/app/pages/request-to-hire/types/request-to-hire.dto.type';
import { BranchDTO } from 'src/app/pages/settings/models/branch.model';
import { DepartmentDTO } from 'src/app/pages/settings/models/department.model';
import { JobRoleDTO } from 'src/app/pages/settings/models/job-role.model';
import { BoardTemplateDTO } from 'src/app/pages/settings/types/board-template.types';
import { UserDTO } from 'src/app/pages/users/types/user.type';

import { Type } from 'typescript';

export interface HttpRequestOptionParams {
  withRelations?: boolean;
  relations?: string[];
}

export interface HttpService {
  findAll(options?: HttpRequestOptionParams | undefined): Observable<DTO>;
  findById(id: number): Observable<DTO>;
  save(dto: any): Observable<DTO>;
  update(dto: any): Observable<DTO>;
}

type DTO =
  | RequestToHireDTO
  | RequestToHireDTO[]
  | UserDTO
  | UserDTO[]
  | BoardTemplateDTO
  | BoardTemplateDTO[]
  | BranchDTO
  | BranchDTO[]
  | DepartmentDTO
  | DepartmentDTO[]
  | JobRoleDTO
  | JobRoleDTO[]
  | JobIdDTO
  | JobIdDTO[]
  | CandidateDTO
  | CandidateDTO[];
