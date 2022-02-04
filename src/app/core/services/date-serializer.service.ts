import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateSerializerService {
  ISO_8601_FULL_REGEXP =
    /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

  constructor() {}

  transform(date: string): Date {
    if (!this.ISO_8601_FULL_REGEXP.test(date)) {
      throw 'DateSerializerService - Invalid date format: date is not a valid ISO-8601 date';
    }

    return new Date(date);
  }
}
