import { Injectable } from '@angular/core';

/**
 * Collecting error messaging for user consumption
 */
@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}

// TODO: better job of transforming error for user consumption
