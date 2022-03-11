import { Component, Input, OnInit } from '@angular/core';

type NavItemIcon =
  | 'dashboard'
  | 'developer_board'
  | 'chat_bubble_outline'
  | 'supervised_user_circle'
  | 'person'
  | 'table_chart';

@Component({
  selector: 'ahr-nav-list-item',
  template: `
    <a
      mat-list-item
      class="nav-list-item"
      [routerLink]="routerLink"
      routerLinkActive="active"
    >
      <mat-icon aria-label="dashboard">{{ icon }}</mat-icon>
      <span>{{ title }}</span>
    </a>
  `,
  styleUrls: ['./nav-list-item.component.scss'],
})
export class NavListItemComponent implements OnInit {
  @Input()
  title: string = 'Dashboard';

  @Input()
  outletName: string = '';

  @Input()
  route: string[] | string;

  @Input()
  icon: string = '';

  routerLink: any[] | string;

  constructor() {}

  ngOnInit(): void {
    if (Array.isArray(this.route)) {
      this.routerLink = this._buildRouterLinkWithOutlet();
    } else {
      this.routerLink = this._buildRouterLink();
    }
  }

  private _buildRouterLink() {
    return this.route;
  }

  private _buildRouterLinkWithOutlet() {
    const { outletName, route } = this;

    if (!outletName) {
      throw 'NavListItemComponent - You have passed an array to route prop. Outlet name is required';
    }

    return [
      '',
      {
        outlets: {
          [outletName]: route,
        },
      },
    ];
  }
}
