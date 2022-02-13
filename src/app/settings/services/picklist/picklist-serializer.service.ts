import { Injectable } from '@angular/core';
import { PicklistItemModel } from '../../models/picklist-item.model';
import { PicklistModel } from '../../models/picklist.model';

import { PicklistItemDTO } from '../../types/picklist-item.type';
import { PicklistDTO } from '../../types/picklist.type';

@Injectable({
  providedIn: 'root',
})
export class PicklistSerializerService {
  constructor() {}

  deserialize(dto: PicklistDTO): PicklistModel {
    const picklist: PicklistItemModel[] = dto.map((dtoItem) =>
      this.getItemModel(dtoItem)
    );

    return new PicklistModel(picklist);
  }

  private getItemModel(dto: PicklistItemDTO): PicklistItemModel {
    return new PicklistItemModel(dto.id, dto.type, dto.value);
  }
}
