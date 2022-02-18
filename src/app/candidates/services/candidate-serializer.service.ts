import { Injectable } from '@angular/core';
import { DateService } from 'src/app/core/services/date.service';
import { CandidateModel } from '../models/candidate.model';
import { CandidateDTO } from '../types/candidate.dto.type';

@Injectable({
  providedIn: 'root',
})
export class CandidateSerializerService {
  constructor(private _dateService: DateService) {}

  deserialize(dto: CandidateDTO): CandidateModel {
    return new CandidateModel(
      dto.id,
      dto.firstname,
      dto.lastname,
      dto.email,
      this._dateService.ISOToFullDate(dto.createdAt),
      this._dateService.ISOToFullDate(dto.updatedAt)
    );
  }

  serialize(model: CandidateModel): CandidateDTO {
    return {
      id: model.getId(),
      firstname: model.getFirstname(),
      lastname: model.getLastname(),
      email: model.getEmail(),
      createdAt: this._dateService.dateToISOString(model.createdAt),
      updatedAt: this._dateService.dateToISOString(model.updatedAt),
    };
  }
}
