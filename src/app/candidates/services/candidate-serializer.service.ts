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
      dto.phoneNumber,
      dto.address,
      dto.city,
      dto.state,
      dto.zipCode,
      dto.country,
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
      phoneNumber: model.getPhoneNumber(),
      address: model.getAddress(),
      city: model.getCity(),
      state: model.getState(),
      zipCode: model.getZipCode(),
      country: model.getCountry(),
      createdAt: this._dateService.dateToISOString(model.createdAt),
      updatedAt: this._dateService.dateToISOString(model.updatedAt),
    };
  }
}
