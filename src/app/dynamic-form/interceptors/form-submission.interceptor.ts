import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, tap } from 'rxjs';
import { DynamicFormService } from '../services/dynamic-form.service';
import { FormState } from '../types/form-state.types';

@Injectable({ providedIn: 'root' })
export class FormSubmissionInterceptor implements HttpInterceptor {
  constructor(private _dynamicForm: DynamicFormService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const header: HttpHeaders = req.headers;
    const SUBMITTED: FormState = 'submitted';

    if (header.has('form-action')) {
      if (header.get('form-action') === SUBMITTED) {
        this._dynamicForm.submitted();

        return next.handle(req).pipe(
          tap((event) => {
            if (event instanceof HttpResponse) {
              this._dynamicForm.idle();
            }
          })
        );
      }
    }

    return next.handle(req);
  }
}
