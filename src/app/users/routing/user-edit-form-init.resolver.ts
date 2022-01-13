import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { PicklistService } from 'src/app/core/services/picklist.service';

@Injectable({
  providedIn: 'root',
})
export class UserEditFormInitResolver implements Resolve<any> {
  constructor(private picklistService: PicklistService) {}

  resolve(): Observable<any> {
    const departmentsValues = this.picklistService.getValuesOf('departments');
    const companyLevels = this.picklistService.getValuesOf('companyLevels');
    const platformRoleValues =
      this.picklistService.getValuesOf('platformRoles');

    return combineLatest([
      departmentsValues,
      companyLevels,
      platformRoleValues,
    ]).pipe(
      map((v) => {
        return {
          departmentsValues: v[0],
          companyLevels: v[1],
          platformRoleValues: v[2],
        };
      })
    );
  }
}
