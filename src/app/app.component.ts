import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter, Observable, Subscription } from 'rxjs';

import { BreakpointService } from './core/services/breakpoint.service';

//TODO: Prefetching data Picklist, Settings, Users in the store starting after 15000ms
// skipping loading spinner and http error handling intercepotrs

//TODO: check SWR for data loading
// to http service add implements HttpService
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated$: Observable<boolean>;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated$ = this._authService.isAuthenticated$;
  }

  ngOnDestroy() {}
}
