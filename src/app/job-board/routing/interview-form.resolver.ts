import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';

import { InterviewFormControlsData } from '../types/interview.form.type';

@Injectable({
  providedIn: 'root',
})
export class InterviewFormResolver
  implements Resolve<InterviewFormControlsData>
{
  constructor(private _picklistService: PicklistService) {}

  resolve(): Observable<InterviewFormControlsData> {
    const stages$ = this._picklistService.findByType('interview-stage');

    return forkJoin([stages$]).pipe(
      map(([stages]) => {
        const interviewStagesOptions = stages
          .getItems()
          .map((item: PicklistItemModel) => {
            return {
              value: item,
              textContext: item.getValue(),
            };
          });

        return {
          interviewStages: interviewStagesOptions,
        };
      })
    );
  }
}
