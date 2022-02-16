import { Injectable } from '@angular/core';
import { DateService } from 'src/app/core/services/date.service';
import { JobRoleDTO } from 'src/app/settings/models/job-role.model';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { BranchSerializerService } from 'src/app/settings/services/branch/branch-serializer.service';
import { DepartmentSerializerService } from 'src/app/settings/services/department/department-serializer.service';
import { JobRoleSerializerService } from 'src/app/settings/services/job-role/job-role-serializer.service';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';
import { BranchDTO } from 'src/app/settings/types/branch.type';
import { DepartmentDTO } from 'src/app/settings/types/department.type';
import { UserSerializerService } from 'src/app/users/services/user-serializer.service';
import { UserDTO } from 'src/app/users/types/user.type';

import { RequestToHireModel } from '../models/request-to-hire.model';
import { RequestToHireDTO } from '../types/request-to-hire.dto.type';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireSerializerService {
  picklist: PicklistModel | null;

  constructor(
    private _dateService: DateService,
    private _usersSerializer: UserSerializerService,
    private _departmentSerializer: DepartmentSerializerService,
    private _branchSerializer: BranchSerializerService,
    private _jobRoleSerializer: JobRoleSerializerService,
    private _picklistService: PicklistService
  ) {}

  deserialize(
    dto: RequestToHireDTO,
    picklist: PicklistModel
  ): RequestToHireModel {
    this.picklist = picklist;

    return new RequestToHireModel(
      dto.id,
      dto.title,
      this.getDepartment(dto.departments),
      this.getPicklistModelById(dto.businessUnit),
      this.getRequester(dto.users),
      this.getJobRole(dto.jobroles),
      dto.roleTaskDescription,
      this.getPicklistModelById(dto.roleLevel),
      dto.highPriority,
      this.getPicklistModelById(dto.jobLocationType),
      this.getJobLocation(dto.branches),
      this.getPicklistModelById(dto.employmentStatus),
      dto.minimumQualifications,
      dto.preferredQualifications,
      dto.benefits,
      dto.budget,
      dto.specialCategoriesOpened,
      dto.additionalNotes,
      this.getPicklistModelById(dto.status),
      this._dateService.ISOToFullDate(dto.createdAt),
      this._dateService.ISOToFullDate(dto.updatedAt)
    );
  }

  getDepartment(dto: DepartmentDTO) {
    return this._departmentSerializer.deserialize(dto);
  }

  getRequester(dto: UserDTO) {
    return this._usersSerializer.deserialize(dto);
  }

  getJobRole(dto: JobRoleDTO) {
    return this._jobRoleSerializer.deserialize(dto);
  }

  getJobLocation(dto: BranchDTO) {
    return this._branchSerializer.deserialize(dto);
  }

  getPicklistModelById(id: number) {
    return this.picklist
      ? this.picklist.findItemById(id)
      : this._picklistService.EMPTY_PICKLIST_ITEM;
  }

  serialize(model: RequestToHireModel): RequestToHireDTO {
    return {
      id: model.id ? model.id : 0,
      title: model.getTitle(),
      departmentsId: model.getDepartment().getId(),
      businessUnit: model.getBusinessUnit().getId(),
      usersId: model.getRequester().getId(),
      jobrolesId: model.getJobRole().getId(),
      roleTaskDescription: model.getRoleTaskDescription(),
      roleLevel: model.getRoleLevel().getId(),
      highPriority: model.getHighPriority(),
      jobLocationType: model.getJobLocationType().getId(),
      branchesId: model.getJobLocation().getId(),
      employmentStatus: model.getEmploymentStatus().getId(),
      minimumQualifications: model.getMinimumQualifications(),
      preferredQualifications: model.getPreferredQualifications(),
      benefits: model.getBenefits(),
      budget: model.getBudget(),
      specialCategoriesOpened: model.getSpecialCategoriesOpened(),
      additionalNotes: model.getAdditionalNotes(),
      status: model.getStatus().getId(),
      createdAt: this._dateService.dateToISOString(model.createdAt),
      updatedAt: this._dateService.dateToISOString(model.updatedAt),
      users: {} as UserDTO,
      departments: {} as DepartmentDTO,
      jobroles: {} as JobRoleDTO,
      branches: {} as BranchDTO,
    };
  }
}
