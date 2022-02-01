import { Injectable } from '@angular/core';
import { ModuleStoreService } from 'src/app/core/services/module-store.service';
import { UserModel } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UsersStoreService extends ModuleStoreService {
  entityStateUpdate() {
    this.set('userEdit-entityState', 'update');
  }

  entityStateCreate() {
    this.set('userEdit-entityState', 'create');
  }

  set currentEntity(currentUser: UserModel) {
    this.set('userEdit-currentUser', currentUser);
  }

  get currentEntity() {
    return this.get('userEdit-currentUser');
  }
}
