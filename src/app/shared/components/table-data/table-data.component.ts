import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { SearchService } from '../../services/search.service';

import {
  TableColumn,
  TableColumnDataSourceFieldName,
} from '../../types/table.types';

// TODO: styling buttons in paginator. Maybe with a directive
// https://stackoverflow.com/questions/53646259/how-to-customize-mat-paginator-in-angular-material

@Component({
  selector: 'ahr-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  @Input()
  columns: TableColumn[] = [];

  @Input('dataSource')
  tableDataSource$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  @Output('onRowClicked')
  onRowClickedEvent: EventEmitter<any> = new EventEmitter();

  columnsSchema$: BehaviorSubject<TableColumn[]> = new BehaviorSubject<
    TableColumn[]
  >([]);
  columnsFieldName$: BehaviorSubject<TableColumnDataSourceFieldName[]> =
    new BehaviorSubject<TableColumnDataSourceFieldName[]>([]);

  pageEvent: PageEvent;
  pageSize$ = new BehaviorSubject<number>(10);
  currentPage$ = new BehaviorSubject<number>(1);
  dataOnPage$ = new BehaviorSubject<any[]>([]);

  constructor(private _searchService: SearchService) {}

  ngOnInit(): void {
    this._handleTableColumns();

    this._handlePaginator();
  }

  onRowClicked(rowData: {}) {
    this.onRowClickedEvent.emit(rowData);
  }

  onPageChange(event: PageEvent) {
    this.currentPage$.next(event.pageIndex + 1);
  }

  private _handleTableColumns() {
    this.columnsSchema$.next(this.columns);

    this.columnsSchema$
      .pipe(
        map((cSchema: TableColumn[]) => {
          return cSchema.map((c: TableColumn) => c.dsFieldName);
        })
      )
      .subscribe((data: TableColumnDataSourceFieldName[]) => {
        this.columnsFieldName$.next(data);
      });
  }

  private _handlePaginator() {
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
}
