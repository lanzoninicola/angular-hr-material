import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';

import { JobApplicationWorkingStatusDTO } from '../types/ja-working-status.dto.type';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationWorkingStatusHttpService {
  baseURL = `${environment.API}/jaworkingstatuses`;
  parentRelations: string[] = [];

  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(
    options = {
      withRelations: true,
    }
  ): Observable<JobApplicationWorkingStatusDTO[]> {
    const url = `${this.baseURL}`;

    return this.http.get<JobApplicationWorkingStatusDTO[]>(
      options.withRelations ? this._getURLwithRelations(url) : url,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(
    id: number,
    options = {
      withRelations: true,
    }
  ): Observable<JobApplicationWorkingStatusDTO> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<JobApplicationWorkingStatusDTO>(
      options.withRelations ? this._getURLwithRelations(url) : url,
      this._httpOptions.isBackendRequest()
    );
  }

  save(
    dto: JobApplicationWorkingStatusDTO
  ): Observable<JobApplicationWorkingStatusDTO> {
    return this.http.post<JobApplicationWorkingStatusDTO>(
      this.baseURL,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  update(
    dto: JobApplicationWorkingStatusDTO
  ): Observable<JobApplicationWorkingStatusDTO> {
    return this.http.put<JobApplicationWorkingStatusDTO>(
      `${this.baseURL}/${dto.id}`,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  /**
   *
   * @description
   * Returns the full URL with the query parameters of the relations to be expanded
   *
   */
  private _getURLwithRelations(baseURL: string) {
    return `${baseURL}?${this._relationsQueryString()}`;
  }

  /**
   * @description
   * Returns a string of the query parameters of the relations to be expanded
   */
  private _relationsQueryString() {
    let fullUrlQuery = '';

    this.parentRelations.forEach((model) => {
      fullUrlQuery = fullUrlQuery + `&_expand=${model}`;
    });

    return fullUrlQuery;
  }
}
