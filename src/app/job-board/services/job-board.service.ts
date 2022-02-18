import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, shareReplay } from 'rxjs';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';
import { PicklistType } from 'src/app/settings/types/picklist-item.type';
import { JobIdModel } from '../models/job-id.model';
import { JobIdDTO } from '../types/jobid.dto.type';
import { JobIdFormData } from '../types/jobid.form.type';
import { JobBoardHttpService } from './job-board-http.service';
import { JobBoardSerializerService } from './job-board-serializer.service';
import { JobBoardStoreService } from './job-board-store.service';

@Injectable({
  providedIn: 'root',
})
export class JobBoardService {
  requiredPicklistTypes: PicklistType[] = [
    'role-level',
    'job-location-type',
    'employment-status',
    'jobid-working-status',
  ];

  constructor(
    private _httpService: JobBoardHttpService,
    private _picklistService: PicklistService,
    private _serializationService: JobBoardSerializerService,
    private _store: JobBoardStoreService
  ) {}

  get store() {
    return this._store;
  }

  findAll(): Observable<JobIdModel[]> {
    const records: Observable<JobIdDTO[]> = this._httpService.findAll();
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

  findById(id: number): Observable<JobIdModel> {
    if (this._shouldCurrentCached(id)) {
      return of(this._currentCached());
    }

    const record: Observable<JobIdDTO> = this._httpService.findById(id);
    const picklist: Observable<PicklistModel> = this.loadRequiredPicklist();

    return forkJoin([record, picklist]).pipe(
      map(([record, picklist]) => {
        return this._serializationService.deserialize(record, picklist);
      }),
      shareReplay(1)
    );
  }

  save(model: JobIdModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService
      .save(dto)
      .subscribe(() => (this._store.currentJobId = model));
  }

  update(model: JobIdModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService
      .update(dto)
      .subscribe(() => (this._store.currentJobId = model));
  }

  loadRequiredPicklist(): Observable<PicklistModel> {
    const query = this._picklistQueryString();
    return this._picklistService.findByQuery(query);
  }

  getEntityModelFromFormData(formData: JobIdFormData): JobIdModel {
    const createdAt =
      this.store.entityState === 'update' ? formData.createdAt : new Date();
    const updatedAt = new Date();

    return new JobIdModel(
      formData.id,
      formData.requestToHire,
      formData.boardTemplate,
      formData.title,
      formData.jobRole,
      formData.roleLevel,
      formData.roleTaskDescription,
      formData.jobLocationType,
      formData.jobLocation,
      formData.employmentStatus,
      formData.minimumQualifications,
      formData.preferredQualifications,
      formData.benefits,
      formData.specialCategoriesOpened,
      formData.status,
      createdAt,
      updatedAt
    );
  }

  _currentCached(): JobIdModel {
    return this._store.currentJobId;
  }

  /**
   *
   */
  _shouldCurrentCached(entity?: JobIdModel | number): boolean {
    if (!this._currentCached()) {
      return false;
    }

    if (!(this._currentCached() instanceof JobIdModel)) {
      return false;
    }

    if (entity instanceof JobIdModel) {
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
