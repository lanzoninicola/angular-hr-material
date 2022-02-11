import { Injectable } from '@angular/core';
import { BranchDTO, BranchModel } from '../models/branch.model';

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
}
