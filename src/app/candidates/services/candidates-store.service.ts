import { Injectable } from '@angular/core';
import { ModuleStoreService } from 'src/app/core/services/module-store.service';

@Injectable({
  providedIn: 'root',
})
export class CandidatesStoreService extends ModuleStoreService {
  entityStateUpdate() {
    this.set('candidateEdit-entityState', 'update');
  }

  entityStateCreate() {
    this.set('candidateEdit-entityState', 'create');
  }

  // TODO: miss the interface
  set currentEntity(currentCandidate: any) {
    this.set('candidateEdit-currentCandidate', currentCandidate);
  }

  get currentEntity() {
    return this.get('candidateEdit-currentCandidate');
  }
}
