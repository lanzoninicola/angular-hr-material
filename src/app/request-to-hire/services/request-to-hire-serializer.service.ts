import { Injectable } from '@angular/core';
import { DateSerializerService } from 'src/app/core/services/date-serializer.service';
import { BranchModel } from 'src/app/settings/models/branch.model';
import { DepartmentModel } from 'src/app/settings/models/department.model';
import { JobRoleModel } from 'src/app/settings/models/job-role.model';
import { BranchDTO } from 'src/app/settings/types/branch.type';
import { DepartmentDTO } from 'src/app/settings/types/department.type';
import { JobRoleDTO } from 'src/app/settings/types/job-role.type';
import { UserModel } from 'src/app/users/models/user.model';
import { UserDTO } from 'src/app/users/types/user.type';
import {
  RequestToHireDTO,
  RequestToHireHttpSerialized,
} from '../types/request-to-hire.type';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireSerializerService {
  constructor(private _dateSerializer: DateSerializerService) {}

  deserialize(data: RequestToHireDTO): RequestToHireHttpSerialized {
    return {
      ...data,
      department: this._getDepartmentModel(data.department),
      requester: this._getUserModel(data.requester),
      jobRole: this._getJobRoleModel(data.jobRole),
      jobLocation: this._getBranchModel(data.jobLocation),
      createdAt: this._dateSerializer.transform(data.createdAt),
      updatedAt: this._dateSerializer.transform(data.updatedAt),
    };
  }

  private _getDepartmentModel(department: DepartmentDTO) {
    return new DepartmentModel(department.id, department.name);
  }

  private _getUserModel(requester: UserDTO) {
    return new UserModel(
      requester.id,
      requester.firstname,
      requester.lastname,
      requester.email,
      requester.recruitingRole,
      requester.department,
      requester.companyRoleLevel,
      requester.isAdmin
    );
  }

  private _getJobRoleModel(role: JobRoleDTO) {
    return new JobRoleModel(role.id, role.name);
  }

  private _getBranchModel(location: BranchDTO | null) {
    return location
      ? new BranchModel(
          location.id,
          location.name,
          location.street,
          location.city,
          location.country,
          location.timezone
        )
      : null;
  }
}
