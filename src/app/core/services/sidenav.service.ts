import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  state: Subject<{ sidenav: MatSidenav; opened: boolean }> = new Subject();

  constructor() { }
  
  set state({ sidenav: MatSidenav; opened: boolean }) {
    
  }
}
