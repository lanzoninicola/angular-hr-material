import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { TableColumn } from '../../types/table.types';

@Component({
  selector: 'ahr-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  @Input('config')
  tableConfig: {
    dataSource: Array<{}>;
    columns: Array<{
      title: string;
      dsFieldName: string;
    }>;
    pageSize: number;
  } = {
    dataSource: [],
    columns: [],
    pageSize: 10,
  };

  dataSource$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dataPaginated: any[] = [];
  tableColumns$: BehaviorSubject<TableColumn[]> = new BehaviorSubject<
    TableColumn[]
  >([]);
  displayedColumns$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  constructor() {}

  ngOnInit(): void {
    this.dataSource$.next(this.tableConfig.dataSource);
    this.tableColumns$.next(this.tableConfig.columns);

    this.tableColumns$
      .pipe(
        map((cDataConfig: any) => {
          return cDataConfig.map((c: any) => c.dsFieldName);
        })
      )
      .subscribe((data) => {
        this.displayedColumns$.next(data);
      });
  }

  handleTableRowClicked(data: any) {}
}
