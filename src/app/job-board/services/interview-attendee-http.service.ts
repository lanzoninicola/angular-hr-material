import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';
import { InterviewAttendeeDTO } from '../types/interview.dto.type';

@Injectable({
  providedIn: 'root',
})
export class InterviewAttendeeHttpService {
  baseURL = `${environment.API}/interviews`;
  parentRelations: string[] = [];

  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(
    options = {
      withRelations: true,
    }
  ): Observable<InterviewAttendeeDTO[]> {
    const url = `${this.baseURL}`;

    return this.http.get<InterviewAttendeeDTO[]>(
      options.withRelations ? this._getURLwithRelations(url) : url,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(
    id: number,
    options = {
      withRelations: true,
    }
  ): Observable<InterviewAttendeeDTO> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<InterviewAttendeeDTO>(
      options.withRelations ? this._getURLwithRelations(url) : url,
      this._httpOptions.isBackendRequest()
    );
  }

  findByParam(param: string, value: string) {
    const url = `${this.baseURL}?${param}=${value}`;

    return this.http.get<InterviewAttendeeDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  save(dto: InterviewAttendeeDTO): Observable<InterviewAttendeeDTO> {
    return this.http.post<InterviewAttendeeDTO>(
      this.baseURL,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  update(dto: InterviewAttendeeDTO): Observable<InterviewAttendeeDTO> {
    return this.http.put<InterviewAttendeeDTO>(
      `${this.baseURL}/${dto.id}`,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  delete(id: number): Observable<InterviewAttendeeDTO> {
    return this.http.put<InterviewAttendeeDTO>(
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
