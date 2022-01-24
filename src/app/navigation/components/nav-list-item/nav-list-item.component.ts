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
      routerLink="{{ route }}"
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
  route: string = '#';

  @Input()
  icon: string = '';

  constructor() {}

  ngOnInit(): void {}
}
