import { HttpContext, HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface HttpContextTokenContent {
  [key: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpContextService {
  _HTTP_CONTEXT_TOKEN: HttpContextToken<HttpContextTokenContent>;

  private _httpContextInitialValues: HttpContextTokenContent = {
    isBackEndRequest: false,
    isFormSubmission: false,
  };

  get token() {
    return this._HTTP_CONTEXT_TOKEN;
  }

  constructor() {
    this._HTTP_CONTEXT_TOKEN = new HttpContextToken<HttpContextTokenContent>(
      () => this._httpContextInitialValues
    );
  }

  backendRequest() {
    return new HttpContext().set(this._HTTP_CONTEXT_TOKEN, {
      ...this._httpContextInitialValues,
      isBackEndRequest: true,
    });
  }

  formSubmission() {
    return new HttpContext().set(this._HTTP_CONTEXT_TOKEN, {
      ...this._httpContextInitialValues,
      isBackEndRequest: true,
      isFormSubmission: true,
    });
  }
}
