import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-badge',
  templateUrl: './icon-badge.component.html',
  styleUrls: ['./icon-badge.component.scss'],
})
export class IconBadgeComponent implements OnInit {
  @Input()
  icon: string;

  constructor() {}

  ngOnInit(): void {}
}
