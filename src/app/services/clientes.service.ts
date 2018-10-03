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

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientesList: AngularFireList<any>;
  selectedCliente: ICliente;
  selectedClienteed: any;

  constructor(private firebaseDB: AngularFireDatabase, private http: Http) { }

  getClientes() {
    return this.clientesList = this.firebaseDB.list('clientes');
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

    this.clientesList.push({
      name: cliente.name,
      dateOfBirth: cliente.dateOfBirth.toDateString(),
      id: cliente.id,
      tipoId: cliente.tipoId
    });
  }

  updateCliente(cliente: ICliente) {
    if (!this.clientesList) {
      this.clientesList = this.getClientes();
    }

    this.clientesList.update(cliente.$key, {
      name: cliente.name,
      dateOfBirth: cliente.dateOfBirth,
      id: cliente.id,
      tipoId: cliente.tipoId
    });
  }

  deleteCliente($key: string) {
    this.clientesList.remove($key);
  }

 

  private extractData(response: Response) {
    //let body = response.json();
    let body = <any[]>response.json();
    //console.log(body);
    //return body.data || {};
    return body || {};
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
