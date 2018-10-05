import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { SolicitudCreditoComponent } from './solicitud-credito/solicitud-credito.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ListaCreditosComponent } from './lista-creditos/lista-creditos.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    { path: '', component: RegistroClienteComponent },
    { path: 'registro', component: RegistroClienteComponent },
    { path: 'solicitud', component: SolicitudCreditoComponent },
    { path: 'solicitud/:id', component: SolicitudCreditoComponent },
    { path: 'listaClientes', component: ListaClientesComponent, canActivate: [AuthGuard] },
    { path: 'listaCreditos', component: ListaCreditosComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
/*     { path: 'userlist', component: EmployeesComponent},
    { path: 'edituser/:id/:id2', component: EmployeeEditComponent },  
    { path: 'edituser/:id', component: EmployeeEditComponent },   */  
    { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {

}