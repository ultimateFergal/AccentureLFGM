import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

import { ClientesService } from '../services/clientes.service';

import { ICredito } from '../models/credito';

@Component({
  selector: 'app-lista-creditos',
  templateUrl: './lista-creditos.component.html',
  styleUrls: ['./lista-creditos.component.css']
})
export class ListaCreditosComponent implements OnInit {

  displayedColumns = ['idCliente', 'companyName', 'companyNIT', 'salary', 'startDate', 'approvedAmount']; // Display order
  dataSource = new MatTableDataSource<ICredito>();

  @ViewChild(MatSort) sort: MatSort; 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientesService: ClientesService, private router: Router) { }

  creditosList: ICredito[];

  ngOnInit() {   

    this.clientesService.getCreditos()
      .snapshotChanges()
      .subscribe(item => {
        this.creditosList = []
        item.forEach( element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.creditosList.push( x as ICredito);
          this.dataSource.data = this.creditosList;
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
