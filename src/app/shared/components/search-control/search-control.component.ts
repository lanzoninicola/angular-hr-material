import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'ahr-search-control',
  template: `
    <div class="ahr-search-control" [formGroup]="searchFormGroup">
      <input
        matInput
        type="text"
        placeholder="Search..."
        formControlName="formControl"
      />
      <div class="ahr-search-input-icons">
        <mat-icon *ngIf="searchValue === ''">search</mat-icon>

        <button
          *ngIf="searchValue !== ''"
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="searchValue = ''"
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./search-control.component.scss'],
})
export class SearchControlComponent implements OnInit, OnDestroy {
  @Input()
  dataSet$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  formControlSubscription: Subscription;

  searchValue: string;
  searchFormGroup: FormGroup;
  formControl: FormControl = new FormControl('');

  constructor(private _searchService: SearchService) {}

  ngOnInit() {
    this._buildFormModel();

    this._setupSearchService();

    this._onSearchInputChanged();
  }

  ngOnDestroy() {
    this.formControlSubscription.unsubscribe();
  }

  private _setupSearchService(): void {
    this._searchService.setupControl(this.formControl);

    this._searchService.addListener();
  }

  private _buildFormModel(): void {
    this.searchFormGroup = new FormGroup({
      formControl: this.formControl,
    });
  }

  private _onSearchInputChanged(): void {
    this.formControlSubscription = this.formControl.valueChanges.subscribe(
      (value) => {
        this.searchValue = value;
      }
    );
  }
}
