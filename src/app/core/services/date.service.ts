import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  /**
   * @description
   * Convert ISO8601 date string to Date object
   * ISO8601 date string is used by the API to represent dates.
   *
   * ISO8601 date string is in the format of 'yyyy-mm-ddThh:mm:ss.sssZ'
   * - eg. 2020-01-01T00:00:00.000Z
   * Date object is in the format of 'Dayname(3dig/s) Monthname(3dig/s) dd yyyy hh:mm:ss GMT-0300 (Brasilia Standard Time)'
   * - eg. Tue Dec 31 2019 21:00:00 GMT-0300 (Brasilia Standard Time)
   *
   * Input:   2020-01-01T00:00:00.000Z
   * Output:  Tue Dec 31 2019 21:00:00 GMT-0300 (Brasilia Standard Time)
   *
   * @param date ISO8601 date string
   */
  ISOToFullDate(date: string): Date {
    const ISO_8601_FULL_REGEXP =
      /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

    if (!ISO_8601_FULL_REGEXP.test(date)) {
      throw 'DateSerializerService - Invalid date format: date is not a valid ISO-8601 date';
    }

    return new Date(date);
  }

  /**
   * @description
   * Given Date object it returns the date string in the format of 'dd/mm/yyyy'
   *
   * @param date Date object
   * @param locale string of locale settings (eg. 'en-GB', 'pt-BR')
   *
   * Input:   Tue Dec 31 2019 21:00:00 GMT-0300 (Brasilia Standard Time)
   * Output:  31/12/2019
   */
  dateToString(date: Date, locale: string = 'en-GB'): string {
    return new Intl.DateTimeFormat(locale).format(date);
  }

  /**
   * @description
   * Given Date object it returns the date string in the format of ISO8601
   *
   * @param date Date object
   *
   * Input:   Tue Dec 31 2019 21:00:00 GMT-0300 (Brasilia Standard Time)
   * Output:  2020-01-01T00:00:00.000Z
   */
  dateToISOString(date: Date): string {
    return date.toISOString();
  }

  /**
   * @description
   * Given Date object it returns the time string in the format of 'hh:mm:ss'
   *
   * @param date Date object
   * @param locale string of locale settings (eg. 'en-GB', 'pt-BR')
   *
   * Input:   Tue Dec 31 2019 21:00:00 GMT-0300 (Brasilia Standard Time)
   * Output:  21:00:00
   */
  timeToString(date: Date, locale: string = 'en-GB'): string {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'GMT',
    };

    return new Intl.DateTimeFormat(locale, timeOptions).format(date);
  }

  /**
   * @description
   * Given Date object it returns the date and time string in the format of 'dd/mm/yyyy hh:mm:ss'
   *
   * @param date Date object
   * @param locale string of locale settings (eg. 'en-GB', 'pt-BR')
   *
   * Input:   Tue Dec 31 2019 21:00:00 GMT-0300 (Brasilia Standard Time)
   * Output:  31/12/2019 21:00:00
   */
  getFullDateString(date: Date, locale: string = 'en-GB'): string {
    return `${this.dateToString(date, locale)} ${this.timeToString(
      date,
      locale
    )}`;
  }
}
