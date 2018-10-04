import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from '../services/clientes.service';

import { MatSnackBar } from '@angular/material';

import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';

import { ICliente } from '../models/cliente';
import { SalaryValidator } from './salary.validator';


@Component({
  selector: 'app-solicitud-credito',
  templateUrl: './solicitud-credito.component.html',
  styleUrls: ['./solicitud-credito.component.css']
})
export class SolicitudCreditoComponent implements OnInit {

  solicitudForm: FormGroup;
  clientesList: ICliente[];
  paramId: string;
  dummy: string = "";
  maxDate: Date = new Date();
  valiId: boolean = false;

  solicitud_validation_messages = {
    'id': [
      { type: 'required', message: 'Número de identificación requerido' },
      { type: 'pattern', message: 'Sólo puede ingresar números' },
    ],
    'companyName': [
      { type: 'required', message: 'Nombre de la empresa requerido' },
    ],
    'companyNIT': [
      { type: 'required', message: 'NIT de la empresa requerido' },
      { type: 'pattern', message: 'Sólo puede ingresar números' },
    ],
    'salary': [
      { type: 'required', message: 'Número de identificación requerido' },
      { type: 'pattern', message: 'Sólo puede ingresar números' },
      { type: 'validSalary', message: 'El salario debe ser entero positivo menor que 100000000' }
    ],
    'startDate': [
      { type: 'required', message: 'Fecha de nacimiento requerida' },
    ]
  }

  constructor(private clientesService: ClientesService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.paramId = params.get('id');
      if (this.paramId) {
        this.getClientes();
      } else {
        this.paramId = ""
      }
    });

    this.solicitudForm = new FormGroup({
      id: new FormControl(this.paramId, { validators: [Validators.required, Validators.pattern(/^[0-9]*$/)] }),
      companyName: new FormControl('', { validators: [Validators.required] }),
      companyNIT: new FormControl('', { validators: [Validators.required, Validators.pattern(/^[0-9]*$/)] }),
      salary: new FormControl('', { validators: [Validators.required, SalaryValidator.validSalary,  Validators.pattern(/^[0-9]*$/)] }),
      startDate: new FormControl('', { validators: [Validators.required] }),
    });

    this.maxDate.setDate(this.maxDate.getDay() - 1);
  }

  dialogPopUp() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dummy: this.dummy
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('registro');
      }
    });
  }


  getClientes() {
    this.clientesService.getClientes()
      .snapshotChanges()
      .subscribe(item => {
        this.clientesList = []
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.clientesList.push(x as ICliente);

        });

        let listClientes = this.clientesList.filter((cliente: ICliente) => (cliente.id == this.paramId));

        if (listClientes.length < 1) {
          this.dialogPopUp()
        } else {
          
        }

      })
  }

  isValid() {
    if (this.solicitudForm.valid && this.valiId)
      return true
    else
      return false;
  }

  searchId(id: string) {
    let listClientes = this.clientesList.filter((cliente: ICliente) => (cliente.id == id));

    if (listClientes.length < 1) {
      this.snackBar.open(`El usuario de ID ${id} no ha sido registrado aún!!!`, '', {
        duration: 1000,
      });
      this.valiId = false;
    } else {
      this.valiId = true;
    }
  }

}
