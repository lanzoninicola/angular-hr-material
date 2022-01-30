import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

type MessageLevel = 'info' | 'notice' | 'warning' | 'error';

/**
 * Collecting error messaging for user consumption
 */
@Injectable({ providedIn: 'root' })
export class MessageService {
  errorMatSnackBar = errorConfig;

  constructor(private _snackBar: MatSnackBar) {}

  add(message: string, level: MessageLevel = 'info') {
    this._snackBar.open(message, 'CLOSE', this.errorMatSnackBar);
  }
}

// source: https://stackblitz.com/edit/angular-snackbar?file=app%2Fapp.component.ts
const errorConfig: MatSnackBarConfig = new MatSnackBarConfig();

errorConfig.panelClass = ['snack-bar-error'];
