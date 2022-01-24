import { Component, Input, OnInit } from '@angular/core';

type LogoColor = 'white' | 'black';

@Component({
  selector: 'ahr-logo',
  template: ` <div class="logo-wrapper">
    <img
      [ngStyle]="{ width, height }"
      src="/assets/img/logo-{{ color }}.png"
      alt="logo"
    />
  </div>`,
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input()
  width: string = '150px';

  @Input()
  height: string = '100%';

  @Input()
  color: LogoColor = 'white';

  constructor() {}

  ngOnInit(): void {}
}
