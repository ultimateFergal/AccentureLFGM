import { FormControl } from '@angular/forms';


export class SalaryValidator {

    static validSalary(fc: FormControl) {

        if(Number(fc.value) < 0 || Number.isInteger(fc.value) || Number(fc.value) > 100000000){
            return ({validSalary: true});
          } else {
            return (null);
          }
    }
}