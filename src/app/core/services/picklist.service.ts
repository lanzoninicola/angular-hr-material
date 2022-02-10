import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Picklist } from '../types/picklist.type';
import { HttpRequestOptionsService } from './http-request-options.service';

@Injectable({
  providedIn: 'root',
})
export class PicklistService {
  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findByType(type: string): Observable<Picklist[]> {
    return this.http.get<Picklist[]>(
      `${environment.API}/picklist?type=${type}`,
      this._httpOptions.isBackendRequest()
    );
  }

  findByTypeAndValue(type: string, value: string): Observable<Picklist> {
    return this.http.get<Picklist>(
      `${environment.API}/picklist?type=${type}&value=${value}`,
      this._httpOptions.isBackendRequest()
    );
  }
}
