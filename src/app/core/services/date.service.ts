import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  getDate(date: Date, locale: string = 'en-GB'): string {
    return new Intl.DateTimeFormat(locale).format(date);
  }

  // TODO: handle time-zone
  getTime(date: Date, locale: string = 'en-GB'): string {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'GMT',
    };

    return new Intl.DateTimeFormat(locale, timeOptions).format(date);
  }
}
