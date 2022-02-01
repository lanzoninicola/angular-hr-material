import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CandidatesStoreService } from '../services/candidates-store.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateNewResolver implements Resolve<boolean> {
  constructor(private _store: CandidatesStoreService) {}

  resolve(): Observable<boolean> {
    this._store.entityStateCreate();

    return of(true);
  }
}
