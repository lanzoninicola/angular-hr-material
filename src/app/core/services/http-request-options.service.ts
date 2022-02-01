import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpContextService } from './http-context.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestOptionsService {
  constructor(private _httpContext: HttpContextService) {}

  backendRequest() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      context: this._httpContext.backendRequest(),
    };
  }

  formSubmission() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      context: this._httpContext.formSubmission(),
    };
  }
}
