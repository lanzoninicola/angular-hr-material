import { Injectable } from '@angular/core';
import { DepartmentDTO, DepartmentModel } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentSerializerService {
  constructor() {}

  deserialize(dto: DepartmentDTO) {
    return new DepartmentModel(dto.id, dto.name, dto.manager, dto.teamLeads);
  }
}
