import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';
import { RequestToHireModel } from '../types/request-to-hire.type';
import { RequestToHireStoreService } from './request-to-hire-store.service';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireService {
  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService,
    private _store: RequestToHireStoreService
  ) {}

  findAll() {
    return this.http
      .get<RequestToHireModel[]>(
        `${environment.API}/request-to-hire`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map((requestToHireData) => {
          return requestToHireData.map((requestToHire) => {
            return {
              ...requestToHire,
            };
          });
        })
      );
  }

  findById(id: number) {
    return this.http
      .get<RequestToHireModel>(
        `${environment.API}/request-to-hire/${id}`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map((requestToHireData: RequestToHireModel) => {
          return {
            ...requestToHireData,
          };
        })
      );
  }

  save(requestToHireData: RequestToHireModel) {
    //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
    return this.http
      .post<RequestToHireModel>(
        `${environment.API}/request-to-hire`,
        requestToHireData,
        this._httpOptions.isFormSubmission()
      )
      .subscribe((newRequest) => {
        this._store.currentEntity = newRequest;
      });
  }

  update(requestToHireData: RequestToHireModel) {
    const { id } = requestToHireData;

    this.http
      .patch<any>(
        `${environment.API}/request-to-hire/${id}`,
        requestToHireData,
        this._httpOptions.isFormSubmission()
      )
      .subscribe((updatedRequest) => {
        this._store.currentEntity = updatedRequest;
      });
  }
}
