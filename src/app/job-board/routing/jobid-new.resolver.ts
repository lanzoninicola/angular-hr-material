import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { JobBoardStoreService } from '../services/job-board-store.service';

@Injectable({
  providedIn: 'root',
})
export class JobidNewResolver implements Resolve<boolean> {
  constructor(private _store: JobBoardStoreService) {}

  resolve(): Observable<boolean> {
    this._store.entityStateCreate();

    return of(true);
  }
}
