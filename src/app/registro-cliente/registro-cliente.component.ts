import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientesService } from '../services/clientes.service';
import { MatSlideToggleModule } from '@angular/material';

import { IdValidator } from './id.validator';
import { MatSnackBar } from '@angular/material';

import { ICliente } from '../models/cliente';
@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  clienteForm: FormGroup;
  maxDate;
  maxDateHD;
  valiId;

  account_validation_messages = {
    'id': [
      { type: 'required', message: 'Número de identificación requerido' },
      { type: 'pattern', message: 'Sólo puede ingresar números' },
      { type: 'validId', message: 'Your username has already been taken' }
    ],
    'fullName': [
      { type: 'required', message: 'Nombres y apellidos requeridos' },
      { type: 'pattern', message: 'Caracter inválido' },
    ]
  }
  constructor(private clientesService: ClientesService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDateHD = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.maxDateHD.setFullYear(this.maxDateHD.getFullYear());

    this.clienteForm = new FormGroup({
      id: new FormControl('', { validators: [Validators.required, Validators.pattern(/^[0-9]*$/)] }),
      fullName: new FormControl('', { validators: [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)] }),
      //DoB: new FormControl('', { validators: [Validators.required] }),
    });
  }

  searchId(id: any) {
    console.log(id);
    this.clientesService.getCliente(id).subscribe(
      result => {
        if (result != null) {
          this.snackBar.open('Usuario exise');
          this.valiId = false;
        } else {
          this.snackBar.open('Usuario disponible');
          this.valiId = true;
        }
      }
    );

  }

  isValid() {
    if (this.clienteForm.valid && this.valiId) 
      return true
    else
      return false;
  }

}
