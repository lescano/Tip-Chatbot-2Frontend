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
  
  constructor( private http: HttpClient,
    private authService:AuthService) { }

  getUsuarios(){
    return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/listado', {});
  }

  borrarUsuario(id){
    return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/delete', {
      id:id,
      });
  }

  //busco un usuario por cedula
  getUsuario(cedula){ 
    return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/detalleC', {
      cedula: cedula,
      });
  }
  updateEstadoAsignatura(id,estado){
    return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/updateUA', {
      id:id,
      estado:estado
      });
  }
  borrarEstadoAsignatura(id){
    return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/usuarioAsignaturaDelete', {
      id:id
      });
  }
  nuevoEstadoAsignatura(id,estado){
    return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/asignaturaNuevo', {
      idUser:this.authService.getActualUser(),
      idAsig:id,
      estado:estado
      });
  }
  getUsuarioAsignatura(id){      //pedir un usuarioasignatura especifico
    return this.http.post<any>(variablesGlobales.getHttpUrl() + 'usuario/detalleUA', {
      id:id,
      });
  }

}
