import { Injectable } from '@angular/core';

import { SettingData, SettingKey } from '../types/global-settings.type';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _settingsInfo = new Map<SettingKey, SettingData>();

  get settingsInfo(): Map<SettingKey, SettingData> {
    return this._settingsInfo;
  }

  constructor() {}

  init() {
    this._initInfo();
  }

  private _initInfo() {
    const { _settingsInfo } = this;

    _settingsInfo.set('global', {
      title: 'Global Settings',
    });
    _settingsInfo.set('job-role', {
      title: 'Job Roles',
    });
    _settingsInfo.set('picklist', {
      title: 'Picklist',
    });

    _settingsInfo.set('department', {
      title: 'Departments',
    });
    _settingsInfo.set('branch', {
      title: 'Branch Offices',
    });
    _settingsInfo.set('board-template', {
      title: 'Job Board Templates',
    });
  }

  getTimeZone() {
    return 'GMT-3';
  }
}
