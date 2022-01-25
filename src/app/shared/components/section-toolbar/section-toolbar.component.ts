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
  templateUrl: './section-toolbar.component.html',
  styleUrls: ['./section-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionToolbarComponent implements OnInit {
  @Input()
  title: string = '';

  @Input()
  hideSearchControl: boolean = false;

  @Input()
  hideEntityButton: boolean = false;

  @Input()
  entityButtonLabel: string = 'Primary';

  @Input()
  entityButtonCallback: () => void;

  constructor() {}

  ngOnInit(): void {}
}
