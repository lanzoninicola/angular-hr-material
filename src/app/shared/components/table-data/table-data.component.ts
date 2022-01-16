import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';

import {
  TableColumn,
  TableColumnDataSourceFieldName,
} from '../../types/table.types';

@Component({
  selector: 'ahr-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit, OnDestroy {
  @Input()
  columns: TableColumn[] = [];

  @Input('dataSource')
  dataSource$: Observable<any[]>;

  @Input()
  pageSize: number = 5;

  @Output('onRowClicked')
  onRowClickedEvent: EventEmitter<any> = new EventEmitter();

  _dsSubscription: Subscription;

  columnsSchema$: BehaviorSubject<TableColumn[]> = new BehaviorSubject<
    TableColumn[]
  >([]);
  tableData$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  columnsFieldName$: BehaviorSubject<TableColumnDataSourceFieldName[]> =
    new BehaviorSubject<TableColumnDataSourceFieldName[]>([]);

  dataPaginated: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.columnsSchema$.next(this.columns);

    this.setDataSource();

    this.extractColumnsFieldNameFromSchema();
  }

  setDataSource() {
    this._dsSubscription = this.dataSource$.subscribe((dsData) =>
      this.tableData$.next(dsData)
    );
  }

  extractColumnsFieldNameFromSchema() {
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

  onRowClicked(rowData: {}) {
    this.onRowClickedEvent.emit(rowData);
  }

  ngOnDestroy(): void {
    this._dsSubscription.unsubscribe();
  }
}
