import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ahr-icon',
  template: ` <mat-icon
    aria-hidden="false"
    attr.aria-label="{{ label }}"
    [ngStyle]="{ color: color }"
    >{{ icon }}</mat-icon
  >`,
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input()
  icon: string;

  @Input()
  label: string;

  @Input()
  color: string;

  constructor() {}

  ngOnInit(): void {}
}
