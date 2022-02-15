import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';

import { DepartmentDTO } from '../../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentHttpService {
  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(): Observable<DepartmentDTO[]> {
    return this.http.get<DepartmentDTO[]>(
      `${environment.API}/departments`,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(id: number): Observable<DepartmentDTO> {
    return this.http.get<DepartmentDTO>(
      `${environment.API}/departments/${id}`,
      this._httpOptions.isBackendRequest()
    );
  }

  // save(requestToHireData: any) {
  //   //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
  //   return this.http
  //     .post<any>(
  //       `${environment.API}/departments`,
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
  //       `${environment.API}/departments/${id}`,
  //       requestToHireData,
  //       this._httpOptions.isFormSubmission()
  //     )
  //     .subscribe((updatedRequest) => {
  //       this._store.currentEntity = updatedRequest;
  //     });
  // }
}
