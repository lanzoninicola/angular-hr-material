import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-section-toolbar',
  templateUrl: './section-toolbar.component.html',
  styleUrls: ['./section-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionToolbarComponent implements OnInit {
  @Input() title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
