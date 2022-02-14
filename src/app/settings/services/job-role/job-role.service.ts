import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';

import { JobRoleDTO, JobRoleModel } from '../../models/job-role.model';
import { JobRoleSerializerService } from './job-role-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class JobRoleService {
  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService,
    private _serializer: JobRoleSerializerService
  ) {}

  findAll(): Observable<JobRoleModel[]> {
    return this.http
      .get<JobRoleDTO[]>(
        `${environment.API}/job-roles`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map<JobRoleDTO[], JobRoleModel[]>((dtos) => {
          return dtos.map((dto) => {
            return this._serializer.deserialize(dto);
          });
        })
      );
  }

  findById(id: number): Observable<JobRoleModel> {
    return this.http
      .get<JobRoleDTO>(
        `${environment.API}/job-roles/${id}`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map<JobRoleDTO, JobRoleModel>((dto) => {
          return this._serializer.deserialize(dto);
        })
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
