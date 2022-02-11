import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';

import { RequestToHireModel } from '../models/request-to-hire.model';
import {
  RequestToHireDTO,
  RequestToHireHttpSerialized,
} from '../types/request-to-hire.type';
import { RequestToHireSerializerService } from './request-to-hire-serializer.service';
import { RequestToHireStoreService } from './request-to-hire-store.service';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireService {
  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService,
    private _store: RequestToHireStoreService,
    private _serializer: RequestToHireSerializerService
  ) {}

  findAll(): Observable<RequestToHireModel[]> {
    return this.http
      .get<RequestToHireDTO[]>(
        `${environment.API}/request-to-hire`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map<RequestToHireDTO[], RequestToHireHttpSerialized[]>((items) => {
          return items.map((item) => {
            return this._serializer.deserialize(item);
          });
        }),
        map<RequestToHireHttpSerialized[], RequestToHireModel[]>(
          (dataSerialized) => {
            return dataSerialized.map((requestDeserialized) => {
              const {
                id,
                title,
                department,
                businessUnit,
                requester,
                jobRole,
                roleTaskDescription,
                roleLevel,
                highPriority,
                jobLocationType,
                jobLocation,
                employmentStatus,
                minimumQualifications,
                preferredQualifications,
                benefits,
                budget,
                specialCategoriesOpened,
                additionalNotes,
                status,
                createdAt,
                updatedAt,
              } = requestDeserialized;

              return new RequestToHireModel(
                id,
                title,
                department,
                businessUnit,
                requester,
                jobRole,
                roleTaskDescription,
                roleLevel,
                highPriority,
                jobLocationType,
                jobLocation,
                employmentStatus,
                minimumQualifications,
                preferredQualifications,
                benefits,
                budget,
                specialCategoriesOpened,
                additionalNotes,
                status,
                createdAt,
                updatedAt
              );
            });
          }
        )
      );
  }

  findById(id: number) {
    return this.http
      .get<RequestToHireDTO>(
        `${environment.API}/request-to-hire/${id}`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map((item) => {
          const requestDeserialized = this._serializer.deserialize(item);

          const {
            id,
            title,
            department,
            businessUnit,
            requester,
            jobRole,
            roleTaskDescription,
            roleLevel,
            highPriority,
            jobLocationType,
            jobLocation,
            employmentStatus,
            minimumQualifications,
            preferredQualifications,
            benefits,
            budget,
            specialCategoriesOpened,
            additionalNotes,
            status,
            createdAt,
            updatedAt,
          } = requestDeserialized;

          return new RequestToHireModel(
            id,
            title,
            department,
            businessUnit,
            requester,
            jobRole,
            roleTaskDescription,
            roleLevel,
            highPriority,
            jobLocationType,
            jobLocation,
            employmentStatus,
            minimumQualifications,
            preferredQualifications,
            benefits,
            budget,
            specialCategoriesOpened,
            additionalNotes,
            status,
            createdAt,
            updatedAt
          );
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
