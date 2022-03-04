import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InterviewRoundModel } from 'src/app/job-board/models/interview-round.model';

@Component({
  selector: 'ahr-interview-round',
  template: `
    <mat-card (click)="onSelectRound()">
      <div class="card-header">
        <span>{{ round?.name }}</span>
        <span
          ><strong>Scheduled: </strong
          >{{ round?.scheduledAt | date: 'dd/MM/yyyy' }}</span
        >
      </div>

      <mat-card-actions>
        <div *ngIf="!(roundCompleted$ | async)" class="mark-completed">
          <button mat-flat-button color="primary" (click)="onRoundCompleted()">
            Mark as Completed
          </button>
        </div>

        <div *ngIf="roundCompleted$ | async" class="round-completed">
          <div class="round-feedback">
            <button mat-icon-button aria-label="Approve">
              <mat-icon>thumb_up_alt</mat-icon>
            </button>

            <button mat-icon-button aria-label="Decline">
              <mat-icon>thumb_down_alt</mat-icon>
            </button>
          </div>

          <button
            mat-icon-button
            aria-label="Undo"
            (click)="undoRoundCompleted()"
          >
            <mat-icon>undo</mat-icon>
          </button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./interview-round.component.scss'],
})
export class InterviewRoundComponent implements OnInit {
  @Input()
  round: InterviewRoundModel | null = null;

  @Output('roundSelected')
  roundSelectedEvent = new EventEmitter<InterviewRoundModel | null>();

  roundCompleted$ = new BehaviorSubject(false);

  constructor() {}

  ngOnInit(): void {}

  onRoundCompleted() {
    this.roundCompleted$.next(true);
  }

  undoRoundCompleted() {
    this.roundCompleted$.next(false);
  }

  onSelectRound() {
    this.roundSelectedEvent.emit(this.round);
  }
}
