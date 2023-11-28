import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): Array<number> {
    return Array(value);
  }

}
