import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';
import { JobApplicationDTO } from '../types/job-application.dto.type';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationsHttpService {
  baseURL = `${environment.API}/jobsapplications`;
  parentRelations: string[] = ['jobs', 'candidates'];

  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(
    options = {
      withRelations: true,
    }
  ): Observable<JobApplicationDTO[]> {
    const url = `${this.baseURL}`;

    return this.http.get<JobApplicationDTO[]>(
      options.withRelations ? this._getURLwithRelations(url) : url,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(
    id: number,
    options = {
      withRelations: true,
      relations: this.parentRelations,
    }
  ): Observable<JobApplicationDTO> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<JobApplicationDTO>(
      options.withRelations
        ? this._getURLwithRelations(url, options.relations)
        : url,
      this._httpOptions.isBackendRequest()
    );
  }

  findByParam(param: string, value: string) {
    const url = `${this.baseURL}?${param}=${value}`;

    return this.http.get<JobApplicationDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  findByQuery(query: string): Observable<JobApplicationDTO[]> {
    return this.http.get<JobApplicationDTO[]>(
      `${this.baseURL}?${query}`,
      this._httpOptions.isBackendRequest()
    );
  }

  save(dto: JobApplicationDTO): Observable<JobApplicationDTO> {
    return this.http.post<JobApplicationDTO>(
      this.baseURL,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  update(dto: JobApplicationDTO): Observable<JobApplicationDTO> {
    return this.http.put<JobApplicationDTO>(
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
  private _getURLwithRelations(
    baseURL: string,
    parents: string[] = this.parentRelations
  ) {
    return `${baseURL}?${this._relationsQueryString(parents)}`;
  }

  /**
   * @description
   * Returns a string of the query parameters of the relations to be expanded
   */
  private _relationsQueryString(parents: string[]) {
    let fullUrlQuery = '';

    parents.forEach((model) => {
      fullUrlQuery = fullUrlQuery + `&_expand=${model}`;
    });

    return fullUrlQuery;
  }
}
