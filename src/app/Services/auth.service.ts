import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { variablesGlobales } from "./variablesGlobales";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
        private router: Router) {
    }

    getActualUser() {
        return localStorage.getItem("actualUser");
    }

    getUserName(){
        return localStorage.getItem("usuario");
    }

    setActualUser(id: string) {
        localStorage.setItem("actualUser", id);
    }
    
    registerUser(cedula, nombre, apellido, password) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/nuevo', {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            contrasenia: password,
            admin: false,
        }, {headers:variablesGlobales.getHeader()}
        );
    }

    loginUser(cedula, password) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/login', {
            cedula: cedula,
            contrasenia: password,
        }, {headers:variablesGlobales.getHeader()}
        );
    }
    
    getUser() {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/detalle', {
            id: this.getActualUser(),
        }, {headers:variablesGlobales.getHeader()}
        );
    }

    loggedIn() {
        return !!localStorage.getItem("token");
    }

    isAdmin() {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/verify', {
            id: this.getActualUser(),
        }, {headers:variablesGlobales.getHeader()}
        );
    }

    getToken() {
        return localStorage.getItem("token");
    }

    updateUser(cedula, nombre, apellido) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/update', {
            id: this.getActualUser(),
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
        }, {headers:variablesGlobales.getHeader()}
        );
    }

    updateContrasenia(actual, contrasenia) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/updatePassword', {
            id: this.getActualUser(),
            actual: actual,
            contrasenia: contrasenia,
        }, {headers:variablesGlobales.getHeader()}
        );
    }

    eliminarUsuario() {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/delete', {
            id: this.getActualUser(),
        }, {headers:variablesGlobales.getHeader()}
        );
    }

    logOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("actualUser");
        this.router.navigate(['/inicio']);
    }
}
