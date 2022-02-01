import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ResolveEnd, ResolveStart, Router, RouterEvent } from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import { BreakpointService } from './core/services/breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatSidenav | any = null;
  loading: boolean = false;
  isHandset$: Observable<boolean>;

  subs: Subscription = new Subscription();

  constructor(
    private breakpointService: BreakpointService,
    private router: Router
  ) {
    this.isHandset$ = this.breakpointService.isHandset$;
  }

  ngOnInit() {
    this._listenForLoadingSpinner();
  }

  private _listenForLoadingSpinner() {
    this.subs.add(
      this.router.events
        .pipe(
          filter(
            (event) =>
              event instanceof ResolveStart || event instanceof ResolveEnd
          )
        )
        .subscribe((event) => {
          if (event instanceof ResolveStart) {
            this.loading = true;
          } else if (event instanceof ResolveEnd) {
            this.loading = false;
          }
        })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
