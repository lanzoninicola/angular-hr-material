import { Injectable } from '@angular/core';
import { DateSerializerService } from 'src/app/core/services/date-serializer.service';
import { BranchSerializerService } from 'src/app/settings/services/branch-serializer.service';
import { DepartmentSerializerService } from 'src/app/settings/services/department-serializer.service';
import { JobRoleSerializerService } from 'src/app/settings/services/job-role-serializer.service';
import { UserSerializerService } from 'src/app/users/services/user-serializer.service';

import { RequestToHireModel } from '../models/request-to-hire.model';
import { RequestToHireDTO } from '../types/request-to-hire.type';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireSerializerService {
  constructor(
    private _dateSerializer: DateSerializerService,
    private _usersSerializer: UserSerializerService,
    private _departmentSerializer: DepartmentSerializerService,
    private _jobRoleSerializer: JobRoleSerializerService,
    private _branchSerializer: BranchSerializerService
  ) {}

  deserialize(dto: RequestToHireDTO): RequestToHireModel {
    return new RequestToHireModel(
      dto.id,
      dto.title,
      this._departmentSerializer.deserialize(dto.department),
      dto.businessUnit,
      this._usersSerializer.deserialize(dto.requester),
      this._jobRoleSerializer.deserialize(dto.jobRole),
      dto.roleTaskDescription,
      dto.roleLevel,
      dto.highPriority,
      dto.jobLocationType,
      this._branchSerializer.deserialize(dto.jobLocation),
      dto.employmentStatus,
      dto.minimumQualifications,
      dto.preferredQualifications,
      dto.benefits,
      dto.budget,
      dto.specialCategoriesOpened,
      dto.additionalNotes,
      dto.status,
      this._dateSerializer.transform(dto.createdAt),
      this._dateSerializer.transform(dto.updatedAt)
    );
  }

  // MOVE TO COMPONENT CONTROLLER
  // private _getSpecialCategoriesOpened(specialCategories: boolean): PicklistId {
  //   const picklistValue = specialCategories ? 'Yes' : 'No';
  //   let specialCategoriesOpened: PicklistId = 0;

  //   this._picklistService
  //     .findByTypeAndValue('yesno', picklistValue)
  //     .pipe(tap((picklist) => (specialCategoriesOpened = picklist.id)));

  //   return specialCategoriesOpened;
  // }
}
