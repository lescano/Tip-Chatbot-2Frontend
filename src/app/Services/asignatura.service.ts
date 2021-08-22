import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  //private httpUrl = 'http://localhost:8080/';
  private httpUrl = 'https://chatbot-tip-backend.herokuapp.com/';
  constructor(private http: HttpClient,
    private router:Router) { }

  nuevaAsignatura(codigo,nombre,creditos,programa,apruebaPor,nombreDocente,correoDocente,fechaIncripcion){
    return this.http.post<any>(this.httpUrl + 'asignaturas/nueva', {
      codigo:codigo,
      nombre:nombre,
      creditos:creditos,
      programa:programa,

      apruebaPor:apruebaPor,
      nombreDoc:nombreDocente,
      correoDoc:correoDocente,
      fechaInscripcion:fechaIncripcion,
      });
  }
  getAsignaturas(){
      return this.http.post<any>(this.httpUrl + 'asignaturas/listado', {});
  }
  editarAsignatura(asignatura){
    return this.http.post<any>(this.httpUrl + 'asignaturas/update', {
      id:asignatura.id,
      codigo:asignatura.codigo,
      nombre:asignatura.nombre,
      creditos:asignatura.creditos,
      programa:asignatura.programa,
      apruebaPor:asignatura.apruebaPor,
      nombreDoc:asignatura.nombreDoc,
      correoDoc:asignatura.correoDoc,
      fechaInscripcion:asignatura.fechaInscripcion,
      });
  }
  borrarAsignatura(id){
    return this.http.post<any>(this.httpUrl + 'asignaturas/delete', {
      id:id,
      });
  }
  getHorario(id){
    return this.http.post<any>(this.httpUrl + 'asignaturas/detalleHorario', {
      id:id,
      });
  }
  editarHorario(horario){
    return this.http.post<any>(this.httpUrl + 'asignaturas/updateHorario', {
      id:horario.id,
      semestre:horario.semestre,
      dia:horario.dia,
      horaDesde:horario.horaDesde,
      horaHasta:horario.horaHasta,
      });
  }
  nuevoHorario(semestre,dia,horaDesde,horaHasta,asignatura){
    return this.http.post<any>(this.httpUrl + 'asignaturas/nuevoHorario', {
      semestre:semestre,
      dia:dia,
      horaDesde:horaDesde,
      horaHasta:horaHasta,
      idAsig:asignatura,
      });
  }
  borrarHorario(id){
    return this.http.post<any>(this.httpUrl + 'asignaturas/deleteHorario', {
      id:id,
      });
  }
  /////////////////////////////////////////////////////////////////
  getEvaluacion(id){
    return this.http.post<any>(this.httpUrl + 'asignaturas/detalleEvaluacion', {
      id:id,
      });
  }
  nuevaEvaluacion(nombre,fecha,tipo,fechaEntrega,fechaDefensa,id){
    return this.http.post<any>(this.httpUrl + 'asignaturas/nuevaEvaluacion', {
      nombre:nombre,
      fecha:fecha,
      tipo:tipo,
      fechaEntrega:fechaEntrega,
      fechaDefensa:fechaDefensa,
      idAsig:id
      });
  }
  borrarEvaluacion(id,tipo){
    return this.http.post<any>(this.httpUrl + 'asignaturas/deleteEvaluacion', {
      id:id,
      tipo:tipo
      });
  }
  getDetalleAsignatura(id){ ///detalle
    return this.http.post<any>(this.httpUrl + 'asignaturas/detalle', {
      id:id,
      });
  }


}
