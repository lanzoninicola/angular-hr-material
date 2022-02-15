import { Injectable } from '@angular/core';
import { BranchModel } from '../../models/branch.model';
import { BranchDTO } from '../../types/branch.type';

@Injectable({
  providedIn: 'root',
})
export class BranchSerializerService {
  constructor() {}

  deserialize(dto: BranchDTO) {
    return new BranchModel(
      dto.id,
      dto.name,
      dto.street,
      dto.city,
      dto.country,
      dto.timezone
    );
  }

  serialize(model: BranchModel): BranchDTO {
    return {
      id: model.getId(),
      name: model.getName(),
      street: model.getStreet(),
      city: model.getCity(),
      country: model.getCountry(),
      timezone: model.getTimezone(),
    };
  }
}
