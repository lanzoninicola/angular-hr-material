import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserDTO } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserSerializerService {
  constructor() {}

  deserialize(dto: UserDTO) {
    return new UserModel(
      dto.id,
      dto.firstname,
      dto.lastname,
      dto.email,
      dto.recruitingRole,
      dto.department,
      dto.companyRoleLevel,
      dto.isAdmin
    );
  }

  serialize(model: UserModel): UserDTO {
    return {
      id: model.getId(),
      firstname: model.getFirstname(),
      lastname: model.getLastname(),
      email: model.getEmail(),
      recruitingRole: model.getRecruitingRole(),
      department: model.getDepartment(),
      companyRoleLevel: model.getCompanyRoleLevel(),
      isAdmin: model.getIsAdmin(),
    };
  }
}
