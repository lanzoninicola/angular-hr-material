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
}
