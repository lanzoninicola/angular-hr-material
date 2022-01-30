import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  constructor(private messageService: MessageService) {}

  /**
   * @description
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handle<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      this._logToService(`${operation} failed: ${error.message}`);

      this._logToUser(operation, error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * @description
   * Logging the message with the MessageService
   *
   * @param operation - name of the operation that failed
   * @param error - The message to log
   */
  private _logToUser(operation: string, error: HttpErrorResponse) {
    const message = `An unexpected error occured during the operation: ${operation?.toLowerCase()}. Error: ${
      error.status
    } - ${error.statusText}`;
    this.messageService.send(message, 'error');
  }

  /**
   * @description
   * Send the error to remote logging infrastructure
   *
   * @param message - The message to log
   */
  private _logToService(message: string) {
    // TODO: send the error to remote logging infrastructure
    // console.error(message); // log to console instead
  }
}
