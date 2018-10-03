import { FormControl } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class IdValidator {

    constructor(private clientesService: ClientesService) { }

    public validId(fc: FormControl) {
        this.clientesService.getCliente(fc.value).subscribe(
            result => {
                if (result != null) {
                    console.log("jodido1");
                    return ({ validId: true });
                } else {
                    console.log("jodido2");
                    return null;
                }
            }
        )
    }
}