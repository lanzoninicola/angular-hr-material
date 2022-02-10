import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EMPTY, map, Observable, of, tap } from 'rxjs';
import { BranchesService } from 'src/app/settings/services/branches.service';

import { RequestToHireStoreService } from '../services/request-to-hire-store.service';

@Injectable({
  providedIn: 'root',
})
export class BranchesFormControlResolver implements Resolve<boolean> {
  constructor(
    private _store: RequestToHireStoreService,
    private _branchesService: BranchesService
  ) {}

  resolve(): Observable<any> {
    if (this._store.getBranchesFormControl() === undefined) {
      return this._branchesService.findAll().pipe(
        map((branches) => {
          return branches.map((branche) => {
            return branche.getName();
          });
        }),
        tap((branchesName) => {
          this._store.setBranchesFormControl(branchesName);
        })
      );
    }

    return of(EMPTY);
  }
}