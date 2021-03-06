import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { HttpContextService } from 'src/app/core/services/http-context.service';
import { MessageService } from 'src/app/core/services/message.service';

import { DynamicFormService } from '../services/dynamic-form.service';

// TODO: Loggin error to third party service

@Injectable({ providedIn: 'root' })
export class FormSubmissionInterceptor implements HttpInterceptor {
  constructor(
    private _dynamicForm: DynamicFormService,
    private _messageService: MessageService,
    private _httpContext: HttpContextService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { isFormSubmission } = req.context.get(this._httpContext.token);

    if (isFormSubmission) {
      this._dynamicForm.submitted();

      return next.handle(req).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            if (event.ok) {
              this._messageService.send('Record saved correctly', 'info');
              this._dynamicForm.idle();
            }
          }
        })
      );
    }

    return next.handle(req);
  }
}
