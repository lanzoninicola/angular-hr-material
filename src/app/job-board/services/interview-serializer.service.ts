import { Injectable } from '@angular/core';
import { DateService } from 'src/app/core/services/date.service';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { InterviewModel } from '../models/interview.model';
import { JobApplicationModel } from '../models/job-application.model';
import { InterviewDTO } from '../types/interview.dto.type';

@Injectable({
  providedIn: 'root',
})
export class InterviewSerializerService {
  constructor(private _dateService: DateService) {}

  deserialize(
    dto: InterviewDTO,
    relations: {
      jobApplication: JobApplicationModel;
      picklistItem: PicklistItemModel;
    }
  ): InterviewModel {
    return new InterviewModel(
      dto.id,
      relations.jobApplication,
      relations.picklistItem,
      this._dateService.ISOToFullDate(dto.createdAt),
      this._dateService.ISOToFullDate(dto.updatedAt)
    );
  }

  serialize(model: InterviewModel): InterviewDTO {
    return {
      id: model.id,
      jobsapplicationsId: model.getJobApplication().id,
      stage: model.getStage().id,
      createdAt: this._dateService.dateToISOString(model.getCreatedAt()),
      updatedAt: this._dateService.dateToISOString(model.getUpdatedAt()),
    };
  }
}
