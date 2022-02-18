import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';

import { BranchDTO } from '../../models/branch.model';

@Injectable({
  providedIn: 'root',
})
export class BranchHttpService {
  baseURL = `${environment.API}/branches`;

  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(): Observable<BranchDTO[]> {
    const url = `${this.baseURL}`;

    return this.http.get<BranchDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(id: number): Observable<BranchDTO> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<BranchDTO>(url, this._httpOptions.isBackendRequest());
  }

  // save(requestToHireData: any) {
  //   //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
  //   return this.http
  //     .post<any>(
  //       `${environment.API}/branches`,
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
  //       `${environment.API}/branches/${id}`,
  //       requestToHireData,
  //       this._httpOptions.isFormSubmission()
  //     )
  //     .subscribe((updatedRequest) => {
  //       this._store.currentEntity = updatedRequest;
  //     });
  // }
}
