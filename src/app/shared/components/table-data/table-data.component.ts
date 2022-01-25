import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Subscription } from 'rxjs';

import {
  TableColumn,
  TableColumnDataSourceFieldName,
} from '../../types/table.types';

@Component({
  selector: 'ahr-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  @Input()
  columns: TableColumn[] = [];

  @Input('dataSource')
  dataSource$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  @Input()
  pageSize: number = 5;

  @Output('onRowClicked')
  onRowClickedEvent: EventEmitter<any> = new EventEmitter();

  columnsSchema$: BehaviorSubject<TableColumn[]> = new BehaviorSubject<
    TableColumn[]
  >([]);
  columnsFieldName$: BehaviorSubject<TableColumnDataSourceFieldName[]> =
    new BehaviorSubject<TableColumnDataSourceFieldName[]>([]);

  dataPaginated$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {}

  ngOnInit(): void {
    this.columnsSchema$.next(this.columns);
    this._extractColumnsFieldNameFromSchema();
  }

  onRowClicked(rowData: {}) {
    this.onRowClickedEvent.emit(rowData);
  }

  dataOnPage(event: any[]) {
    console.log(event);
    this.dataPaginated$.next(event);
  }

  private _extractColumnsFieldNameFromSchema() {
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
}
