import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ClientesService } from './services/clientes.service';

import { environment } from '../environments/environment';
import { SalaryValidator } from './solicitud-credito/salary.validator';
import { SolicitudCreditoComponent } from './solicitud-credito/solicitud-credito.component';
import { DialogComponent } from './solicitud-credito/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroClienteComponent,
    SolicitudCreditoComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatTooltipModule
  ],
  providers: [SalaryValidator, ClientesService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
