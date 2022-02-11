import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequestToHireModel } from '../models/request-to-hire.model';
import { RequestToHireDTO } from '../types/request-to-hire.type';
import { RequestToHireHttpService } from './request-to-hire-http.service';
import { RequestToHireSerializerService } from './request-to-hire-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireFacadeService {
  constructor(
    private _httpService: RequestToHireHttpService,
    private _serializationService: RequestToHireSerializerService
  ) {}

  findAll(): Observable<RequestToHireModel[]> {
    const dtos = this._httpService.findAll();

    return dtos.pipe(
      map<RequestToHireDTO[], RequestToHireModel[]>((dtos) => {
        return dtos.map((dto) => this._serializationService.deserialize(dto));
      })
    );
  }

  findById(id: number): Observable<RequestToHireModel> {
    const dto = this._httpService.findById(id);

    return dto.pipe(
      map<RequestToHireDTO, RequestToHireModel>((dto) =>
        this._serializationService.deserialize(dto)
      )
    );
  }
}
