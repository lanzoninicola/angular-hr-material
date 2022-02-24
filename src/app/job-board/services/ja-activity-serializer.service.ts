import { Injectable } from '@angular/core';
import { DateService } from 'src/app/core/services/date.service';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { JobApplicationActivityModel } from '../models/ja-activity.model';
import { JobApplicationModel } from '../models/job-application.model';
import { JobApplicationActivityDTO } from '../types/ja-activity.dto.type';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationActivitySerializerService {
  constructor(private _dateService: DateService) {}

  deserialize(
    dto: JobApplicationActivityDTO,
    relations: {
      jobApplication: JobApplicationModel;
      picklistItem: PicklistItemModel;
    }
  ): JobApplicationActivityModel {
    return new JobApplicationActivityModel(
      dto.id,
      relations.jobApplication,
      relations.picklistItem,
      dto.description,
      this._dateService.ISOToFullDate(dto.createdAt),
      this._dateService.ISOToFullDate(dto.updatedAt)
    );
  }

  serialize(model: JobApplicationActivityModel): JobApplicationActivityDTO {
    return {
      id: model.id,
      jobsapplicationsId: model.jobsapplicationsId.id,
      type: model.type.getId(),
      description: model.description,
      createdAt: this._dateService.dateToISOString(model.createdAt),
      updatedAt: this._dateService.dateToISOString(model.updatedAt),
    };
  }
}
