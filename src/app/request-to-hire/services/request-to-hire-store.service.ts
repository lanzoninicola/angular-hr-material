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
  readonly JOB_ROLES_LIST_FORM_CONTROL: string = `${this.PREFIX}_JOB_ROLES_LIST_FORM_CONTROL`;

  set entities(entities: RequestToHireModel[]) {
    this.set(`${this.PREFIX}_LIST`, entities);
  }

  get entities(): RequestToHireModel[] {
    return this.get(`${this.PREFIX}_LIST`);
  }

  set currentRequest(currentEntity: RequestToHireModel) {
    this.set(`${this.PREFIX}_CURRENT_REQUEST`, currentEntity);
  }

  get currentRequest(): RequestToHireModel {
    return this.get(`${this.PREFIX}_CURRENT_REQUEST`);
  }

  currentRequestReset() {
    this.reset(`${this.PREFIX}_CURRENT_REQUEST`);
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

  entityStateReset() {
    this.reset(`${this.PREFIX}_ENTITY_STATE`);
  }
}
