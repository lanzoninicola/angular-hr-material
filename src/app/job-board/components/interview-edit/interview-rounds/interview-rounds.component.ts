import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InterviewRoundModel } from 'src/app/job-board/models/interview-round.model';
import { InterviewRoundService } from 'src/app/job-board/services/interview-round.service';

@Component({
  selector: 'ahr-interview-rounds',
  template: `
    <div class="interview-rounds">
      <div class="col interview-round-list">
        <div class="round-list-container">
          <div class="round-list-wrapper">
            <ng-container *ngFor="let round of currentInterviewRounds$ | async">
              <ahr-interview-round
                [round]="round"
                (roundSelected)="onSelectRound($event)"
              ></ahr-interview-round>
            </ng-container>
          </div>
        </div>
      </div>

      <div class="col interview-round-details">
        <ng-container *ngIf="roundSelected$ | async; else no_round_selected">
          <div class="round-list-header">
            <h3>
              <span><strong>Round: </strong></span>
              <strong>{{ (roundSelected$ | async)?.name }}</strong>
            </h3>
          </div>
          <ahr-interview-round-details></ahr-interview-round-details>
        </ng-container>

        <ng-template #no_round_selected>
          <div class="no-round-selected">
            <span
              >No round selected. Please select a round on the left side.</span
            >
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./interview-rounds.component.scss'],
})
export class InterviewRoundsComponent implements OnInit {
  currentInterviewRounds$ = new BehaviorSubject<InterviewRoundModel[]>([]);
  roundSelected$ = new BehaviorSubject<InterviewRoundModel | null>(null);

  constructor(private _dataService: InterviewRoundService) {}

  ngOnInit(): void {
    console.log(this.currentInterviewRounds$.value);

    this._loadAllRounds();

    this.roundSelected$ = this._dataService.stateInterviewRoundSelected$;
  }

  onSelectRound(round: InterviewRoundModel | null) {
    this._dataService.stateInterviewRoundSelected$.next(round);
  }

  private _loadAllRounds() {
    this.currentInterviewRounds$ =
      this._dataService.stateCurrentInterviewRounds$;
  }
}
