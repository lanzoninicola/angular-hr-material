import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private messageService: MessageService) {}

  /**
   * @description
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleHttpError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this._logToService(`${operation} failed: ${error.message}`);

      this._logToUser(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * @description
   * Logging the message with the MessageService
   *
   * @param message - The message to log
   */
  private _logToUser(message: string) {
    this.messageService.add(`${message}`);
  }

  /**
   * @description
   * Send the error to remote logging infrastructure
   *
   * @param message - The message to log
   */
  private _logToService(message: string) {
    // TODO: send the error to remote logging infrastructure
    console.error(message); // log to console instead
  }
}
