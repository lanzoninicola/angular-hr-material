import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';

import { RequestToHireDTO } from '../types/request-to-hire.type';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireHttpService {
  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(): Observable<RequestToHireDTO[]> {
    return this.http.get<RequestToHireDTO[]>(
      `${environment.API}/request-to-hire`,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(id: number): Observable<RequestToHireDTO> {
    return this.http.get<RequestToHireDTO>(
      `${environment.API}/request-to-hire/${id}`,
      this._httpOptions.isBackendRequest()
    );
  }
}
