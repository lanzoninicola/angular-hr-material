import { Injectable } from '@angular/core';
import { DateService } from 'src/app/core/services/date.service';

import { InterviewRoundModel } from '../models/interview-round.model';
import { InterviewModel } from '../models/interview.model';
import { InterviewRoundDTO } from '../types/interview-round.dto.type';

@Injectable({
  providedIn: 'root',
})
export class InterviewRoundSerializerService {
  constructor(private _dateService: DateService) {}

  deserialize(
    dto: InterviewRoundDTO,
    relations: {
      interview: InterviewModel;
    }
  ): InterviewRoundModel {
    return new InterviewRoundModel(
      dto.id,
      relations.interview,
      dto.name,
      dto.score,
      dto.passed,
      this._dateService.ISOToFullDate(dto.scheduledAt),
      this._dateService.ISOToFullDate(dto.createdAt),
      this._dateService.ISOToFullDate(dto.updatedAt)
    );
  }

  serialize(model: InterviewRoundModel): InterviewRoundDTO {
    return {
      id: model.id,
      interviewsId: model.interview.getId(),
      name: model.name,
      score: model.score,
      passed: model.passed,
      scheduledAt: this._dateService.dateToISOString(model.scheduledAt),
      createdAt: this._dateService.dateToISOString(model.createdAt),
      updatedAt: this._dateService.dateToISOString(model.updatedAt),
    };
  }
}
