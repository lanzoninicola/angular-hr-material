import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';

import { SearchService } from '../../services/search.service';
import { TableDataService } from '../../services/table-data.service';
import { TableColumns } from '../../types/table.types';

// TODO: styling buttons in paginator. Maybe with a directive
// https://stackoverflow.com/questions/53646259/how-to-customize-mat-paginator-in-angular-material

@Component({
  selector: 'ahr2-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit, OnDestroy {
  @Input()
  columns: TableColumns;

  @Input('dataSource')
  dataSource$: Observable<any[]>;

  @Output('onRowClicked')
  onRowClickedEvent: EventEmitter<any> = new EventEmitter();

  private _componentSubscription = new Subscription();
  tableDataSource$ = new BehaviorSubject<any[]>([]);
  displayedColumns$ = new BehaviorSubject<string[]>([]);

  // Paginator props
  pageEvent: PageEvent;
  dataOnPage$ = new BehaviorSubject<any[]>([]);
  pageSize$ = new BehaviorSubject<number>(10);
  currentPage$ = new BehaviorSubject<number>(1);

  constructor(
    private _tableService: TableDataService,
    private _searchService: SearchService
  ) {}

  ngOnInit(): void {
    this._setupTableData();

    this._setupColumns();

    this._setupPaginator();

    this._setupSearch();
  }

  ngOnDestroy(): void {
    this._componentSubscription.unsubscribe();
    this._tableService.destroyColumns();
  }

  onClickRow(rowData: {}) {
    this.onRowClickedEvent.emit(rowData);
  }

  onChangePage(event: PageEvent) {
    this.currentPage$.next(event.pageIndex + 1);
  }

  private _setupTableData() {
    this._componentSubscription.add(
      this.dataSource$.subscribe((data) => this.tableDataSource$.next(data))
    );
  }

  private _setupColumns() {
    this._tableService.loadColumns(this.columns);
    this.displayedColumns$.next(this._tableService.columnfields);
  }

  private _setupPaginator() {
    combineLatest([
      this.tableDataSource$,
      this.currentPage$,
      this.pageSize$,
    ]).subscribe(([allSources, currentPage, pageSize]) => {
      const startingIndex = (currentPage - 1) * pageSize;
      const onPage = allSources.slice(startingIndex, startingIndex + pageSize);
      this.dataOnPage$.next(onPage);
    });
  }

  private _setupSearch() {
    this._componentSubscription.add(
      this._searchService
        .addListener(this.dataSource$)
        .subscribe((dataFiltered) => {
          this.tableDataSource$.next(dataFiltered);
          this.dataOnPage$.next(dataFiltered);
        })
    );
  }
}

//TODO: When the input is cleared the table is not paginated correctly
