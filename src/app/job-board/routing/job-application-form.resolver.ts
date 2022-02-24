import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';
import { JobApplicationWorkingStatusModel } from '../models/ja-working-status.model';

import { JobApplicationWorkingStatusService } from '../services/ja-working-status.service';
import { JobApplicationFormControlsData } from '../types/job-application.form.type';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationFormResolver
  implements Resolve<JobApplicationFormControlsData>
{
  constructor(
    private _jaWorkingStatusService: JobApplicationWorkingStatusService,
    private _picklistService: PicklistService
  ) {}

  resolve(): Observable<JobApplicationFormControlsData> {
    const workingStatusCollection$ = this._jaWorkingStatusService.findAll();
    const activityTypes$ = this._picklistService.findByType(
      'jobapplication-activity-type'
    );

    return forkJoin([workingStatusCollection$, activityTypes$]).pipe(
      map(([workingStatusCollection, activityTypes]) => {
        const workingStatusesOptions = workingStatusCollection
          .getItems()
          .map((item: JobApplicationWorkingStatusModel) => {
            return {
              value: item,
              textContext: item.getStatusValue(),
            };
          });

        const activityTypesOptions = activityTypes
          .getItems()
          .map((item: PicklistItemModel) => {
            return {
              value: item,
              textContext: item.getValue(),
            };
          });

        return {
          workingStatus: workingStatusesOptions,
          activityTypes: activityTypesOptions,
        };
      })
    );
  }
}
