import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EMPTY, map, Observable, of, tap } from 'rxjs';
import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { BranchService } from 'src/app/settings/services/branch/branch.service';

import { RequestToHireStoreService } from '../services/request-to-hire-store.service';

@Injectable({
  providedIn: 'root',
})
export class BranchesFormControlResolver implements Resolve<boolean> {
  constructor(
    private _store: RequestToHireStoreService,
    private _branchService: BranchService
  ) {}

  resolve(): Observable<any> {
    if (this._store.getBranchesFormControl() === undefined) {
      return this._branchService.findAll().pipe(
        map((branches) => {
          return branches.map((branch) => {
            return {
              value: branch.getId(),
              textContext: branch.getName(),
            };
          });
        }),
        tap<SelectOptionConfig[]>((branchesOptions) => {
          this._store.setBranchesFormControl(branchesOptions);
        })
      );
    }

    return of(EMPTY);
  }
}
