import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, shareReplay } from 'rxjs';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { PicklistHttpService } from 'src/app/settings/services/picklist/picklist-http.service';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';
import { PicklistType } from 'src/app/settings/types/picklist-item.type';

import { RequestToHireModel } from '../models/request-to-hire.model';
import { RequestToHireDTO } from '../types/request-to-hire.dto.type';
import { RequestToHireHttpService } from './request-to-hire-http.service';
import { RequestToHireSerializerService } from './request-to-hire-serializer.service';
import { RequestToHireStoreService } from './request-to-hire-store.service';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireService {
  // http://localhost:3000/picklist?type=business-unit&type=role-level&type=job-location-type&type=employment-status&type=yesno&type=rth-working-status

  requiredPicklistTypes: PicklistType[] = [
    'business-unit',
    'role-level',
    'job-location-type',
    'employment-status',
    'yesno',
    'rth-working-status',
  ];

  constructor(
    private _httpService: RequestToHireHttpService,
    private _picklistService: PicklistService,
    private _serializationService: RequestToHireSerializerService,
    private _store: RequestToHireStoreService
  ) {}

  get store() {
    return this._store;
  }

  findAll(): Observable<RequestToHireModel[]> {
    const records: Observable<RequestToHireDTO[]> = this._httpService.findAll();
    const picklist: Observable<PicklistModel> = this.loadRequiredPicklist();

    return forkJoin([records, picklist]).pipe(
      map(([records, picklist]) => {
        return records.map((record) => {
          return this._serializationService.deserialize(record, picklist);
        });
      }),
      shareReplay(1)
    );
  }

  findById(id: number): Observable<RequestToHireModel> {
    const record: Observable<RequestToHireDTO> = this._httpService.findById(id);
    const picklist: Observable<PicklistModel> = this.loadRequiredPicklist();

    return forkJoin([record, picklist]).pipe(
      map(([record, picklist]) => {
        return this._serializationService.deserialize(record, picklist);
      }),
      shareReplay(1)
    );
  }

  save() {}

  update() {}

  loadRequiredPicklist(): Observable<PicklistModel> {
    const query = this._picklistQueryString();
    return this._picklistService.findByQuery(query);
  }

  /**
   * @description
   * Returns a string of the query parameters for the picklist service
   */
  private _picklistQueryString() {
    let fullUrlQuery = '';

    this.requiredPicklistTypes.forEach((picklistType) => {
      fullUrlQuery = fullUrlQuery + `&type=${picklistType}`;
    });

    return fullUrlQuery;
  }

  // save(requestToHireData: any) {
  //   //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
  //   return this.http
  //     .post<any>(
  //       `${environment.API}/request-to-hire`,
  //       requestToHireData,
  //       this._httpOptions.isFormSubmission()
  //     )
  //     .subscribe((newRequest) => {
  //       this._store.currentEntity = newRequest;
  //     });
  // }

  // update(requestToHireData: any) {
  //   const { id } = requestToHireData;

  //   this.http
  //     .patch<any>(
  //       `${environment.API}/request-to-hire/${id}`,
  //       requestToHireData,
  //       this._httpOptions.isFormSubmission()
  //     )
  //     .subscribe((updatedRequest) => {
  //       this._store.currentEntity = updatedRequest;
  //     });
  // }
}
