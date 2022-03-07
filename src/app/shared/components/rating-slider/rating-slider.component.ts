import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

type SliderStatus = 'invalid' | 'valid';

@Component({
  selector: 'ahr-rating-slider',
  template: `
    <div class="slider-container">
      <div class="rating-slider-container">
        <label *ngIf="ratingLabel !== ''">{{ ratingLabel }}</label>
        <div class="rating">
          <span class="range-label max">{{ minRating }}</span>
          <mat-slider
            [max]="maxRating"
            [min]="minRating"
            [step]="1"
            [thumbLabel]="thumbLabel"
            [tickInterval]="'auto'"
            (change)="onRatingChange($event)"
            aria-labelledby="rating"
          >
          </mat-slider>
          <span class="range-label min">{{ maxRating }}</span>
        </div>
      </div>
      <!-- <div class="label-rate">
        <label id="name-label" class="name-label">Current Rating</label>
        <label class="value-label">{{ currentScore | async }}</label>
      </div> -->
    </div>
  `,
  styleUrls: ['./rating-slider.component.scss'],
})
export class RatingSliderComponent implements OnInit, OnDestroy {
  @Input()
  minRating: number = 1;

  @Input()
  maxRating: number = 5;

  @Input()
  thumbLabel: boolean = true;

  @Input()
  ratingLabel = '';

  @Output('ratingChanges')
  valueChangesEvent = new EventEmitter<number | null>();

  @Output('statusChanges')
  statusChangesEvent = new EventEmitter<SliderStatus>();

  constructor() {}

  ngOnInit(): void {
    this.statusChangesEvent.emit('invalid');
  }

  ngOnDestroy(): void {}

  onRatingChange(event: MatSliderChange) {
    const { value } = event;

    this.valueChangesEvent.emit(value);
    this.statusChangesEvent.emit('valid');
  }
}
