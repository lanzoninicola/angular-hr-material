import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-section-toolbar',
  template: ` <mat-toolbar color="secondary">
    <div class="col1">
      <h2>{{ title }}</h2>
    </div>
    <div class="col2">
      <ng-content></ng-content>
    </div>
  </mat-toolbar>`,
  styleUrls: ['./section-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionToolbarComponent implements OnInit {
  @Input()
  title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
