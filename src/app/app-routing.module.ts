import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';

const routes: Routes = [
    { path: '', component: RegistroClienteComponent },
    { path: 'registro', component: RegistroClienteComponent },
/*     { path: 'userlist', component: EmployeesComponent},
    { path: 'edituser/:id/:id2', component: EmployeeEditComponent },  
    { path: 'edituser/:id', component: EmployeeEditComponent },   */  
    { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {

}