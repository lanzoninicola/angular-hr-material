import { Injectable } from '@angular/core';
import { ModuleStoreService } from 'src/app/core/services/module-store.service';
import { EntityState } from 'src/app/core/types/entityState.type';

import { RequestToHireModel } from '../models/request-to-hire.model';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireStoreService extends ModuleStoreService {
  readonly PREFIX: string = 'RTH';

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
