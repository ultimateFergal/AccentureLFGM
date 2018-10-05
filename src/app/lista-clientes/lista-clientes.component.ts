
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import { ClientesService } from '../services/clientes.service';

import { ICliente } from '../models/cliente';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'fullName', 'age', 'dateOfBirth']; // Display order
  dataSource = new MatTableDataSource<ICliente>();

  @ViewChild(MatSort) sort: MatSort; // Access to the set up of the table
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientesService: ClientesService, private router: Router) { }

  clientesList: ICliente[];

  ngOnInit() {   

    this.clientesService.getClientes()
      .snapshotChanges()
      .subscribe(item => {
        this.clientesList = []
        item.forEach( element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.clientesList.push( x as ICliente);
          this.dataSource.data = this.clientesList;
        })
      })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
