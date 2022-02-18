import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BoardTemplateDTO } from '../../types/board-template.types';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { HttpService } from 'src/app/core/types/http-service.type';

@Injectable({
  providedIn: 'root',
})
export class BoardTemplateHttpService implements HttpService {
  baseURL = `${environment.API}/boardtemplates`;

  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService
  ) {}

  findAll(): Observable<BoardTemplateDTO[]> {
    const url = `${this.baseURL}`;

    return this.http.get<BoardTemplateDTO[]>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  findById(id: number): Observable<BoardTemplateDTO> {
    const url = `${this.baseURL}/${id}`;

    return this.http.get<BoardTemplateDTO>(
      url,
      this._httpOptions.isBackendRequest()
    );
  }

  save(): Observable<BoardTemplateDTO> {
    return of({} as BoardTemplateDTO);
  }

  update(): Observable<BoardTemplateDTO> {
    return of({} as BoardTemplateDTO);
  }
}
