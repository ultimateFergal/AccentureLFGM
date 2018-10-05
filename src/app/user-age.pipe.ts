import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userAge'
})
export class UserAgePipe implements PipeTransform {

  transform(value: string): any {
    const valueDate: Date = new Date(value);
    const curentDate: Date = new Date();
    return (curentDate.getFullYear() - valueDate.getFullYear()) === NaN ? "Sin edad" : (curentDate.getFullYear() - valueDate.getFullYear());
  }

}