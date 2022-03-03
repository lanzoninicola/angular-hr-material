import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';
import { InterviewFeedbackDTO } from '../types/interview-feedback.type';

@Injectable({
  providedIn: 'root',
})
export class InterviewFeedbackHttpService {
  baseURL = `${environment.API}/interviewfeedbacks`;
  parentRelations: string[] = [];

  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(): Observable<InterviewFeedbackDTO[]> {
    const url = `${this.baseURL}`;

    return this.http.get<InterviewFeedbackDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(id: number): Observable<InterviewFeedbackDTO> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<InterviewFeedbackDTO>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  findByParam(param: string, value: string) {
    const url = `${this.baseURL}?${param}=${value}`;

    return this.http.get<InterviewFeedbackDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  save(dto: InterviewFeedbackDTO): Observable<InterviewFeedbackDTO> {
    return this.http.post<InterviewFeedbackDTO>(
      this.baseURL,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  update(dto: InterviewFeedbackDTO): Observable<InterviewFeedbackDTO> {
    return this.http.put<InterviewFeedbackDTO>(
      `${this.baseURL}/${dto.id}`,
      dto,
      this._httpOptions.isFormSubmission()
    );
  }

  delete(id: number): Observable<InterviewFeedbackDTO> {
    return this.http.put<InterviewFeedbackDTO>(
      `${this.baseURL}/${id}`,
      null,
      this._httpOptions.isFormSubmission()
    );
  }
}
