import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ahr-chip',
  template: ` <div [ngClass]="styles">
    <span>{{ label }}</span>
  </div>`,
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit {
  @Input()
  label: string;

  @Input()
  cssClasses: string[] = [];

  styles: string;

  constructor() {}

  ngOnInit(): void {
    this.cssClasses = ['chip-wrapper', ...this.cssClasses];
    this.styles = this.cssClasses.join(' ');
  }
}
