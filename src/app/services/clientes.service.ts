import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ICliente } from '../models/cliente';
import { ICredito } from '../models/credito';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientesList: AngularFireList<any>;
  creditosList: AngularFireList<any>;
  selectedCliente: ICliente;
  selectedClienteed: any;

  constructor(private firebaseDB: AngularFireDatabase ) { }

  getClientes() {
    return this.clientesList = this.firebaseDB.list('clientes');
  }

  getCreditos() {
    return this.creditosList = this.firebaseDB.list('creditos');
  }

  getCliente(key: any): any {
    return this.firebaseDB.object('/clientes/' + key).valueChanges()
    /*     .subscribe(item => {
            console.log(item);
            return item;
          }); */
  }

  createCliente(cliente: ICliente) {
    if (!this.clientesList) {
      this.clientesList = this.getClientes();
    }

    return this.clientesList.push({
      fullName: cliente.fullName,
      dateOfBirth: cliente.dateOfBirth.toDateString(),
      id: cliente.id
    }).then(resp => { return resp });
  }

  createCredito(credito: ICredito) {
    if (!this.creditosList) {
      this.creditosList = this.getCreditos();
    }

    return this.creditosList.push({
      idCliente: credito.idCliente,
      companyName: credito.companyName,
      companyNIT: credito.companyNIT,
      salary: credito.salary,
      approvedAmount: credito.approvedAmount,
      startDate: credito.startDate.toDateString(),
    }).then(resp => { return resp });
  }

  private extractData(response: Response) {
    //let body = response.json();
    let body = <any[]>response.json();
    //return body.data || {};
    return body || {};
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
