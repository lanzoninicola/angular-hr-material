import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, map, Observable, shareReplay } from 'rxjs';
import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { BranchService } from 'src/app/settings/services/branch/branch.service';
import { JobRoleService } from 'src/app/settings/services/job-role/job-role.service';
import { PicklistType } from 'src/app/settings/types/picklist-item.type';

import { JobBoardService } from '../services/job-board.service';
import { JobIdFormControlsData } from '../types/jobid.form.type';

@Injectable({
  providedIn: 'root',
})
export class JobidFormResolver implements Resolve<JobIdFormControlsData> {
  constructor(
    private _dataService: JobBoardService,
    private _branchService: BranchService,
    private _jobRoleService: JobRoleService
  ) {}

  resolve(): Observable<JobIdFormControlsData> {
    const branches = this._branchService.findAll();
    const jobRoles = this._jobRoleService.findAll();
    const picklist: Observable<PicklistModel> =
      this._dataService.loadRequiredPicklist();

    return forkJoin([picklist, branches, jobRoles]).pipe(
      map(([picklist, branches, jobRoles]) => {
        const branchesSelectOptions: SelectOptionConfig[] =
          this._getSelectOptionsFromModel(branches);
        const jobRolesSelectOptions: SelectOptionConfig[] =
          this._getSelectOptionsFromModel(jobRoles);

        return {
          picklist: {
            workingStatus: this._getSelectOptionsFromPicklist(
              picklist,
              'jobid-working-status'
            ),
            employmentStatus: this._getSelectOptionsFromPicklist(
              picklist,
              'employment-status'
            ),
            roleLevel: this._getSelectOptionsFromPicklist(
              picklist,
              'role-level'
            ),
            jobLocationType: this._getSelectOptionsFromPicklist(
              picklist,
              'job-location-type'
            ),
          },
          branches: branchesSelectOptions,
          jobRoles: jobRolesSelectOptions,
        };
      }),
      shareReplay(1)
    );
  }

  private _getSelectOptionsFromModel(models: any[]): SelectOptionConfig[] {
    return models.map((model: any) => {
      return {
        value: model,
        textContext: model.getName(),
      };
    });
  }

  private _getSelectOptionsFromPicklist(
    model: PicklistModel,
    type: PicklistType
  ) {
    return model.findItemByType(type).map((item) => {
      return {
        value: item,
        textContext: item.getValue(),
      };
    });
  }
}
