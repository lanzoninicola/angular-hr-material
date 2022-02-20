import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PicklistItemModel } from '../../models/picklist-item.model';
import { PicklistModel } from '../../models/picklist.model';
import { PicklistItemDTO } from '../../types/picklist-item.type';
import { PicklistDTO } from '../../types/picklist.type';

import { PicklistHttpService } from './picklist-http.service';
import { PicklistSerializerService } from './picklist-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class PicklistService {
  EMPTY_PICKLIST_ITEM: PicklistItemModel = new PicklistItemModel(
    0,
    '',
    '',
    '',
    0
  );
  EMPTY_PICKLIST: PicklistModel = new PicklistModel([]);

  constructor(
    private _http: PicklistHttpService,
    private _serializer: PicklistSerializerService
  ) {}

  findById(id: number): Observable<PicklistItemModel> {
    return this._http
      .findById(id)
      .pipe(
        map<PicklistItemDTO, PicklistItemModel>((dto) =>
          this._serializer.deserializeItem(dto)
        )
      );
  }

  findByType(type: string): Observable<PicklistModel> {
    return this._http
      .findByType(type)
      .pipe(
        map<PicklistDTO, PicklistModel>((dto) =>
          this._serializer.deserialize(dto)
        )
      );
  }

  findByTypeAndValue(type: string, value: string): Observable<PicklistModel> {
    return this._http
      .findByTypeAndValue(type, value)
      .pipe(
        map<PicklistDTO, PicklistModel>((dto) =>
          this._serializer.deserialize(dto)
        )
      );
  }

  /**
   * @description Returns multiple picklist items by type
   *
   * The query is the URL query string supported by the API
   * to get multiple picklist items
   *
   */
  findByQuery(query: string): Observable<PicklistModel> {
    return this._http
      .findByQuery(query)
      .pipe(
        map<PicklistDTO, PicklistModel>((dto) =>
          this._serializer.deserialize(dto)
        )
      );
  }
}
