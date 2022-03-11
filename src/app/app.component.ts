import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '@auth0/auth0-angular';

import { BreakpointService } from './core/services/breakpoint.service';
import { UserService } from './pages/users/services/user.service';

//TODO: Prefetching data Picklist, Settings, Users in the store starting after 15000ms
// skipping loading spinner and http error handling intercepotrs

//TODO: check SWR for data loading
// to http service add implements HttpService
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer: MatSidenav | any = null;

  constructor(
    public breakpointService: BreakpointService,
    public authz: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    const { authz, _userService } = this;

    // _authz.user$.pipe(
    //   switchMap((user) => {
    //     if (user && user.email) {
    //       return _userService.findByEmail(user.email);
    //     }
    //     return of(null);
    //   }),
    //   tap((user) => {
    //     _userService.stateUserAuthenticated$.next(user);
    //   })
    // );
  }
}
