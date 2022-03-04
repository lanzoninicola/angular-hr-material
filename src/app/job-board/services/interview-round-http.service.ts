import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';
import { InterviewRoundDTO } from '../types/interview-round.dto.type';

@Injectable({
  providedIn: 'root',
})
export class InterviewRoundHttpService {
  baseURL = `${environment.API}/interviewrounds`;
  parentRelations: string[] = [];

  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(): Observable<InterviewRoundDTO[]> {
    const url = `${this.baseURL}`;

    return this.http.get<InterviewRoundDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(id: number): Observable<InterviewRoundDTO> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<InterviewRoundDTO>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  findByParam(param: string, value: string) {
    const url = `${this.baseURL}?${param}=${value}`;

    return this.http.get<InterviewRoundDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  findByParamValues(param: string, values: string[]) {
    let queryParams = '';

    queryParams = values.reduce((acc, value) => {
      return acc + `&${param}=${value}`;
    }, '');

    queryParams = queryParams.replace(queryParams[0], '?');

    const url = `${this.baseURL}${queryParams}`;

    return this.http.get<InterviewRoundDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  save(dto: InterviewRoundDTO): Observable<InterviewRoundDTO> {
    return this.http.post<InterviewRoundDTO>(
      this.baseURL,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  update(dto: InterviewRoundDTO): Observable<InterviewRoundDTO> {
    return this.http.put<InterviewRoundDTO>(
      `${this.baseURL}/${dto.id}`,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  delete(id: number): Observable<InterviewRoundDTO> {
    return this.http.put<InterviewRoundDTO>(
      `${this.baseURL}/${id}`,
      null,
      this._httpOptions.isFormSubmission()
    );
  }
}
