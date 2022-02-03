import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';
import {
  RequestToHireHttpResponse,
  RequestToHireListView,
} from '../types/request-to-hire.type';
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
      .get<RequestToHireHttpResponse[]>(
        `${environment.API}/request-to-hire`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map((items) => {
          return items.map((item) => {
            return {
              ...items,
              department: item.department.name,
              requestedBy: `${item.requester.lastname} ${item.requester.firstname} (${item.requester.email})`,
              jobRole: item.jobRole.name,
              jobLocation: 
            };
          });
        })
      );
  }

  findById(id: number) {
    return this.http
      .get<RequestToHireHttpResponse>(
        `${environment.API}/request-to-hire/${id}`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map((requestToHireData: any) => {
          return {
            ...requestToHireData,
          };
        })
      );
  }

  save(requestToHireData: any) {
    //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
    return this.http
      .post<any>(
        `${environment.API}/request-to-hire`,
        requestToHireData,
        this._httpOptions.isFormSubmission()
      )
      .subscribe((newRequest) => {
        this._store.currentEntity = newRequest;
      });
  }

  update(requestToHireData: any) {
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
