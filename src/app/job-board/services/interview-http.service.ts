import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';
import { InterviewDTO } from '../types/interview.dto.type';

@Injectable({
  providedIn: 'root',
})
export class InterviewHttpService {
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
  ): Observable<InterviewDTO[]> {
    const url = `${this.baseURL}`;

    return this.http.get<InterviewDTO[]>(
      options.withRelations ? this._getURLwithRelations(url) : url,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(
    id: number,
    options = {
      withRelations: true,
    }
  ): Observable<InterviewDTO> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<InterviewDTO>(
      options.withRelations ? this._getURLwithRelations(url) : url,
      this._httpOptions.isBackendRequest()
    );
  }

  findByParam(param: string, value: string) {
    const url = `${this.baseURL}?${param}=${value}`;

    return this.http.get<InterviewDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  save(dto: InterviewDTO): Observable<InterviewDTO> {
    return this.http.post<InterviewDTO>(
      this.baseURL,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  update(dto: InterviewDTO): Observable<InterviewDTO> {
    return this.http.put<InterviewDTO>(
      `${this.baseURL}/${dto.id}`,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  delete(id: number): Observable<InterviewDTO> {
    return this.http.put<InterviewDTO>(
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
