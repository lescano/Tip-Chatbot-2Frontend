import { Injectable } from '@angular/core';
import { Usuario } from '../Clases/usuario';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { variablesGlobales } from './variablesGlobales';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(private http: HttpClient,
        private authService: AuthService) { }

    addAdminUser(idUser, newAdminValue) {
        let currentUser =  this.authService.getActualUser();
        console.log(currentUser);
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/addAdminUser', { idUser: idUser, currentUser: currentUser, newAdminValue: newAdminValue });
    }

    getUsuarios() {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/listado', {});
    }

    borrarUsuario(id) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/delete', {
            id: id,
        });
    }

    getUsuario(cedula) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/detalleC', {
            cedula: cedula,
        });
    }
    updateEstadoAsignatura(id, estado) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/updateUA', {
            id: id,
            estado: estado
        });
    }
    borrarEstadoAsignatura(id) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/usuarioAsignaturaDelete', {
            id: id
        });
    }
    nuevoEstadoAsignatura(id, estado) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/asignaturaNuevo', {
            idUser: this.authService.getActualUser(),
            idAsig: id,
            estado: estado
        });
    }
    getUsuarioAsignatura(id) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/detalleUA', {
            id: id,
        });
    }

    //traer cuales son las materias (previas) que le falta aprobar al usuario para poder cursar otra
    getAsignaturasPendientes(id, codigo_asignatura) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/pendientes', {
            id: id,
            codigo: codigo_asignatura
        });
    }

    verificarUsuarioTelegram(idusuario, activotelegram) {
        return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/verifyTelegram', {
            id: idusuario,
            activo_telegram: activotelegram,
            frontend: true
        });
    }
}
