import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, shareReplay } from 'rxjs';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';
import { PicklistType } from 'src/app/settings/types/picklist-item.type';

import { CandidateModel } from '../models/candidate.model';
import { CandidatesCollection } from '../models/candidates.collection';
import { CandidateDTO } from '../types/candidate.dto.type';
import { CandidateFormData } from '../types/candidates.types';
import { CandidateHttpService } from './candidate-http.service';
import { CandidateSerializerService } from './candidate-serializer.service';
import { CandidateStoreService } from './candidate-store.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  requiredPicklistTypes: PicklistType[] = [];

  constructor(
    private _httpService: CandidateHttpService,
    private _serializationService: CandidateSerializerService,
    private _store: CandidateStoreService,
    private _picklistService: PicklistService
  ) {}

  get store() {
    return this._store;
  }

  findAll(): Observable<CandidatesCollection> {
    const records: Observable<CandidateDTO[]> = this._httpService.findAll();

    return forkJoin([records]).pipe(
      map(([records]) => {
        const candidates = records.map((record) => {
          return this._serializationService.deserialize(record);
        });

        return new CandidatesCollection(candidates);
      }),
      shareReplay(1)
    );
  }

  findById(id: number): Observable<CandidateModel> {
    if (this._shouldCurrentCached(id)) {
      return of(this._currentCached());
    }

    const record: Observable<CandidateDTO> = this._httpService.findById(id);

    return forkJoin([record]).pipe(
      map(([record]) => {
        return this._serializationService.deserialize(record);
      }),
      shareReplay(1)
    );
  }

  save(model: CandidateModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService
      .save(dto)
      .subscribe(() => (this._store.currentCandidate = model));
  }

  update(model: CandidateModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService
      .update(dto)
      .subscribe(() => (this._store.currentCandidate = model));
  }

  loadRequiredPicklist(): Observable<PicklistModel> {
    const query = this._picklistQueryString();
    return this._picklistService.findByQuery(query);
  }

  getEntityModelFromFormData(formData: CandidateFormData): CandidateModel {
    const createdAt =
      this.store.entityState === 'update' ? formData.createdAt : new Date();
    const updatedAt = new Date();

    return new CandidateModel(
      formData.id ? formData.id : 0,
      formData.firstname,
      formData.lastname,
      formData.email,
      formData.phoneNumber,
      formData.address,
      formData.city,
      formData.state,
      formData.zipCode,
      formData.country,
      createdAt,
      updatedAt
    );
  }

  _currentCached(): CandidateModel {
    return this._store.currentCandidate;
  }

  /**
   *
   */
  _shouldCurrentCached(entity?: CandidateModel | number): boolean {
    if (!this._currentCached()) {
      return false;
    }

    if (!(this._currentCached() instanceof CandidateModel)) {
      return false;
    }

    if (entity instanceof CandidateModel) {
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
