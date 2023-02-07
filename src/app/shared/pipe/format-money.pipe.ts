import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMoney'
})
export class FormatMoneyPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return '₦' + value.toLocaleString();
  }

}
