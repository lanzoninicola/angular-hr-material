import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PicklistModel } from '../../models/picklist.model';
import { PicklistDTO } from '../../types/picklist.type';

import { PicklistHttpService } from './picklist-http.service';
import { PicklistSerializerService } from './picklist-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class PicklistService {
  constructor(
    private _http: PicklistHttpService,
    private _serializer: PicklistSerializerService
  ) {}

  findByType(type: string): Observable<PicklistModel> {
    const dto = this._http.findByType(type);

    return dto.pipe(
      map<PicklistDTO, PicklistModel>((dto) =>
        this._serializer.deserialize(dto)
      )
    );
  }

  findByTypeAndValue(type: string, value: string): Observable<PicklistModel> {
    const dto = this._http.findByTypeAndValue(type, value);

    return dto.pipe(
      map<PicklistDTO, PicklistModel>((dto) =>
        this._serializer.deserialize(dto)
      )
    );
  }
}
