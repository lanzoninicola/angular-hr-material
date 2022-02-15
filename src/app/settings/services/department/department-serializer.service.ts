import { Injectable } from '@angular/core';
import { DepartmentModel } from '../../models/department.model';
import { DepartmentDTO } from '../../types/department.type';

@Injectable({
  providedIn: 'root',
})
export class DepartmentSerializerService {
  constructor() {}

  deserialize(dto: DepartmentDTO) {
    return new DepartmentModel(dto.id, dto.name, dto.manager, dto.teamLeads);
  }

  serialize(model: DepartmentModel): DepartmentDTO {
    return {
      id: model.getId(),
      name: model.getName(),
      manager: model.getManager(),
      teamLeads: model.getTeamLeads(),
    };
  }
}
