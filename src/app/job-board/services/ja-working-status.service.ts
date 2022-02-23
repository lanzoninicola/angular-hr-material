import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';

import { JobApplicationWorkingStatusCollection } from '../models/ja-working-status.collection';
import { JobApplicationWorkingStatusModel } from '../models/ja-working-status.model';
import { JobApplicationWorkingStatusDTO } from '../types/ja-working-status.dto.types';
import { JobApplicationWorkingStatusHttpService } from './ja-working-status-http.service';
import { JobApplicationWorkingStatusSerializerService } from './ja-working-status-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationWorkingStatusService {
  constructor(
    private _httpService: JobApplicationWorkingStatusHttpService,
    private _picklistService: PicklistService,
    private _serializationService: JobApplicationWorkingStatusSerializerService
  ) {}

  findAll(): Observable<JobApplicationWorkingStatusCollection> {
    const records$: Observable<JobApplicationWorkingStatusDTO[]> =
      this._httpService.findAll();

    const picklist$: Observable<PicklistModel> =
      this._picklistService.findByType('jobapplication-working-status');

    return forkJoin([records$, picklist$]).pipe(
      map(([records, picklist]) => {
        const workingStatus = records.map((record) => {
          const picklistItem = picklist.findItemById(record.picklistsId);

          return this._serializationService.deserialize(record, {
            picklistItem,
          });
        });

        return new JobApplicationWorkingStatusCollection(workingStatus);
      })
    );
  }

  findById(id: number): Observable<JobApplicationWorkingStatusModel> {
    // if (this._shouldCurrentCached(id)) {
    //   return of(this._currentCached());
    // }

    const record$: Observable<JobApplicationWorkingStatusDTO> =
      this._httpService.findById(id);

    const picklist$: Observable<PicklistItemModel> = record$.pipe(
      switchMap((record) => {
        return this._picklistService.findById(record.picklistsId);
      })
    );

    return forkJoin([record$, picklist$]).pipe(
      map(([record, picklistItem]) => {
        return this._serializationService.deserialize(record, {
          picklistItem,
        });
      })
    );
  }

  save(model: JobApplicationWorkingStatusModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.save(dto).subscribe();
  }

  update(model: JobApplicationWorkingStatusModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.update(dto).subscribe();
  }
}
