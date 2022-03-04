import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ahr-interview-questions',
  template: `
    <div>
      <button
        mat-flat-button
        color="primary"
        (click)="onShowTechnicalQuestion()"
      >
        Load Technical Questions
      </button>
    </div>
  `,
  styleUrls: ['./interview-questions.component.scss'],
})
export class InterviewQuestionsComponent implements OnInit {
  showTechnicalQuestion$ = new BehaviorSubject(false);

  constructor() {}

  ngOnInit(): void {}

  onShowTechnicalQuestion() {
    this.showTechnicalQuestion$.next(!this.showTechnicalQuestion$.value);
  }
}
