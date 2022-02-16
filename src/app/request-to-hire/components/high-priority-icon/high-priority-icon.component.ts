import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-high-priority-icon',
  template: `<ahr-icon
    *ngIf="isHighPriority"
    [icon]="icon"
    [label]="label"
    [color]="color"
  ></ahr-icon>`,
})
export class HighPriorityIconComponent implements OnInit {
  @Input()
  icon: string;

  @Input()
  label: string;

  @Input()
  color: string;

  @Input()
  payload: any;

  isHighPriority: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isHighPriority = this.payload ? true : false;
  }
}
