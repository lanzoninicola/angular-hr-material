import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { JobRoleDTO, JobRoleModel } from '../../models/job-role.model';
import { JobRoleHttpService } from './job-role-http.service';
import { JobRoleSerializerService } from './job-role-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class JobRoleService {
  constructor(
    private _httpService: JobRoleHttpService,
    private _serializer: JobRoleSerializerService
  ) {}

  findAll(): Observable<JobRoleModel[]> {
    return this._httpService.findAll().pipe(
      map<JobRoleDTO[], JobRoleModel[]>((dtos) => {
        return dtos.map((dto) => this._serializer.deserialize(dto));
      })
    );
  }

  findById(id: number): Observable<JobRoleModel> {
    return this._httpService
      .findById(id)
      .pipe(
        map<JobRoleDTO, JobRoleModel>((dto) =>
          this._serializer.deserialize(dto)
        )
      );
  }

  // save(requestToHireData: any) {
  //   //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
  //   return this.http
  //     .post<any>(
  //       `${environment.API}/job-roles`,
  //       requestToHireData,
  //       this._httpOptions.isFormSubmission()
  //     )
  //     .subscribe((newRequest) => {
  //       this._store.currentEntity = newRequest;
  //     });
  // }

  // update(requestToHireData: any) {
  //   const { id } = requestToHireData;

  //   this.http
  //     .patch<any>(
  //       `${environment.API}/job-roles/${id}`,
  //       requestToHireData,
  //       this._httpOptions.isFormSubmission()
  //     )
  //     .subscribe((updatedRequest) => {
  //       this._store.currentEntity = updatedRequest;
  //     });
  // }
}
