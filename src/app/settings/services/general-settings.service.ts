import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralSettingsService {
  constructor() {}

  getTimeZone() {
    return 'GMT-3';
  }
}
