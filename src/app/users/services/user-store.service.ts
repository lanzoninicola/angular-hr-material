import { Injectable } from '@angular/core';
import { ModuleStoreService } from 'src/app/core/services/module-store.service';
import { EntityState } from 'src/app/core/types/entityState.type';

import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersStoreService extends ModuleStoreService {
  readonly PREFIX: string = 'USERS';

  set entities(entities: UserModel[]) {
    this.set(`${this.PREFIX}_LIST`, entities);
  }

  get entities(): UserModel[] {
    return this.get(`${this.PREFIX}_LIST`);
  }

  set currentEntity(currentEntity: UserModel) {
    this.set(`${this.PREFIX}_CURRENT_USER`, currentEntity);
  }

  get currentEntity(): UserModel {
    return this.get(`${this.PREFIX}_CURRENT_USER`);
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
}
