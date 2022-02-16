import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';

import { HttpContextService } from '../services/http-context.service';
import { MessageService } from '../services/message.service';

/**
 * @description
 * This interceptor handles errors when APIs are consuming in a regular workflow.
 */

@Injectable({
  providedIn: 'root',
})
export class HttpBackendErrorInterceptor implements HttpInterceptor {
  constructor(
    private _messageService: MessageService,
    private _dynamicForm: DynamicFormService,
    private _httpContext: HttpContextService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { isBackendRequest, isFormSubmission } = request.context.get(
      this._httpContext.token
    );

    if (isBackendRequest || isFormSubmission) {
      return next
        .handle(request)

        .pipe(
          retry(1),

          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';

            if (error.error instanceof ErrorEvent) {
              // client-side code fail to generate the request and throw the error (ErrorEvent objects)
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // the server might reject the request for various reasons
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }

            this._restoreFormState();

            this._logToUser(errorMessage);

            this._logToService(errorMessage);

            return throwError(() => errorMessage);
          })
        );
    }

    return next.handle(request);
  }

  // TODO: How this works when...? See below

  /**
   * @description
   * This restore the form state to changed.
   * So, the loading spinner will be removed and the form will be enabled again.
   *
   */
  private _restoreFormState() {
    this._dynamicForm.changed();
  }

  private _logToUser(message: string) {
    this._messageService.send(message, 'error');
  }

  private _logToService(message: string) {}
}

/**
 * Use case
 *
 * Open the user edit form (or whatever form in the app)
 * Start to editing the tab but not save
 * Open a new browser tab with different form
 * The last tab has an http specific error
 *
 * Go back to the first tab, continue editing and save
 * what happens?
 *
 *
 */
