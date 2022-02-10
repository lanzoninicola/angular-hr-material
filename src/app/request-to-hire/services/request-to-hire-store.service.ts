import { Injectable } from '@angular/core';
import { ModuleStoreService } from 'src/app/core/services/module-store.service';
import { EntityState } from 'src/app/core/types/entityState.type';
import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { BranchModel } from 'src/app/settings/models/branch.model';
import { DepartmentModel } from 'src/app/settings/models/department.model';
import { RequestToHireModel } from '../models/request-to-hire.model';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireStoreService extends ModuleStoreService {
  readonly PREFIX: string = 'RTH_';
  readonly DEPARTMENTS_LIST_FORM_CONTROL: string = `${this.PREFIX}_DEPARTMENTS_LIST_FORM_CONTROL`;
  readonly BRANCHES_LIST_FORM_CONTROL: string = `${this.PREFIX}_BRANCHES_LIST_FORM_CONTROL`;

  set entities(entities: RequestToHireModel[]) {
    this.set(`${this.PREFIX}_LIST`, entities);
  }

  get entities(): RequestToHireModel[] {
    return this.get(`${this.PREFIX}_LIST`);
  }

  set currentEntity(currentEntity: RequestToHireModel) {
    this.set(`${this.PREFIX}_CURRENT_REQUEST`, currentEntity);
  }

  get currentEntity(): RequestToHireModel {
    return this.get(`${this.PREFIX}_CURRENT_REQUEST`);
  }

  get entityState(): EntityState {
    return this.get(`${this.PREFIX}_ENTITY_STATE`);
  }

  entityStateUpdate() {
    this.set(`${this.PREFIX}_ENTITY_STATE`, 'update');
  }

  entityStateCreate() {
    this.set(`${this.PREFIX}_ENTITY_STATE`, 'create');
  }

  setDepartmentsFormControl(departmentsName: SelectOptionConfig[]) {
    this.set(this.DEPARTMENTS_LIST_FORM_CONTROL, departmentsName);
  }

  getDepartmentsFormControl(): SelectOptionConfig[] {
    return this.get(this.DEPARTMENTS_LIST_FORM_CONTROL);
  }

  setBranchesFormControl(branchesName: SelectOptionConfig[]) {
    this.set(this.BRANCHES_LIST_FORM_CONTROL, branchesName);
  }

  getBranchesFormControl(): SelectOptionConfig[] {
    return this.get(this.BRANCHES_LIST_FORM_CONTROL);
  }
}
