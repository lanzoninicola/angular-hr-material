import { Injectable } from '@angular/core';
import { JobRoleModel } from '../../models/job-role.model';
import { JobRoleDTO } from '../../types/job-role.type';

@Injectable({
  providedIn: 'root',
})
export class JobRoleSerializerService {
  constructor() {}

  deserialize(dto: JobRoleDTO) {
    return new JobRoleModel(
      dto.id,
      dto.name,
      dto.roleAbout,
      dto.responsibilities
    );
  }
}
