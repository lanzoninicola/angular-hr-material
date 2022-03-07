import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';
import { PicklistItemModel } from '../../models/picklist-item.model';
import { JobRoleQuestionDTO } from '../../types/job-role-question.dto.type';

@Injectable({
  providedIn: 'root',
})
export class JobRoleQuestionsHttpService {
  baseURL = `${environment.API}/jobrolesinterviewquestions`;

  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(): Observable<JobRoleQuestionDTO[]> {
    const url = `${this.baseURL}`;

    return this.http.get<JobRoleQuestionDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(id: number): Observable<JobRoleQuestionDTO> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<JobRoleQuestionDTO>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  findByParam(param: string, value: string) {
    const url = `${this.baseURL}?${param}=${value}`;

    return this.http.get<JobRoleQuestionDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  findByParams(params: { [key: string]: string }) {
    let queryParams = '';

    Object.keys(params).forEach((param) => {
      queryParams = queryParams + `${param}=${params[param]}&`;
    });

    const url = `${this.baseURL}?${queryParams}`;

    return this.http.get<JobRoleQuestionDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }
}
