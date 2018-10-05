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
import { AuthService } from './services/auth.service';

import { environment } from '../environments/environment';
import { SalaryValidator } from './solicitud-credito/salary.validator';
import { SolicitudCreditoComponent } from './solicitud-credito/solicitud-credito.component';
import { DialogComponent } from './solicitud-credito/dialog.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { UserAgePipe } from './user-age.pipe';
import { ListaCreditosComponent } from './lista-creditos/lista-creditos.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent,
    RegistroClienteComponent,
    SolicitudCreditoComponent,
    DialogComponent,
    HeaderComponent,
    SidenavListComponent,
    ListaClientesComponent,
    UserAgePipe,
    ListaCreditosComponent,
    LoginComponent
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
    MatTooltipModule,
    AngularFireAuthModule
  ],
  providers: [SalaryValidator, ClientesService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
