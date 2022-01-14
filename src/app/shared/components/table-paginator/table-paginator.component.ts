import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'ahr-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss'],
})
export class TablePaginatorComponent implements OnInit {
  @Input()
  pageSize: number = 5;
  @Input('dataSource')
  tableDataSource$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  @Output('dataOnPage')
  dataOnPageEvent: EventEmitter<any[]> = new EventEmitter();

  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(this.pageSize);
  // dataOnPage$ = new BehaviorSubject<any[]>([]);

  constructor() {}

  ngOnInit() {
    combineLatest([
      this.tableDataSource$,
      this.currentPage$,
      this.pageSize$,
    ]).subscribe(([allSources, currentPage, pageSize]) => {
      const startingIndex = (currentPage - 1) * pageSize;
      const onPage = allSources.slice(startingIndex, startingIndex + pageSize);
      // this.dataOnPage$.next(onPage);
      this.dataOnPageEvent.emit(onPage);
    });
  }

  onPageChaged(pageEvent: PageEvent) {
    const { pageIndex } = pageEvent;
    this.currentPage$.next(pageIndex + 1);
  }
}
