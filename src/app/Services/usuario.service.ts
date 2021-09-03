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
  //getUsuario(id: number): Observable<Usuario> {
    // TODO: send the message _after_ fetching the hero
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    //return of(USUARIOS.find(hero => hero.id === id));
  //}
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