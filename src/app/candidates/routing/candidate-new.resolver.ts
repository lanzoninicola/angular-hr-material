import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CandidateStoreService } from '../services/candidate-store.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateNewResolver implements Resolve<boolean> {
  constructor(private _store: CandidateStoreService) {}

  resolve(): Observable<boolean> {
    this._store.entityStateCreate();

    return of(true);
  }
}
