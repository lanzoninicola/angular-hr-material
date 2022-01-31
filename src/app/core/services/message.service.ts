import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

type MessageLevel = 'info' | 'warning' | 'error';

/**
 * Collecting error messaging for user consumption
 */
@Injectable({ providedIn: 'root' })
export class MessageService {
  snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private _snackBar: MatSnackBar) {}

  send(message: string, level: MessageLevel = 'info') {
    // example: https://stackblitz.com/edit/angular-snackbar?file=app%2Fapp.component.ts
    this._loadSnackBarConfig(level);

    this._openSnackBar(level, message);
  }

  private _loadSnackBarConfig(level: MessageLevel) {
    // css classes in the global css
    this.snackBarConfig.panelClass = [`snack-bar-${level}`];

    if (level !== 'error') {
      this.snackBarConfig.duration = 5000;
    }
  }

  private _openSnackBar(level: MessageLevel, message: string) {
    this._snackBar.open(
      `${level.toUpperCase()}: ${message}`,
      'CLOSE',
      this.snackBarConfig
    );
  }
}
