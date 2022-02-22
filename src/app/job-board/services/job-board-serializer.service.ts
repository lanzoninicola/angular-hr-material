import { Injectable } from '@angular/core';
import { DateService } from 'src/app/core/services/date.service';
import { RequestToHireSerializerService } from 'src/app/request-to-hire/services/request-to-hire-serializer.service';
import { RequestToHireDTO } from 'src/app/request-to-hire/types/request-to-hire.dto.type';
import { BranchDTO } from 'src/app/settings/models/branch.model';
import {
  DepartmentDTO,
  DepartmentModel,
} from 'src/app/settings/models/department.model';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { BoardTemplateSerializerService } from 'src/app/settings/services/board-template/board-template-serializer.service';
import { BranchSerializerService } from 'src/app/settings/services/branch/branch-serializer.service';
import { DepartmentSerializerService } from 'src/app/settings/services/department/department-serializer.service';
import { JobRoleSerializerService } from 'src/app/settings/services/job-role/job-role-serializer.service';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';
import { BoardTemplateDTO } from 'src/app/settings/types/board-template.types';
import { JobRoleDTO } from 'src/app/settings/types/job-role.type';
import { UserModel } from 'src/app/users/models/user.model';
import { UserSerializerService } from 'src/app/users/services/user-serializer.service';
import { UserDTO } from 'src/app/users/types/user.type';
import { JobIdModel } from '../models/jobid.model';
import { JobIdDTO } from '../types/jobid.dto.type';

// TODO: Update with related models

@Injectable({
  providedIn: 'root',
})
export class JobBoardSerializerService {
  picklist: PicklistModel;

  constructor(
    private _dateService: DateService,
    private _requestSerializer: RequestToHireSerializerService,
    private _boardTemplateSerializer: BoardTemplateSerializerService,
    private _branchSerializer: BranchSerializerService,
    private _jobRoleSerializer: JobRoleSerializerService,
    private _picklistService: PicklistService
  ) {}

  deserialize(
    dto: JobIdDTO,
    relatedModels: {
      user: UserModel;
      department: DepartmentModel;
      picklist: PicklistModel;
    }
  ): JobIdModel {
    const { user, department, picklist } = relatedModels;

    this.picklist = picklist;

    return new JobIdModel(
      dto.id,
      this.getRequest(dto.requests),
      this.getBoardTemplate(dto.boardtemplates),
      dto.title,
      department,
      this.getPicklistModelById(dto.businessUnit),
      user,
      this.getJobRole(dto.jobroles),
      this.getPicklistModelById(dto.roleLevel),
      dto.roleTaskDescription,
      this.getPicklistModelById(dto.jobLocationType),
      this.getJobLocation(dto.branches),
      this.getPicklistModelById(dto.employmentStatus),
      dto.minimumQualifications,
      dto.preferredQualifications,
      dto.benefits,
      dto.specialCategoriesOpened,
      this.getPicklistModelById(dto.status),
      this._dateService.ISOToFullDate(dto.createdAt),
      this._dateService.ISOToFullDate(dto.updatedAt)
    );
  }

  getRequest(dto: RequestToHireDTO) {
    return this._requestSerializer.deserialize(dto, this.picklist);
  }

  getBoardTemplate(dto: BoardTemplateDTO) {
    return this._boardTemplateSerializer.deserialize(dto);
  }

  getJobRole(dto: JobRoleDTO) {
    return this._jobRoleSerializer.deserialize(dto);
  }

  getJobLocation(dto: BranchDTO) {
    return this._branchSerializer.deserialize(dto);
  }

  getPicklistModelById(id: number) {
    return this.picklist.findItemById(id);
  }

  serialize(model: JobIdModel): JobIdDTO {
    return {
      id: model.id ? model.id : 0,
      requestsId: model.requestToHire.getId(),
      boardtemplatesId: model.boardTemplate.getId(),
      title: model.getTitle(),
      departmentsId: model.getDepartment().getId(),
      businessUnit: model.getBusinessUnit().getId(),
      usersId: model.getRequester().getId(),
      jobrolesId: model.getJobRole().getId(),
      roleLevel: model.getRoleLevel().getId(),
      roleTaskDescription: model.getRoleTaskDescription(),
      jobLocationType: model.getJobLocationType().getId(),
      branchesId: model.getJobLocation().getId(),
      employmentStatus: model.getEmploymentStatus().getId(),
      minimumQualifications: model.getMinimumQualifications(),
      preferredQualifications: model.getPreferredQualifications(),
      benefits: model.getBenefits(),
      specialCategoriesOpened: model.getSpecialCategoriesOpened(),
      status: model.getStatus().getId(),
      createdAt: this._dateService.dateToISOString(model.createdAt),
      updatedAt: this._dateService.dateToISOString(model.updatedAt),
      boardtemplates: {} as BoardTemplateDTO,
      requests: {} as RequestToHireDTO,
      users: {} as UserDTO,
      departments: {} as DepartmentDTO,
      jobroles: {} as JobRoleDTO,
      branches: {} as BranchDTO,
    };
  }
}
