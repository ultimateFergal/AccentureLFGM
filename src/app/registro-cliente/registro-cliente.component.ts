import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientesService } from '../services/clientes.service';

import { MatSnackBar } from '@angular/material';

import { ICliente } from '../models/cliente';
@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  clienteForm: FormGroup;
  clientesList: ICliente[];
  credito: boolean = false;
  valiId: boolean;
  maxDate;
  maxDateHD;
  cliente: ICliente = {
    id: "",
    fullName: "",
    dateOfBirth: null
  };

  cliente_validation_messages = {
    'id': [
      { type: 'required', message: 'Número de identificación requerido' },
      { type: 'pattern', message: 'Sólo puede ingresar números' },
      { type: 'validId', message: 'Your username has already been taken' }
    ],
    'fullName': [
      { type: 'required', message: 'Nombres y apellidos requeridos' },
      { type: 'pattern', message: 'Caracter inválido' },
    ],
    'dateOfBirth': [
      { type: 'required', message: 'Fecha de nacimiento requerida' },
    ]
  }

  constructor(private clientesService: ClientesService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.getClientes();

    this.maxDate = new Date();
    this.maxDateHD = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.maxDateHD.setFullYear(this.maxDateHD.getFullYear());

    this.clienteForm = new FormGroup({
      id: new FormControl('', { validators: [Validators.required, Validators.pattern(/^[0-9]*$/)] }),
      fullName: new FormControl('', { validators: [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)] }),
      dateOfBirth: new FormControl('', { validators: [Validators.required] }),
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
        })
      })
  }

  searchId(id: string) {

    let listClientes = this.clientesList.filter((cliente: ICliente) => (cliente.id == id));

    if (listClientes.length > 0) {
      this.snackBar.open(`El usuario de ID ${id} ya existe!!!`, '', {
        duration: 1000,
      });
      this.valiId = false;
    } else {
      this.valiId = true;
    }
  }

  isValid() {
    if (this.clienteForm.valid && this.valiId)
      return true
    else
      return false;
  }

  onSubmit() {
    this.cliente.id = this.clienteForm.get('id').value;
    this.cliente.fullName = this.clienteForm.get('fullName').value;
    this.cliente.dateOfBirth = this.clienteForm.get('dateOfBirth').value;

    let res = this.clientesService.createCliente({ ...this.cliente });
    res.then(r => {
      if (r.key != null && r.key != "") {
        this.snackBar.open(`Usuario de ID ${this.cliente.id} registrado satisfactoriamente!!!!`, '', {
          duration: 2000,
        });
        this.credito = true;
      }
    });
  }

}
