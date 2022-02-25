import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';
import { JobApplicationActivityDTO } from '../types/ja-activity.dto.type';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationActivityHttpService {
  baseURL = `${environment.API}/jobsapplicationsactivities`;
  parentRelations: string[] = [];

  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(
    options = {
      withRelations: true,
    }
  ): Observable<JobApplicationActivityDTO[]> {
    const url = `${this.baseURL}`;

    return this.http.get<JobApplicationActivityDTO[]>(
      options.withRelations ? this._getURLwithRelations(url) : url,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(
    id: number,
    options = {
      withRelations: true,
    }
  ): Observable<JobApplicationActivityDTO> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<JobApplicationActivityDTO>(
      options.withRelations ? this._getURLwithRelations(url) : url,
      this._httpOptions.isBackendRequest()
    );
  }

  findByParam(param: string, value: string) {
    const url = `${this.baseURL}?${param}=${value}`;

    return this.http.get<JobApplicationActivityDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  save(dto: JobApplicationActivityDTO): Observable<JobApplicationActivityDTO> {
    return this.http.post<JobApplicationActivityDTO>(
      this.baseURL,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  update(
    dto: JobApplicationActivityDTO
  ): Observable<JobApplicationActivityDTO> {
    return this.http.put<JobApplicationActivityDTO>(
      `${this.baseURL}/${dto.id}`,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  delete(id: number): Observable<JobApplicationActivityDTO> {
    return this.http.put<JobApplicationActivityDTO>(
      `${this.baseURL}/${id}`,
      null,
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
