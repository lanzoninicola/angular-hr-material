import { Injectable } from '@angular/core';
import { JobRoleDTO, JobRoleModel } from '../models/job-role.model';

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
