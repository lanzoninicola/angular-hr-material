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
  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findByType(type: string): Observable<PicklistItemDTO[]> {
    return this.http.get<PicklistItemDTO[]>(
      `${environment.API}/picklist?type=${type}`,
      this._httpOptions.isBackendRequest()
    );
  }

  findByTypeAndValue(
    type: string,
    value: string
  ): Observable<PicklistItemDTO[]> {
    return this.http.get<PicklistItemDTO[]>(
      `${environment.API}/picklist?type=${type}&value=${value}`,
      this._httpOptions.isBackendRequest()
    );
  }
}
