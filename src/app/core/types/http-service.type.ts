import { Observable } from 'rxjs';
import { CandidateDTO } from 'src/app/candidates/types/candidate.dto.type';
import { JobIdDTO } from 'src/app/job-board/types/jobid.dto.type';
import { RequestToHireDTO } from 'src/app/request-to-hire/types/request-to-hire.dto.type';
import { BranchDTO } from 'src/app/settings/models/branch.model';
import { BoardTemplateDTO } from 'src/app/settings/types/board-template.types';
import { DepartmentDTO } from 'src/app/settings/types/department.type';
import { JobRoleDTO } from 'src/app/settings/types/job-role.type';
import { UserDTO } from 'src/app/users/types/user.type';
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
