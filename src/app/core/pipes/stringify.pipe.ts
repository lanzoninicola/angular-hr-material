import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringify',
})
export class StringifyPipe implements PipeTransform {
  /**
   * @description
   * This pipe is used to display the value of a cell when the value is an object.
   *
   * @param value
   * @param args
   * @returns
   */
  transform(value: any, fieldname?: string | string[]): any {
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'object') {
      // fieldname => The entity-model property name that contains the information to render inside the cell

      if (fieldname === undefined) {
        throw `StringifyPipe - The field name '${fieldname}' to stringify is missing. What is the name of the column configuration that indicates the name of model prop to display? Now is ${value}`;
      }

      if (typeof fieldname === 'string') {
        return value[fieldname];
      }

      if (Array.isArray(fieldname)) {
        return fieldname.reduce((acc, curr) => {
          return acc[curr];
        }, value);
      }
    }

    return value;
  }
}
