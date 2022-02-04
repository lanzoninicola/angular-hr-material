import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from 'src/app/core/services/date.service';

@Pipe({
  name: 'tableDataCellDate',
})
export class TableDataCellDatePipe implements PipeTransform {
  constructor(private _dateService: DateService) {}

  transform(value: Date): any {
    if (value instanceof Date) {
      return this._dateService.getDate(value);
    }

    return value;
  }
}
