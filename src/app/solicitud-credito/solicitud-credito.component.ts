import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from '../services/clientes.service';

import { MatSnackBar } from '@angular/material';

import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';

import { SalaryValidator } from './salary.validator';

import { ICliente } from '../models/cliente';
import { ICredito } from '../models/credito';


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

  credito: ICredito = {    
    idCliente: "",
    companyName: "",
    companyNIT: "",
    salary: 0,
    approvedAmount: 0,
    startDate: null
  };

  solicitud_validation_messages = {
    'idCliente': [
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
      idCliente: new FormControl(this.paramId, { validators: [Validators.required, Validators.pattern(/^[0-9]*$/)] }),
      companyName: new FormControl('', { validators: [Validators.required] }),
      companyNIT: new FormControl('', { validators: [Validators.required, Validators.pattern(/^[0-9]*$/)] }),
      salary: new FormControl('', { validators: [Validators.required, SalaryValidator.validSalary, Validators.pattern(/^[0-9]*$/)] }),
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

  onSubmit() {

    let currDate: Date = new Date();
    let selectedDate: Date = new Date(this.solicitudForm.get('startDate').value);

    if (this.date_diff_indays(selectedDate, currDate) >= 548) {
      if (this.solicitudForm.get('salary').value > 800000) {

        if (this.solicitudForm.get('salary').value > 800000 && this.solicitudForm.get('salary').value < 1000000) {
          this.credito.approvedAmount = 5000000;
        } else if (this.solicitudForm.get('salary').value >= 1000001 && this.solicitudForm.get('salary').value < 4000000) {
          this.credito.approvedAmount = 20000000;
        } else if (this.solicitudForm.get('salary').value >= 4000000) {
          this.credito.approvedAmount = 50000000;
        }

        this.credito.idCliente = this.solicitudForm.get('idCliente').value;
        this.credito.companyName = this.solicitudForm.get('companyName').value;
        this.credito.companyNIT = this.solicitudForm.get('companyNIT').value;
        this.credito.salary = this.solicitudForm.get('salary').value;
        this.credito.startDate = this.solicitudForm.get('startDate').value;

        let res = this.clientesService.createCredito({ ...this.credito });
        res.then(r => {
          if (r.key != null && r.key != "") {
            this.snackBar.open(`Usuario de ID ${this.credito.idCliente} registrado satisfactoriamente!!!!`, '', {
              duration: 2000,
            });
          }
        });

      } else {
        this.snackBar.open(`Debe tener un salario mayor a $800.000 para poder ser aprobado!!!`, '', {
          duration: 1000,
        });
      }
    } else {
      this.snackBar.open(`Debe llevar trabajando para la empresa más de año y medio para poder ser aprobado!!!`, '', {
        duration: 1000,
      });
    }
  }

  date_diff_indays(date1: Date, date2: Date) {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }
}
