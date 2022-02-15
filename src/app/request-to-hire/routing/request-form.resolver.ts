import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, map, Observable, shareReplay } from 'rxjs';
import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { BranchService } from 'src/app/settings/services/branch/branch.service';
import { DepartmentService } from 'src/app/settings/services/department/department.service';
import { JobRoleService } from 'src/app/settings/services/job-role/job-role.service';
import { PicklistType } from 'src/app/settings/types/picklist-item.type';

import { RequestToHireService } from '../services/request-to-hire.service';
import { RequestToHireFormControlsData } from '../types/request-to-hire.form.type';

@Injectable({
  providedIn: 'root',
})
export class RequestFormResolver
  implements Resolve<RequestToHireFormControlsData>
{
  constructor(
    private _dataService: RequestToHireService,
    private _departmentService: DepartmentService,
    private _branchService: BranchService,
    private _jobRoleService: JobRoleService
  ) {}

  resolve(): Observable<RequestToHireFormControlsData> {
    const departments = this._departmentService.findAll();
    const branches = this._branchService.findAll();
    const jobRoles = this._jobRoleService.findAll();
    const picklist: Observable<PicklistModel> =
      this._dataService.loadRequiredPicklist();

    return forkJoin([picklist, departments, branches, jobRoles]).pipe(
      map(([picklist, departments, branches, jobRoles]) => {
        const departmentsSelectOptions: SelectOptionConfig[] =
          this._getSelectOptionsFromModel(departments);
        const branchesSelectOptions: SelectOptionConfig[] =
          this._getSelectOptionsFromModel(branches);
        const jobRolesSelectOptions: SelectOptionConfig[] =
          this._getSelectOptionsFromModel(jobRoles);

        return {
          picklist: {
            workingStatus: this._getSelectOptionsFromPicklist(
              picklist,
              'rth-working-status'
            ),
            businessUnit: this._getSelectOptionsFromPicklist(
              picklist,
              'business-unit'
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
          departments: departmentsSelectOptions,
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
        value: model.getId(),
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
        value: item.getId(),
        textContext: item.getValue(),
      };
    });
  }
}
