import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';

import { DepartmentDTO, DepartmentModel } from '../models/department.model';
import { SettingsStoreService } from './settings-store.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService,
    private _store: SettingsStoreService
  ) {}

  findAll(): Observable<DepartmentModel[]> {
    return this.http
      .get<DepartmentDTO[]>(
        `${environment.API}/departments`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map((items) => {
          return items.map((item) => {
            return new DepartmentModel(
              item.id,
              item.name,
              item.manager,
              item.teamLeads
            );
          });
        })
      );
  }

  findById(id: number): Observable<DepartmentModel> {
    return this.http
      .get<DepartmentDTO>(
        `${environment.API}/departments/${id}`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map((item) => {
          return new DepartmentModel(
            item.id,
            item.name,
            item.manager,
            item.teamLeads
          );
        })
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
