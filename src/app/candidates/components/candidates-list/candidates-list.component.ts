import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SearchService } from 'src/app/shared/services/search.service';
import { CandidatesService } from '../../services/candidates.service';
import { CandidateModel } from '../../types/candidates.types';

@Component({
  selector: 'ahr-candidates-list',
  template: `
    <div class="container">
      <ahr-table-data
        [dataSource]="tableDataSource$"
        [columns]="columns"
        (onRowClicked)="handleTableRowClicked($event)"
      ></ahr-table-data>
    </div>
  `,
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent implements OnInit {
  candidateList$: Observable<CandidateModel[]>;

  tableDataSource$: BehaviorSubject<CandidateModel[]> = new BehaviorSubject<
    CandidateModel[]
  >([]);

  tableDataSourceSubscription: Subscription;
  columns = [
    {
      title: 'Lastname',
      dsFieldName: 'lastname',
    },
    {
      title: 'Firstname',
      dsFieldName: 'firstname',
    },
    {
      title: 'E-mail',
      dsFieldName: 'email',
    },
  ];

  constructor(
    private _candidatesService: CandidatesService,
    private router: Router,
    private _searchService: SearchService
  ) {}

  ngOnInit() {
    this.candidateList$ = this._candidatesService.findAll();

    this._prepareTableDataSource();

    this._handleSearch();
  }

  handleTableRowClicked(userRow: CandidateModel) {
    this.router.navigate(['candidates', userRow.id]);
  }

  ngOnDestroy() {
    this.tableDataSourceSubscription.unsubscribe();
  }

  private _prepareTableDataSource() {
    this.tableDataSourceSubscription = this.candidateList$.subscribe(
      (candidatesData) => {
        this.tableDataSource$.next(candidatesData);
      }
    );
  }

  private _handleSearch(): void {
    this.tableDataSourceSubscription = this._searchService
      .setupData(this.candidateList$)
      .subscribe((dataFiltered) => {
        this.tableDataSource$.next(dataFiltered);
      });
  }
}
