import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { JobRoleQuestionModel } from '../../models/job-role-question.model';
import { JobRoleModel } from '../../models/job-role.model';
import { PicklistItemModel } from '../../models/picklist-item.model';
import { JobRoleQuestionsHttpService } from './job-role-questions-http.service';
import { JobRoleQuestionsSerializerService } from './job-role-questions-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class JobRoleQuestionsService {
  constructor(
    private _httpService: JobRoleQuestionsHttpService,
    private _serializer: JobRoleQuestionsSerializerService
  ) {}

  findByJobRoleAndLevel(
    jobRole: JobRoleModel,
    roleLevel: PicklistItemModel
  ): Observable<JobRoleQuestionModel[]> {
    return this._httpService
      .findByParams({
        jobrolesId: String(jobRole.getId()),
        roleLevel: String(roleLevel.getId()),
      })
      .pipe(
        map((dtoArray) =>
          dtoArray.map((dto) =>
            this._serializer.deserialize(dto, {
              jobRole,
              roleLevel,
            })
          )
        )
      );
  }
}
