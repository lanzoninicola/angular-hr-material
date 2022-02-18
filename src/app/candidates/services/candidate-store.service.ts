import { Injectable } from '@angular/core';
import { ModuleStoreService } from 'src/app/core/services/module-store.service';
import { EntityState } from 'src/app/core/types/entityState.type';
import { CandidateModel } from '../models/candidate.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateStoreService extends ModuleStoreService {
  readonly PREFIX: string = 'CANDIDATES';

  set entities(entities: CandidateModel[]) {
    this.set(`${this.PREFIX}_LIST`, entities);
  }

  get entities(): CandidateModel[] {
    return this.get(`${this.PREFIX}_LIST`);
  }

  set currentCandidate(currentCandidate: CandidateModel) {
    this.set(`${this.PREFIX}_CURRENT_CANDIDATE`, currentCandidate);
  }

  get currentCandidate(): CandidateModel {
    return this.get(`${this.PREFIX}_CURRENT_CANDIDATE`);
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
