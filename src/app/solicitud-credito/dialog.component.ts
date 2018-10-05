import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog',
    template: `<h1 *ngIf="!passedData.dummy" mat-dialog-title>Cliente no registrado</h1>
                <h1 *ngIf="passedData.dummy" mat-dialog-title>Crédito aprovado</h1>
                <mat-dialog-content>
                    <p *ngIf="passedData.dummy">Al cliente de ID {{ passedData.idCliente }} 
                    se le ha aprobado un crédito por $ {{ passedData.approvedAmount }}  </p>
                    <p *ngIf="!passedData.dummy">Usuario no registrado, desea registralo? </p>
                </mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-button [mat-dialog-close]="true">Ok</button>
                    <button *ngIf="!passedData.dummy" mat-button [mat-dialog-close]="false">No</button>
                </mat-dialog-actions>`
})

export class DialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}

}