import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest } from 'rxjs';

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
  tableDataSource$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  @Output('onRowClicked')
  onRowClickedEvent: EventEmitter<any> = new EventEmitter();

  displayedColumns$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  pageEvent: PageEvent;
  pageSize$ = new BehaviorSubject<number>(10);
  currentPage$ = new BehaviorSubject<number>(1);
  dataOnPage$ = new BehaviorSubject<any[]>([]);

  constructor(
    private _tableService: TableDataService,
    private _searchService: SearchService
  ) {}

  ngOnInit(): void {
    this._setupColumns();

    this._setupPaginator();

    this._setupSearch();
  }

  ngOnDestroy(): void {
    this._tableService.destroyColumns();
  }

  onClickRow(rowData: {}) {
    this.onRowClickedEvent.emit(rowData);
  }

  onChangePage(event: PageEvent) {
    this.currentPage$.next(event.pageIndex + 1);
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
    this._searchService
      .addListener(this.tableDataSource$)
      .subscribe((dataFiltered) => {
        this.dataOnPage$.next(dataFiltered);
      });
  }
}
