import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ahr-settings-section',
  template: `
    <div class="container-section">
      <app-section-toolbar [title]="pageTitle"></app-section-toolbar>
      <div class="container-section">
        <div class="settings-section">
          <div class="settings-list">
            <ahr-search-control></ahr-search-control>
          </div>

          <div class="settings-outlet">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./settings-section.component.scss'],
})
export class SettingsSectionComponent implements OnInit {
  pageTitle: string = 'Global Settings';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.router.navigate(['settings', 'general', 'list']);
  }
}
