import { Injectable } from '@angular/core';
import { ModuleStoreService } from 'src/app/core/services/module-store.service';
import { BranchModel } from '../models/branch.model';
import { DepartmentModel } from '../models/department.model';
import { JobRoleModel } from '../models/job-role.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsStoreService extends ModuleStoreService {
  readonly PREFIX: string = 'SETTINGS';

  set departments(departments: DepartmentModel[]) {
    this.set(`${this.PREFIX}_DEPARTMENT_LIST`, departments);
  }

  get departments(): DepartmentModel[] {
    return this.get(`${this.PREFIX}_DEPARTMENT_LIST`);
  }

  set branches(branches: BranchModel[]) {
    this.set(`${this.PREFIX}_BRANCH_LIST`, branches);
  }

  get branches(): BranchModel[] {
    return this.get(`${this.PREFIX}_BRANCH_LIST`);
  }

  set jobRoles(jobRoles: JobRoleModel[]) {
    this.set(`${this.PREFIX}_JOB_ROLE_LIST`, jobRoles);
  }

  get jobRoles(): JobRoleModel[] {
    return this.get(`${this.PREFIX}_JOB_ROLE_LIST`);
  }
}
