import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';

import { BranchDTO, BranchModel } from '../models/branch.model';
import { SettingsStoreService } from './settings-store.service';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService,
    private _store: SettingsStoreService
  ) {}

  findAll(): Observable<BranchModel[]> {
    return this.http
      .get<BranchDTO[]>(
        `${environment.API}/branches`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map((items) => {
          return items.map((item) => {
            return new BranchModel(
              item.id,
              item.name,
              item.street,
              item.city,
              item.country,
              item.timezone
            );
          });
        })
      );
  }

  findById(id: number): Observable<BranchModel> {
    return this.http
      .get<BranchDTO>(
        `${environment.API}/branches/${id}`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map((item) => {
          return new BranchModel(
            item.id,
            item.name,
            item.street,
            item.city,
            item.country,
            item.timezone
          );
        })
      );
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
