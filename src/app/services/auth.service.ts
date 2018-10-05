import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from '../models/auth-data';
import { ClientesService } from './clientes.service';

@Injectable()
export class AuthService {

    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private clientesService: ClientesService) {

    }

    initAuthListener() { 
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/clientesList']);
            } else {
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        });
    }
  


    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
            ).then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }

    logout() {
        this.afAuth.auth.signOut();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccesfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
