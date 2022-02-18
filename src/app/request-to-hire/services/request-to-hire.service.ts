import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, shareReplay } from 'rxjs';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';
import { PicklistType } from 'src/app/settings/types/picklist-item.type';

import { RequestToHireModel } from '../models/request-to-hire.model';
import { RequestToHireDTO } from '../types/request-to-hire.dto.type';
import { RequestToHireFormData } from '../types/request-to-hire.form.type';
import { RequestToHireHttpService } from './request-to-hire-http.service';
import { RequestToHireSerializerService } from './request-to-hire-serializer.service';
import { RequestToHireStoreService } from './request-to-hire-store.service';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireService {
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
    if (this._shouldCurrentCached(id)) {
      return of(this._currentCached());
    }

    const record: Observable<RequestToHireDTO> = this._httpService.findById(id);
    const picklist: Observable<PicklistModel> = this.loadRequiredPicklist();

    return forkJoin([record, picklist]).pipe(
      map(([record, picklist]) => {
        return this._serializationService.deserialize(record, picklist);
      }),
      shareReplay(1)
    );
  }

  save(model: RequestToHireModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService
      .save(dto)
      .subscribe(() => (this._store.currentRequest = model));
  }

  update(model: RequestToHireModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService
      .update(dto)
      .subscribe(() => (this._store.currentRequest = model));
  }

  loadRequiredPicklist(): Observable<PicklistModel> {
    const query = this._picklistQueryString();
    return this._picklistService.findByQuery(query);
  }

  getEntityModelFromFormData(
    formData: RequestToHireFormData
  ): RequestToHireModel {
    const createdAt =
      this.store.entityState === 'update' ? formData.createdAt : new Date();
    const updatedAt = new Date();

    return new RequestToHireModel(
      formData.id,
      formData.title,
      formData.department,
      formData.businessUnit,
      formData.requester,
      formData.jobRole,
      formData.roleTaskDescription,
      formData.roleLevel,
      formData.highPriority,
      formData.jobLocationType,
      formData.jobLocation,
      formData.employmentStatus,
      formData.minimumQualifications,
      formData.preferredQualifications,
      formData.benefits,
      formData.budget,
      formData.specialCategoriesOpened,
      formData.additionalNotes,
      formData.status,
      createdAt,
      updatedAt
    );
  }

  _currentCached(): RequestToHireModel {
    return this._store.currentRequest;
  }

  /**
   *
   */
  _shouldCurrentCached(entity?: RequestToHireModel | number): boolean {
    if (!this._currentCached()) {
      return false;
    }

    if (!(this._currentCached() instanceof RequestToHireModel)) {
      return false;
    }

    if (entity instanceof RequestToHireModel) {
      return entity.getId() === this._currentCached().getId();
    }

    if (Number.isInteger(entity)) {
      return entity === this._currentCached().getId();
    }

    return false;
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
}
