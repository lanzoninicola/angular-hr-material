import { Injectable } from '@angular/core';
import { DateService } from 'src/app/core/services/date.service';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { JobApplicationWorkingStatusModel } from '../models/ja-working-status.model';
import { JobApplicationWorkingStatusDTO } from '../types/ja-working-status.dto.types';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationWorkingStatusSerializerService {
  constructor(private _dateService: DateService) {}

  deserialize(
    dto: JobApplicationWorkingStatusDTO,
    relations: {
      picklistItem: PicklistItemModel;
    }
  ): JobApplicationWorkingStatusModel {
    return new JobApplicationWorkingStatusModel(
      dto.id,
      relations.picklistItem,
      dto.description,
      dto.order,
      this._dateService.ISOToFullDate(dto.createdAt),
      this._dateService.ISOToFullDate(dto.updatedAt)
    );
  }

  serialize(
    model: JobApplicationWorkingStatusModel
  ): JobApplicationWorkingStatusDTO {
    return {
      id: model.id,
      picklistsId: model.status.getId(),
      description: model.description,
      order: model.order,
      createdAt: this._dateService.dateToISOString(model.createdAt),
      updatedAt: this._dateService.dateToISOString(model.updatedAt),
    };
  }
}
