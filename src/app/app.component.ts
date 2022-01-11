import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { BreakpointService } from './core/services/breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer') drawer: MatSidenav | any = null;

  isHandset$: Observable<boolean>;

  constructor(private breakpointService: BreakpointService) {
    this.isHandset$ = this.breakpointService.isHandset$;
  }

  ngOnInit() {}
}
