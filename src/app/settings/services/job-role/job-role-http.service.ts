import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';

import { JobRoleDTO } from '../../models/job-role.model';

@Injectable({
  providedIn: 'root',
})
export class JobRoleHttpService {
  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(): Observable<JobRoleDTO[]> {
    return this.http.get<JobRoleDTO[]>(
      `${environment.API}/jobroles`,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(id: number): Observable<JobRoleDTO> {
    return this.http.get<JobRoleDTO>(
      `${environment.API}/jobroles/${id}`,
      this._httpOptions.isBackendRequest()
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
