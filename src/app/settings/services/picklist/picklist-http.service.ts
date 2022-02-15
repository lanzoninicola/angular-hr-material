import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';
import { PicklistItemDTO } from '../../types/picklist-item.type';

@Injectable({
  providedIn: 'root',
})
export class PicklistHttpService {
  baseURL = `${environment.API}/picklist`;

  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findById(id: number): Observable<PicklistItemDTO> {
    return this.http.get<PicklistItemDTO>(
      `${this.baseURL}/${id}`,
      this._httpOptions.isBackendRequest()
    );
  }

  findByType(type: string): Observable<PicklistItemDTO[]> {
    return this.http.get<PicklistItemDTO[]>(
      `${this.baseURL}?type=${type}`,
      this._httpOptions.isBackendRequest()
    );
  }

  findByTypeAndValue(
    type: string,
    value: string
  ): Observable<PicklistItemDTO[]> {
    return this.http.get<PicklistItemDTO[]>(
      `${this.baseURL}?type=${type}&value=${value}`,
      this._httpOptions.isBackendRequest()
    );
  }

  findByQuery(query: string): Observable<PicklistItemDTO[]> {
    return this.http.get<PicklistItemDTO[]>(
      `${this.baseURL}?${query}`,
      this._httpOptions.isBackendRequest()
    );
  }
}
