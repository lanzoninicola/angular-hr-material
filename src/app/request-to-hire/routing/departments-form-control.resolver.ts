import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EMPTY, map, Observable, of, tap } from 'rxjs';
import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { DepartmentsService } from 'src/app/settings/services/department.service';

import { RequestToHireStoreService } from '../services/request-to-hire-store.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsFormControlResolver implements Resolve<boolean> {
  constructor(
    private _store: RequestToHireStoreService,
    private _departmentsService: DepartmentsService
  ) {}

  resolve(): Observable<any> {
    if (this._store.getDepartmentsFormControl() === undefined) {
      return this._departmentsService.findAll().pipe(
        map((departments) => {
          return departments.map((department) => {
            return {
              value: department.getId(),
              textContext: department.getName(),
            };
          });
        }),
        tap<SelectOptionConfig[]>((departmentsOptions) => {
          this._store.setDepartmentsFormControl(departmentsOptions);
        })
      );
    }

    return of(EMPTY);
  }
}
